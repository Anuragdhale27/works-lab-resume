import { useSyncExternalStore } from 'react';

export type ThemePref = 'system' | 'light' | 'dark';
export type EffectiveTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'workslab_theme';
export const THEME_ORDER: ThemePref[] = ['system', 'light', 'dark'];

/** Shared in-memory fallback for when localStorage throws (private mode etc). */
let memoryPref: ThemePref = 'system';
let storageFailed = false;
const listeners = new Set<() => void>();

function parse(value: string | null): ThemePref {
  return value === 'light' || value === 'dark' ? value : 'system';
}

/** The saved choice. Absent or invalid values mean "system". */
export function getThemePref(): ThemePref {
  if (storageFailed) return memoryPref;
  try {
    return parse(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return memoryPref;
  }
}

export function setThemePref(pref: ThemePref): void {
  memoryPref = pref;
  storageFailed = false;
  try {
    if (pref === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    storageFailed = true; // storage unavailable: the choice lives for this page view only
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === THEME_STORAGE_KEY) cb();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

export function useThemePref(): [ThemePref, (p: ThemePref) => void] {
  const pref = useSyncExternalStore(subscribe, getThemePref, () => 'system' as ThemePref);
  return [pref, setThemePref];
}

export const DARK_QUERY = '(prefers-color-scheme: dark)';

export function systemPrefersDark(): boolean {
  try {
    return typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches;
  } catch {
    return false;
  }
}
