import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { TEMPLATES, TEMPLATE_KEYS } from '../../../templates';
import type { TemplateKey } from '../../../types/resume';
import { ACCENT_PRESETS } from '../../../lib/accentPresets';
import { sampleResumeData } from '../../../lib/sampleData';
import sampleAvatar from '../../../assets/sample-avatar.png';
import { HERO } from '../landingContent';
import { ScaledResume } from './ScaledResume';

export function HeroStudio() {
  const [template, setTemplate] = useState<TemplateKey>('modern');
  const [accent, setAccent] = useState<string | undefined>(undefined);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const data = {
    ...sampleResumeData,
    personal: { ...sampleResumeData.personal, photo: sampleAvatar },
    accent,
  };
  const accentName = ACCENT_PRESETS.find((p) => p.color === accent)?.name ?? 'Default';

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TEMPLATE_KEYS.length - 1;
    let next = -1;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next < 0) return;
    e.preventDefault();
    const key = TEMPLATE_KEYS[next];
    setTemplate(key);
    tabRefs.current[key]?.focus();
  };

  return (
    <div className="lp-studio">
      <div className="lp-studio-glow" aria-hidden="true" />
      <div className="lp-studio-stage" key={template}>
        <ScaledResume Component={TEMPLATES[template].Component} data={data} />
      </div>
      <p className="lp-sr-only" aria-live="polite">
        Preview of the {TEMPLATES[template].name} template in {accentName}
      </p>

      <div className="lp-studio-tabs" role="tablist" aria-label="Resume template">
        {TEMPLATE_KEYS.map((k, i) => (
          <button
            key={k}
            ref={(el) => {
              tabRefs.current[k] = el;
            }}
            type="button"
            role="tab"
            id={`lp-tab-${k}`}
            aria-selected={template === k}
            tabIndex={template === k ? 0 : -1}
            className="lp-studio-tab"
            onClick={() => setTemplate(k)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            {TEMPLATES[k].name}
          </button>
        ))}
      </div>

      <div className="lp-studio-accents" role="radiogroup" aria-label="Accent colour">
        {ACCENT_PRESETS.map((p) => {
          const checked = p.color === accent;
          return (
            <button
              key={p.name}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={p.name}
              className="lp-swatch"
              onClick={() => setAccent(p.color)}
            >
              <span
                className={`lp-swatch-dot${p.color ? '' : ' lp-swatch-dot--default'}`}
                style={p.color ? { background: p.color } : undefined}
              />
            </button>
          );
        })}
      </div>

      <p className="lp-studio-caption">{HERO.caption}</p>
    </div>
  );
}
