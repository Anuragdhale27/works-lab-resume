import type { LangCode } from './languages';

// Poppins (Latin + Devanagari) is always loaded by the landing page, so
// Hindi and Marathi need nothing extra. Bengali, Tamil and Telugu fall back
// to a matching Noto Sans, fetched only when that language is chosen. Only the
// script's own subset is loaded: Latin text stays in Poppins.
const LOADERS: Partial<Record<LangCode, () => Promise<unknown>>> = {
  bn: () =>
    Promise.all([
      import('@fontsource/noto-sans-bengali/bengali-400.css'),
      import('@fontsource/noto-sans-bengali/bengali-500.css'),
      import('@fontsource/noto-sans-bengali/bengali-600.css'),
      import('@fontsource/noto-sans-bengali/bengali-700.css'),
    ]),
  ta: () =>
    Promise.all([
      import('@fontsource/noto-sans-tamil/tamil-400.css'),
      import('@fontsource/noto-sans-tamil/tamil-500.css'),
      import('@fontsource/noto-sans-tamil/tamil-600.css'),
      import('@fontsource/noto-sans-tamil/tamil-700.css'),
    ]),
  te: () =>
    Promise.all([
      import('@fontsource/noto-sans-telugu/telugu-400.css'),
      import('@fontsource/noto-sans-telugu/telugu-500.css'),
      import('@fontsource/noto-sans-telugu/telugu-600.css'),
      import('@fontsource/noto-sans-telugu/telugu-700.css'),
    ]),
};

/** Loads the script font a language needs (no-op for en, hi, mr). Never
 * rejects: a failed font fetch just means the system font is used. */
export async function loadScriptFont(code: LangCode): Promise<void> {
  const load = LOADERS[code];
  if (!load) return;
  try {
    await load();
  } catch {
    /* fall back to system-ui */
  }
}
