import { useRef } from 'react';
import type { KeyboardEvent, ReactElement } from 'react';
import { THEME_ORDER, useThemePref } from './themeStore';
import type { ThemePref } from './themeStore';

const LABEL: Record<ThemePref, string> = { system: 'System', light: 'Light', dark: 'Dark' };
const LONG_LABEL: Record<ThemePref, string> = {
  system: 'System (follows your device)',
  light: 'Light',
  dark: 'Dark',
};

function Icon({ pref }: { pref: ThemePref }): ReactElement {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };
  if (pref === 'light') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (pref === 'dark') {
    return (
      <svg {...common}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="2.5" y="4" width="19" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

export function ThemeToggle({ variant }: { variant: 'compact' | 'segmented' }) {
  const [pref, setPref] = useThemePref();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  if (variant === 'compact') {
    const next = THEME_ORDER[(THEME_ORDER.indexOf(pref) + 1) % THEME_ORDER.length];
    const label = `Theme: ${LONG_LABEL[pref]}. Switch to ${LONG_LABEL[next]}`;
    return (
      <button
        type="button"
        className="lp-theme-btn"
        aria-label={label}
        title={label}
        data-theme-pref={pref}
        onClick={() => setPref(next)}
      >
        <Icon pref={pref} />
      </button>
    );
  }

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = THEME_ORDER.length - 1;
    let n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = index === 0 ? last : index - 1;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = last;
    if (n < 0) return;
    e.preventDefault();
    const id = THEME_ORDER[n];
    setPref(id);
    refs.current[id]?.focus();
  };

  return (
    <div className="lp-theme-seg" role="radiogroup" aria-label="Theme">
      {THEME_ORDER.map((id, i) => (
        <button
          key={id}
          ref={(el) => {
            refs.current[id] = el;
          }}
          type="button"
          role="radio"
          aria-checked={pref === id}
          tabIndex={pref === id ? 0 : -1}
          className="lp-theme-opt"
          onClick={() => setPref(id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          <Icon pref={id} />
          {LABEL[id]}
        </button>
      ))}
    </div>
  );
}
