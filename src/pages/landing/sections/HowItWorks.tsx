import type { ReactNode } from 'react';
import { CONFIG } from '../../../lib/config';
import { useLang } from '../../../i18n/LangContext';
import { format } from '../../../i18n/format';
import { HOW_ICONS, priceVars } from '../landingContent';
import type { HowIcon } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';
import { SectionHeader } from '../parts/SectionHeader';

const ICONS: Record<HowIcon, ReactNode> = {
  pick: (
    <>
      <rect x="3" y="4" width="8" height="16" rx="1.5" />
      <rect x="13" y="4" width="8" height="7" rx="1.5" />
      <rect x="13" y="13" width="8" height="7" rx="1.5" />
    </>
  ),
  form: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </>
  ),
  pdf: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M12 11v6M9.5 14.5L12 17l2.5-2.5" />
    </>
  ),
};

export function HowItWorks() {
  const { messages: m } = useLang();
  const C = m.how;
  return (
    <section className="lp-how2" id="how-it-works" data-section="how-it-works">
      <div className="container">
        <SectionHeader eyebrow={C.eyebrow} title={C.title} />
        <ol className="lp-how2-list">
          {C.steps.map((s, i) => (
            <li key={HOW_ICONS[i]} className="lp-how2-card fade-in">
              <div className="lp-how2-top">
                <span className="lp-how2-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {ICONS[HOW_ICONS[i]]}
                  </svg>
                </span>
                <span className="lp-how2-num" aria-hidden="true">{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="lp-center fade-in">
          <CtaButton dataCta="how">{format(C.cta, priceVars(CONFIG.PRODUCT_PRICE))}</CtaButton>
        </div>
      </div>
    </section>
  );
}
