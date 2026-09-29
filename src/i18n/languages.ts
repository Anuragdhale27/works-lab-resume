// The languages the landing page can be shown in. To add one: add an entry
// here, create messages/<code>.ts, and add one line to the registry in
// messages/index.ts. Nothing else needs to change.
export const LANGUAGES = [
  { code: 'en', native: 'English', htmlLang: 'en' },
  { code: 'hi', native: 'हिन्दी', htmlLang: 'hi' },
  { code: 'mr', native: 'मराठी', htmlLang: 'mr' },
  { code: 'bn', native: 'বাংলা', htmlLang: 'bn' },
  { code: 'ta', native: 'தமிழ்', htmlLang: 'ta' },
  { code: 'te', native: 'తెలుగు', htmlLang: 'te' },
] as const;

export type LangCode = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANG: LangCode = 'en';

export const LANG_STORAGE_KEY = 'workslab_lang';

export function isLangCode(value: unknown): value is LangCode {
  return typeof value === 'string' && LANGUAGES.some((l) => l.code === value);
}

export function getLanguage(code: LangCode) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
