// Section-aware scroll rail.
//
// A fixed, overlay indicator on the right edge of the viewport: a percentage
// counter over a vertical, segmented track, with section labels to the left of
// the track. One segment per page section; the active segment fills with scroll
// progress, the rest stay empty. It never takes layout space, so content does not
// move when it appears or disappears.
//
// Interaction:
// - Tap or click a segment: scroll to that section (through Lenis, see mesh.ts).
// - Press and drag along the track (mouse, pen or touch): scrub the page. The
//   track's vertical position maps onto the document's scroll range (top = start,
//   bottom = end). Drags are applied continuously, one scroll per frame.
// - Keyboard: segments are buttons, so Enter and Space go to their section.
//
// Sections come from `[data-scroll-section]` markers inside <main>; pages
// without markers fall back to their <h2> headings, and pages with neither get
// one segment for the whole document.
import { scrollEngine } from './mesh';

type Segment = {
  button: HTMLButtonElement;
  // The visible bar (background and fill). Hover and scrub widen this element
  // only, so the label, which is a sibling, is never scaled.
  bar: HTMLElement;
  fill: HTMLElement;
  // The section element (null for the whole-page fallback), re-measured on every pass.
  el: Element | null;
  start: number;
  end: number;
  grow: string;
};

type Press = {
  id: number;
  startY: number;
  // Last known pointer Y, so an active drag can re-aim when the page height changes.
  lastY: number;
  scrubbing: boolean;
};

type Rail = {
  root: HTMLElement;
  count: HTMLElement;
  track: HTMLElement;
  segments: Segment[];
  max: number;
  active: number;
  press: Press | null;
  // Latest scrub target (px), applied once per frame.
  scrubY: number | null;
  scrubFrame: number;
  // Per-frame watch that re-aims an active drag when the page height changes.
  scrubWatch: number;
};

// Scroll distance (px) before the rail appears, so the top of the page stays clean.
const REVEAL_AFTER_PX = 8;
// Page progress after which the rail hides again (the footer zone).
const HIDE_AFTER_PROGRESS = 0.9;
// A section becomes active once its top crosses this fraction of the viewport height.
const SECTION_LEAD = 0.5;
// Pages shorter than this many viewports are not scrollable enough to need the rail.
const MIN_SCROLL_VIEWPORTS = 0.5;
// Pointer travel (px) before a press counts as a drag rather than a tap.
const DRAG_START_PX = 4;

const WIRED = '__scrollRailWired';

let rail: Rail | null = null;
let frame = 0;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function absoluteTop(el: Element): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

function collectSections(main: HTMLElement): { el: Element | null; label: string }[] {
  const marked = Array.from(main.querySelectorAll<HTMLElement>('[data-scroll-section]'));
  const source = marked.length ? marked : Array.from(main.querySelectorAll<HTMLElement>('h2'));
  const sections = source
    // Skip anything not rendered (closed dialogs, hidden fallbacks).
    .filter((el) => el.getClientRects().length > 0)
    .map((el) => ({
      el: el as Element | null,
      label: (el.dataset.scrollSection || el.textContent || '').replace(/\s+/g, ' ').trim(),
    }))
    .filter((section) => section.label.length > 0);

  if (sections.length) return sections;

  const heading = main.querySelector('h1')?.textContent ?? document.title.split(/\s[:|–-]+\s/)[0];
  return [{ el: null, label: (heading || 'Page').replace(/\s+/g, ' ').trim() }];
}

function createSegment(label: string, el: Element | null, index: number): Segment {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'scroll-rail__segment';
  button.setAttribute('aria-label', `Go to ${label}`);
  button.dataset.index = String(index);

  const bar = document.createElement('span');
  bar.className = 'scroll-rail__bar';

  const fill = document.createElement('span');
  fill.className = 'scroll-rail__fill';

  const text = document.createElement('span');
  text.className = 'scroll-rail__label';
  text.textContent = label;

  bar.append(fill);
  button.append(bar, text);
  return { button, bar, fill, el, start: 0, end: 0, grow: '' };
}

// Lenis caches the scroll limit. When the page height changes (lazy content, fonts),
// that cache can clamp targets near the end, so refresh it before every rail scroll.
function refreshLenis() {
  if (scrollEngine.lenis) scrollEngine.resize();
}

// Plain scroll to a position (taps, clicks, keyboard). Smooth through Lenis.
function goTo(y: number, onComplete?: () => void) {
  if (scrollEngine.lenis) {
    refreshLenis();
    scrollEngine.scrollTo(y, { duration: 1.2, immediate: reducedMotion(), onComplete });
  } else {
    window.scrollTo({ top: y, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }
}

// Immediate position change, used while scrubbing. `force` lets it run even if
// Lenis is stopped by an overlay.
function jumpTo(y: number) {
  if (scrollEngine.lenis) {
    refreshLenis();
    scrollEngine.scrollTo(y, { immediate: true, force: true });
  } else {
    window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
  }
}

function goToSegment(segment: Segment) {
  measure();
  goTo(segment.start, () => settleOnSegment(segment));
}

// Content above a section can finish loading while the smooth scroll is in flight, which
// moves the section (and Lenis clamps to the limit it had at the start). When the move
// completes, re-measure and make one correcting scroll if the section has moved. Skipped
// if a drag has taken over or the rail was rebuilt.
function settleOnSegment(segment: Segment) {
  if (!rail || rail.press || !rail.segments.includes(segment)) return;
  measure();
  if (Math.abs(window.scrollY - segment.start) > 2) goTo(segment.start);
}

// Map every section onto a span of scroll positions. A section's span starts when
// its top reaches the lead line of the viewport and runs until the next one starts,
// so segment lengths follow the page's real scroll distance.
function measure() {
  if (!rail) return;
  const viewport = window.innerHeight;
  const max = Math.max(0, document.documentElement.scrollHeight - viewport);
  rail.max = max;

  const { segments } = rail;
  let previous = 0;
  segments.forEach((segment, index) => {
    const top = segment.el ? absoluteTop(segment.el) : 0;
    const start = index === 0 ? 0 : clamp(top - viewport * SECTION_LEAD, 0, max);
    segment.start = Math.max(previous, start);
    previous = segment.start;
  });
  segments.forEach((segment, index) => {
    segment.end = index < segments.length - 1 ? segments[index + 1].start : max;
    // Only touch the DOM when the proportion actually changed.
    const grow = String(Math.max(1, segment.end - segment.start));
    if (grow !== segment.grow) {
      segment.grow = grow;
      segment.button.style.flexGrow = grow;
    }
  });
}

function setVisible(visible: boolean) {
  if (!rail) return;
  rail.root.toggleAttribute('data-visible', visible);
}

function update() {
  frame = 0;
  if (!rail) return;

  // Section tops and page height can shift without a resize (lazy content, fonts,
  // Lenis), so re-measure on each pass. Reads are cheap; DOM writes are change-gated.
  measure();

  const y = window.scrollY;
  const { max, segments } = rail;
  const scrollable = max > window.innerHeight * MIN_SCROLL_VIEWPORTS;
  // While scrubbing the rail stays up, so the end of the track is always reachable.
  const scrubbing = rail.press?.scrubbing === true;
  setVisible(scrollable && (scrubbing || (y > REVEAL_AFTER_PX && y / max < HIDE_AFTER_PROGRESS)));

  const progress = max > 0 ? clamp(y / max, 0, 1) : 0;
  rail.count.textContent = `(${Math.round(progress * 100)})`;

  // A 2px tolerance absorbs sub-pixel settling after a smooth scroll lands on a boundary.
  let active = 0;
  segments.forEach((segment, index) => {
    if (y >= segment.start - 2) active = index;
  });

  segments.forEach((segment, index) => {
    let fill = 0;
    if (index < active) fill = 1;
    else if (index === active) {
      const length = segment.end - segment.start;
      fill = length > 0 ? clamp((y - segment.start) / length, 0, 1) : 1;
    }
    segment.fill.style.transform = `scaleY(${fill.toFixed(4)})`;
  });

  if (active !== rail.active) {
    segments.forEach((segment, index) => {
      const isActive = index === active;
      segment.button.classList.toggle('is-active', isActive);
      if (isActive) segment.button.setAttribute('aria-current', 'true');
      else segment.button.removeAttribute('aria-current');
    });
    rail.active = active;
  }
}

// Scroll events already arrive once per frame, so they run the update directly.
// Resize-style bursts are coalesced into a single frame.
function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(update);
}

// The nearest segment to a pointer position (0 distance when it is on one).
function segmentAt(clientY: number): Segment | null {
  if (!rail) return null;
  let best: Segment | null = null;
  let bestDistance = Infinity;
  for (const segment of rail.segments) {
    const box = segment.button.getBoundingClientRect();
    const distance = clientY < box.top ? box.top - clientY : clientY > box.bottom ? clientY - box.bottom : 0;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = segment;
    }
  }
  return best;
}

function applyScrub() {
  if (!rail) return;
  rail.scrubFrame = 0;
  if (rail.scrubY === null) return;
  jumpTo(rail.scrubY);
  rail.scrubY = null;
  update();
}

// Turn a pointer's vertical position on the track into a scroll position.
function scrubTo(clientY: number) {
  if (!rail) return;
  measure();
  const box = rail.track.getBoundingClientRect();
  const ratio = box.height > 0 ? clamp((clientY - box.top) / box.height, 0, 1) : 0;
  rail.scrubY = ratio * rail.max;
  if (!rail.scrubFrame) rail.scrubFrame = requestAnimationFrame(applyScrub);
}

// Page height can grow without the <html> box resizing (overflowing content), so no
// ResizeObserver sees it, and Lenis's cached limit can lag behind. While scrubbing,
// re-aim at the pointer's last position every frame: this re-measures the page and
// refreshes Lenis, and a repeat of the same position emits no scroll event.
function watchScrub() {
  if (!rail?.press?.scrubbing) {
    if (rail) rail.scrubWatch = 0;
    return;
  }
  scrubTo(rail.press.lastY);
  // The page may have grown since the last scroll event, so refresh counter and labels too.
  scheduleUpdate();
  rail.scrubWatch = requestAnimationFrame(watchScrub);
}

function onPointerDown(event: PointerEvent) {
  if (!rail || rail.press || event.button !== 0) return;
  if (!rail.root.hasAttribute('data-visible')) return;
  rail.press = { id: event.pointerId, startY: event.clientY, lastY: event.clientY, scrubbing: false };
  try {
    rail.track.setPointerCapture(event.pointerId);
  } catch {
    // Capture is an enhancement; without it the drag still works while the pointer stays on the track.
  }
  // Stops text selection and native image or link drags from starting on the rail.
  event.preventDefault();
}

function onPointerMove(event: PointerEvent) {
  const press = rail?.press;
  if (!rail || !press || event.pointerId !== press.id) return;
  if (!press.scrubbing) {
    if (Math.abs(event.clientY - press.startY) < DRAG_START_PX) return;
    press.scrubbing = true;
    rail.root.setAttribute('data-scrubbing', '');
    document.documentElement.classList.add('rail-scrubbing');
    rail.scrubWatch = requestAnimationFrame(watchScrub);
    update();
  }
  press.lastY = event.clientY;
  event.preventDefault();
  scrubTo(event.clientY);
}

function onPointerEnd(event: PointerEvent) {
  const current = rail;
  const press = current?.press;
  if (!current || !press || event.pointerId !== press.id) return;
  current.press = null;
  if (current.track.hasPointerCapture(event.pointerId)) {
    current.track.releasePointerCapture(event.pointerId);
  }

  if (press.scrubbing) {
    if (current.scrubFrame) {
      cancelAnimationFrame(current.scrubFrame);
      current.scrubFrame = 0;
    }
    if (current.scrubWatch) {
      cancelAnimationFrame(current.scrubWatch);
      current.scrubWatch = 0;
    }
    // Land on the final pointer position, unless the gesture was cancelled.
    if (event.type === 'pointerup' && current.scrubY !== null) jumpTo(current.scrubY);
    current.scrubY = null;
    current.root.removeAttribute('data-scrubbing');
    document.documentElement.classList.remove('rail-scrubbing');
    update();
    return;
  }

  // A press that never became a drag is a tap: go to the section under it.
  if (event.type === 'pointerup') {
    const segment = segmentAt(event.clientY);
    if (segment) goToSegment(segment);
  }
}

// Pointer taps and drags are handled on pointer events, and their click (detail
// > 0) is ignored, so a finished drag never fires a navigation. Only keyboard
// activation (detail 0) of a segment button is handled here.
function onClick(event: MouseEvent) {
  if (!rail || event.detail !== 0) return;
  const button = (event.target as Element | null)?.closest<HTMLButtonElement>('.scroll-rail__segment');
  const segment = rail.segments.find((item) => item.button === button);
  if (segment) goToSegment(segment);
}

function build(root: HTMLElement) {
  const count = root.querySelector<HTMLElement>('[data-scroll-rail-count]');
  const track = root.querySelector<HTMLElement>('[data-scroll-rail-track]');
  const main = document.querySelector<HTMLElement>('main') ?? document.body;
  if (!count || !track) {
    rail = null;
    return;
  }

  track.replaceChildren();
  const segments = collectSections(main).map((section, index) => {
    const segment = createSegment(section.label, section.el, index);
    track.append(segment.button);
    return segment;
  });

  rail = { root, count, track, segments, max: 0, active: -1, press: null, scrubY: null, scrubFrame: 0, scrubWatch: 0 };

  // Listeners are bound once per track element. Handlers read the current `rail`,
  // so a rebuilt rail on the same element needs no rebinding.
  if (!track.hasAttribute('data-rail-bound')) {
    track.setAttribute('data-rail-bound', '');
    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerEnd);
    track.addEventListener('pointercancel', onPointerEnd);
    track.addEventListener('lostpointercapture', onPointerEnd);
    track.addEventListener('click', onClick);
  }
  update();
}

function init() {
  const root = document.querySelector<HTMLElement>('[data-scroll-rail]');
  if (!root) {
    rail = null;
    return;
  }
  build(root);
}

function wire() {
  const host = window as unknown as Record<string, boolean>;
  if (host[WIRED]) return;
  host[WIRED] = true;

  window.addEventListener('scroll', update, { passive: true });
  // Layout changes (images, fonts, lazy content) move section tops and page height.
  // Re-measure, and if a drag is in progress, re-aim it at the pointer's last position.
  const remeasure = () => {
    measure();
    if (rail?.press?.scrubbing) scrubTo(rail.press.lastY);
    scheduleUpdate();
  };
  window.addEventListener('resize', remeasure);
  new ResizeObserver(remeasure).observe(document.documentElement);
  document.addEventListener('astro:page-load', init);
}

wire();
init();
