import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_LANG, LANG_STORAGE_KEY, getLanguage, isLangCode } from './languages';
import type { LangCode } from './languages';
import { en, loadMessages } from './messages';
import type { Messages } from './messages';
import { loadScriptFont } from './fonts';
import { format } from './format';
import type { FormatVars } from './format';

/** Dotted paths to the string leaves of Messages (arrays are read directly). */
type LeafPaths<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends readonly unknown[]
      ? never
      : T[K] extends object
        ? `${K}.${LeafPaths<T[K]>}`
        : never;
}[keyof T & string];

export type MessagePath = LeafPaths<Messages>;

export interface LangContextValue {
  lang: LangCode;
  /** Loads the dictionary (and script font) first, then switches. */
  setLang: (code: LangCode) => Promise<void>;
  messages: Messages;
  /** Looks up a string by dotted path and fills {placeholders}. */
  t: (path: MessagePath, vars?: FormatVars) => string;
}

function makeT(messages: Messages): LangContextValue['t'] {
  return (path, vars) => {
    let node: unknown = messages;
    for (const part of path.split('.')) node = (node as Record<string, unknown> | undefined)?.[part];
    return format(typeof node === 'string' ? node : path, vars);
  };
}

// Outside a provider (builder, template and policy pages) everything is English.
const DEFAULT_VALUE: LangContextValue = {
  lang: DEFAULT_LANG,
  setLang: () => Promise.resolve(),
  messages: en,
  t: makeT(en),
};

const LangContext = createContext<LangContextValue>(DEFAULT_VALUE);

function readStoredLang(): LangCode {
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return isLangCode(v) ? v : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function storeLang(code: LangCode): void {
  try {
    if (code === DEFAULT_LANG) window.localStorage.removeItem(LANG_STORAGE_KEY);
    else window.localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {
    /* storage unavailable: the choice lasts for this page view */
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ lang: LangCode; messages: Messages }>({ lang: DEFAULT_LANG, messages: en });
  // Only the most recent request may apply (fast double-clicks, slow chunks).
  const requestId = useRef(0);

  const setLang = useCallback(async (code: LangCode) => {
    const id = ++requestId.current;
    try {
      const [messages] = await Promise.all([loadMessages(code), loadScriptFont(code)]);
      if (id !== requestId.current) return;
      setState({ lang: code, messages });
      storeLang(code);
    } catch {
      /* chunk failed to load: keep showing the current language */
    }
  }, []);

  // Restore the saved choice after mount. The previous (English) copy stays
  // on screen until the dictionary has loaded.
  useEffect(() => {
    const saved = readStoredLang();
    if (saved !== DEFAULT_LANG) void setLang(saved);
    const counter = requestId;
    return () => {
      counter.current++;
    };
  }, [setLang]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = getLanguage(state.lang).htmlLang;
    root.dataset.lpLang = state.lang;
  }, [state.lang]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    return () => {
      root.lang = 'en';
      delete root.dataset.lpLang;
    };
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({ lang: state.lang, setLang, messages: state.messages, t: makeT(state.messages) }),
    [state, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// Hooks live beside the provider so consumers import from one place.
// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LangContextValue {
  return useContext(LangContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useT(): LangContextValue['t'] {
  return useContext(LangContext).t;
}
