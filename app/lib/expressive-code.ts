const boundButtons = new WeakSet<HTMLButtonElement>();
const observedPres = new WeakSet<HTMLElement>();

function fallbackCopy(text: string): boolean {
  const pre = document.createElement('pre');
  Object.assign(pre.style, {
    opacity: '0',
    pointerEvents: 'none',
    position: 'absolute',
    overflow: 'hidden',
    left: '0',
    top: '0',
    width: '20px',
    height: '20px',
    webkitUserSelect: 'auto',
    userSelect: 'all',
  });
  pre.ariaHidden = 'true';
  pre.textContent = text;
  document.body.appendChild(pre);
  const range = document.createRange();
  range.selectNode(pre);
  const sel = getSelection();
  if (!sel) {
    document.body.removeChild(pre);
    return false;
  }
  sel.removeAllRanges();
  sel.addRange(range);
  let ok = false;
  try {
    ok = typeof document.execCommand === 'function' ? document.execCommand('copy') : true;
  } catch {
    ok = false;
  } finally {
    sel.removeAllRanges();
    document.body.removeChild(pre);
  }
  return ok;
}

function handleCopyClick(event: Event): void {
  const btn = event.currentTarget as HTMLButtonElement | null;
  if (!btn) return;
  const dataset = btn.dataset;
  const code = (dataset.code ?? '').replace(/\u007f/g, '\n');
  const copiedLabel = dataset.copied;

  const showFeedback = () => {
    if (!btn.parentElement || btn.parentElement.querySelector('.feedback')) return;
    const liveRegion = btn.parentElement.querySelector('[aria-live]');
    const feedback = document.createElement('div');
    feedback.classList.add('feedback');
    feedback.append(copiedLabel ?? 'Copied!');
    btn.before(feedback);
    void feedback.offsetWidth;
    requestAnimationFrame(() => feedback.classList.add('show'));
    const hide = () => feedback.classList.remove('show');
    const cleanup = () => {
      if (!feedback || parseFloat(getComputedStyle(feedback).opacity) > 0) return;
      feedback.remove();
      if (liveRegion) liveRegion.textContent = '';
    };
    setTimeout(hide, 1500);
    setTimeout(cleanup, 2500);
    btn.addEventListener('blur', hide);
    feedback.addEventListener('transitioncancel', cleanup);
    feedback.addEventListener('transitionend', cleanup);
    if (liveRegion) liveRegion.textContent = copiedLabel ?? 'Copied!';
  };

  window.navigator?.clipboard?.writeText(code).then(showFeedback).catch(() => {
    if (fallbackCopy(code)) showFeedback();
  }) || (fallbackCopy(code) && showFeedback());
}

function updatePreTabIndex(pre: HTMLElement): void {
  const scrollable = pre.scrollWidth > pre.clientWidth;
  if (scrollable) {
    pre.setAttribute('tabindex', '0');
  } else {
    pre.removeAttribute('tabindex');
  }
}

let resizeObserver: ResizeObserver | null = null;

export function initExpressiveCode(root: Document | Element = document): void {
  root
    .querySelectorAll<HTMLButtonElement>('.expressive-code .copy button')
    .forEach((btn) => {
      if (boundButtons.has(btn)) return;
      boundButtons.add(btn);
      btn.dataset.ecBound = 'true';
      btn.addEventListener('click', handleCopyClick);
    });

  const pres = root.querySelectorAll<HTMLElement>('.expressive-code pre');
  if (!pres.length) return;

  if (!resizeObserver && 'ResizeObserver' in window) {
    let debounceTimer = 0;
    resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        entries.forEach((entry) => updatePreTabIndex(entry.target as HTMLElement));
      }, 250);
    });
  }

  pres.forEach((pre) => {
    if (observedPres.has(pre)) return;
    observedPres.add(pre);
    pre.dataset.ecPre = 'true';
    updatePreTabIndex(pre);
    resizeObserver?.observe(pre);
  });
}
