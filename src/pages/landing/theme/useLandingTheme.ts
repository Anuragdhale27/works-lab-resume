import { useEffect, useLayoutEffect, useState } from 'react';
import { DARK_QUERY, systemPrefersDark, useThemePref } from './themeStore';
import type { EffectiveTheme, ThemePref } from './themeStore';

/** Applies the landing theme while the calling component is mounted:
 * `html[data-lp-theme]` (effective light|dark) and `html[data-lp-theme-pref]`
 * (system|light|dark). Both are removed on unmount so no other route is
 * affected. The system setting is followed live. */
export function useLandingTheme(): { pref: ThemePref; theme: EffectiveTheme } {
  const [pref] = useThemePref();
  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia(DARK_QUERY);
    } catch {
      return;
    }
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    setSystemDark(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener?.(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener?.(onChange);
    };
  }, []);

  const theme: EffectiveTheme = pref === 'system' ? (systemDark ? 'dark' : 'light') : pref;

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.lpTheme = theme;
    root.dataset.lpThemePref = pref;
  }, [theme, pref]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    return () => {
      delete root.dataset.lpTheme;
      delete root.dataset.lpThemePref;
    };
  }, []);

  return { pref, theme };
}
