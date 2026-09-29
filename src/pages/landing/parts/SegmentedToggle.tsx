import { useRef } from 'react';
import type { KeyboardEvent } from 'react';

export interface ToggleOption {
  id: string;
  label: string;
  controls?: string;
}

interface SegmentedToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  tone?: 'light' | 'night';
  idPrefix: string;
}

/** Two-or-more option segmented control with tablist semantics and
 * roving tabindex (arrows, Home, End). Targets are at least 44px tall. */
export function SegmentedToggle({ options, value, onChange, label, tone = 'light', idPrefix }: SegmentedToggleProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next < 0) return;
    e.preventDefault();
    const id = options[next].id;
    onChange(id);
    refs.current[id]?.focus();
  };

  return (
    <div className={`lp-seg lp-seg--${tone}`} role="tablist" aria-label={label}>
      {options.map((o, i) => (
        <button
          key={o.id}
          ref={(el) => {
            refs.current[o.id] = el;
          }}
          type="button"
          role="tab"
          id={`${idPrefix}-${o.id}`}
          aria-selected={value === o.id}
          aria-controls={o.controls}
          tabIndex={value === o.id ? 0 : -1}
          className="lp-seg-btn"
          onClick={() => onChange(o.id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
