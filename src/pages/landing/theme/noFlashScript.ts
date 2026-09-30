/** Inline script injected into the homepage <head> only (scripts/prerender-routes.ts).
 * Sets html[data-lp-theme] before first paint so dark-mode visitors never see a
 * light flash. No network access; every step is guarded. The React hook
 * (useLandingTheme) takes over once the app mounts and removes the attribute
 * when leaving the landing route. */
export const THEME_NO_FLASH_SCRIPT =
  "(function(){try{var p=location.pathname;if(p!=='/'&&p!=='/index.html')return;var t=null;try{t=localStorage.getItem('workslab_theme')}catch(e){}" +
  "if(t!=='light'&&t!=='dark'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}" +
  "document.documentElement.dataset.lpTheme=t}catch(e){}})();";

export const THEME_NO_FLASH_STYLE =
  'html[data-lp-theme="dark"]{background:#0E1319;color-scheme:dark}html[data-lp-theme="dark"] body{background:#0E1319}';
