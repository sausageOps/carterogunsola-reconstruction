const STORAGE_KEY = 'record:state';

interface RecordState {
  w: number;
  h: number;
  src: string;
  fit: boolean;
  bare: boolean;
  docs: boolean;
  cfg: boolean;
}

const DEFAULT_STATE: RecordState = {
  w: 1440,
  h: 900,
  src: '/',
  fit: true,
  bare: false,
  docs: true,
  cfg: true,
};

function initRecord() {
  const root = document.querySelector<HTMLElement>('[data-record-page]');
  if (!root || root.dataset.recordReady) return;
  root.dataset.recordReady = 'true';

  const frame = root.querySelector<HTMLElement>('[data-record-frame]');
  const iframe = root.querySelector<HTMLIFrameElement>('[data-record-iframe]');
  const route = root.querySelector<HTMLSelectElement>('[data-record-route]');
  const url = root.querySelector<HTMLInputElement>('[data-record-url]');
  const width = root.querySelector<HTMLInputElement>('[data-record-w]');
  const height = root.querySelector<HTMLInputElement>('[data-record-h]');
  const fit = root.querySelector<HTMLButtonElement>('[data-record-fit]');
  const bare = root.querySelector<HTMLButtonElement>('[data-record-bare]');
  const docs = root.querySelector<HTMLButtonElement>('[data-record-docs]');
  const cfg = root.querySelector<HTMLButtonElement>('[data-record-cfg]');
  const subtoggles = root.querySelector<HTMLElement>('[data-record-subtoggles]');
  const hide = root.querySelector<HTMLButtonElement>('[data-record-hide]');
  const readout = root.querySelector<HTMLElement>('[data-record-readout]');
  const bar = root.querySelector<HTMLElement>('[data-record-bar]');
  const menuButton = root.querySelector<HTMLButtonElement>('[data-preset-menu]');
  const menu = root.querySelector<HTMLElement>('[data-preset-list]');
  const menuLabel = root.querySelector<HTMLElement>('[data-preset-label]');
  const presetContainer = menuButton?.parentElement;
  const presets = [...root.querySelectorAll<HTMLButtonElement>('[data-preset]')];

  if (
    !frame || !iframe || !route || !url || !width || !height || !fit || !bare || !docs ||
    !cfg || !subtoggles || !hide || !readout || !bar || !menuButton || !menu ||
    !menuLabel || !presetContainer
  ) return;

  const controller = new AbortController();
  const { signal } = controller;
  let state = { ...DEFAULT_STATE };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state = { ...state, ...JSON.parse(saved) };
  } catch {}

  const persist = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  };
  const normalizeSize = (value: number) => Math.max(80, Math.min(10000, Math.round(value)));
  const normalizeSource = (value: string) => {
    const source = value.trim();
    if (!source) return 'about:blank';
    if (source.startsWith('/') || source.startsWith('http://') || source.startsWith('https://') || source.startsWith('about:')) {
      return source;
    }
    return `https://${source}`;
  };
  const isLabRoute = () => state.src.startsWith('/lab/');
  const frameSource = (source: string) => {
    if (!state.bare || !source.startsWith('/')) return source;
    const params = ['bare=1'];
    if (!state.docs) params.push('docs=0');
    if (!state.cfg) params.push('cfg=0');
    return `${source}${source.includes('?') ? '&' : '?'}${params.join('&')}`;
  };
  const setFrameSource = () => {
    const source = frameSource(normalizeSource(state.src));
    if (iframe.getAttribute('src') !== source) iframe.src = source;
  };
  const setPresetLabel = () => {
    const size = `${state.w}x${state.h}`;
    let label = 'Custom';
    presets.forEach((preset) => {
      const selected = preset.dataset.preset === size;
      preset.setAttribute('aria-checked', String(selected));
      if (selected) label = preset.querySelector('span')?.textContent?.trim() || label;
    });
    menuLabel.textContent = label;
  };
  const updateReadout = () => {
    frame.style.width = `${state.w}px`;
    frame.style.height = `${state.h}px`;
    let scale = 1;
    if (state.fit) {
      const controlsHeight = root.classList.contains('is-collapsed') ? 0 : bar.offsetHeight + 24;
      scale = Math.min(1, (window.innerWidth - 48) / state.w, (window.innerHeight - 48 - controlsHeight) / state.h);
      if (!Number.isFinite(scale) || scale <= 0) scale = 1;
    }
    frame.style.transform = scale === 1 ? '' : `scale(${scale})`;
    const percent = Math.round(scale * 100);
    readout.textContent = `${state.w} × ${state.h}${percent < 100 ? ` · ${percent}%` : ''}`;
  };
  const updateSubtoggles = () => {
    subtoggles.hidden = !(state.bare && isLabRoute());
  };
  const setSource = (source: string, fromRoute = false) => {
    state.src = source;
    setFrameSource();
    if (!fromRoute) route.value = [...route.options].some((option) => option.value === source) ? source : '';
    url.value = source.startsWith('about:') ? '' : source;
    updateSubtoggles();
    persist();
  };
  const setSize = (w: number, h: number) => {
    state.w = normalizeSize(w);
    state.h = normalizeSize(h);
    width.value = String(state.w);
    height.value = String(state.h);
    setPresetLabel();
    updateReadout();
    persist();
  };
  const setMenuOpen = (open: boolean) => {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
  };
  const onOutsideClick = (event: MouseEvent) => {
    if (!menu.hidden && !presetContainer.contains(event.target as Node)) setMenuOpen(false);
  };
  const toggle = (button: HTMLButtonElement, key: 'docs' | 'cfg') => {
    button.addEventListener('click', () => {
      state[key] = !state[key];
      button.setAttribute('aria-pressed', String(state[key]));
      setFrameSource();
      persist();
    }, { signal });
  };
  const setCollapsed = (collapsed: boolean) => {
    root.classList.toggle('is-collapsed', collapsed);
    hide.textContent = collapsed ? 'Show UI' : 'Hide UI';
    updateReadout();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLSelectElement) return;
    if (event.key === 'h' || event.key === 'H') setCollapsed(!root.classList.contains('is-collapsed'));
    if (event.key === 'Escape') {
      if (menu.hidden) setCollapsed(false);
      else setMenuOpen(false);
    }
  };

  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    setMenuOpen(menu.hidden);
  }, { signal });
  presets.forEach((preset) => preset.addEventListener('click', () => {
    const [w, h] = (preset.dataset.preset || '').split('x').map(Number);
    if (w && h) setSize(w, h);
    setMenuOpen(false);
  }, { signal }));
  document.addEventListener('click', onOutsideClick, { signal });
  route.addEventListener('change', () => setSource(route.value, true), { signal });
  const applyUrl = () => setSource(url.value);
  url.addEventListener('change', applyUrl, { signal });
  url.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applyUrl();
      url.blur();
    }
  }, { signal });
  const applyDimensions = () => setSize(Number(width.value) || state.w, Number(height.value) || state.h);
  width.addEventListener('change', applyDimensions, { signal });
  height.addEventListener('change', applyDimensions, { signal });
  fit.addEventListener('click', () => {
    state.fit = !state.fit;
    fit.setAttribute('aria-pressed', String(state.fit));
    updateReadout();
    persist();
  }, { signal });
  bare.addEventListener('click', () => {
    state.bare = !state.bare;
    bare.setAttribute('aria-pressed', String(state.bare));
    updateSubtoggles();
    setFrameSource();
    persist();
  }, { signal });
  toggle(docs, 'docs');
  toggle(cfg, 'cfg');
  hide.addEventListener('click', () => setCollapsed(!root.classList.contains('is-collapsed')), { signal });
  document.addEventListener('keydown', onKeyDown, { signal });
  window.addEventListener('resize', updateReadout, { passive: true, signal });

  setSize(state.w, state.h);
  fit.setAttribute('aria-pressed', String(state.fit));
  bare.setAttribute('aria-pressed', String(state.bare));
  docs.setAttribute('aria-pressed', String(state.docs));
  cfg.setAttribute('aria-pressed', String(state.cfg));
  setSource(state.src);
  document.addEventListener('astro:before-swap', () => {
    controller.abort();
    delete root.dataset.recordReady;
  }, { once: true });
}

initRecord();
document.addEventListener('astro:page-load', initRecord);
