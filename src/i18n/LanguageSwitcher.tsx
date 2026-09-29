import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Menu } from '../components/Menu';
import { useLang } from './LangContext';
import { LANGUAGES, getLanguage } from './languages';
import type { LangCode } from './languages';
import { format } from './format';

function Globe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </svg>
  );
}

/** Language chooser for the landing page. `compact` is the desktop nav menu
 * (built on the shared accessible Menu); `grid` is the mobile-panel radio group. */
export function LanguageSwitcher({ variant }: { variant: 'compact' | 'grid' }) {
  const { lang, setLang, messages: m } = useLang();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  if (variant === 'compact') {
    const label = format(m.language.triggerLabel, { name: getLanguage(lang).native });
    return (
      <span className="lp-lang">
        <Menu
          ariaLabel={label}
          trigger={
            <span className="lp-lang-trigger">
              <Globe />
              <span className="lp-lang-code">{lang.toUpperCase()}</span>
            </span>
          }
          items={LANGUAGES.map((l) => ({
            label: l.native,
            lang: l.htmlLang,
            current: l.code === lang,
            onClick: () => void setLang(l.code),
          }))}
        />
      </span>
    );
  }

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = LANGUAGES.length - 1;
    let n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = index === 0 ? last : index - 1;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = last;
    if (n < 0) return;
    e.preventDefault();
    const code: LangCode = LANGUAGES[n].code;
    void setLang(code);
    refs.current[code]?.focus();
  };

  return (
    <div className="lp-lang-panel">
      <p className="lp-lang-panel-label" id="lp-lang-label">
        <Globe />
        {m.language.label}
      </p>
      <div className="lp-lang-grid" role="radiogroup" aria-labelledby="lp-lang-label">
        {LANGUAGES.map((l, i) => (
          <button
            key={l.code}
            ref={(el) => {
              refs.current[l.code] = el;
            }}
            type="button"
            role="radio"
            lang={l.htmlLang}
            aria-checked={lang === l.code}
            tabIndex={lang === l.code ? 0 : -1}
            className="lp-lang-opt"
            onClick={() => void setLang(l.code)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {l.native}
          </button>
        ))}
      </div>
    </div>
  );
}
