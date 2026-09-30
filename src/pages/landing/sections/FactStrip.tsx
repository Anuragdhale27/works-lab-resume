import type { ReactNode } from 'react';
import { CONFIG } from '../../../lib/config';
import { TEMPLATE_KEYS } from '../../../templates';
import { useLang } from '../../../i18n/LangContext';
import { format } from '../../../i18n/format';
import { FACT_ICONS, priceVars } from '../landingContent';
import type { FactIcon } from '../landingContent';

const ICONS: Record<FactIcon, ReactNode> = {
  text: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12h5M9.5 15h5M9.5 18h3" />
    </>
  ),
  device: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
      <path d="M9.5 11l2 2 3.5-3.5" />
    </>
  ),
  price: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8h6M9 11h6M9 8c3.5 0 4 5-1 5l4 4" />
    </>
  ),
  layout: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M10 4v16M10 10h10" />
    </>
  ),
};

export function FactStrip() {
  const { messages: m } = useLang();
  const v = priceVars(CONFIG.PRODUCT_PRICE, TEMPLATE_KEYS.length);
  return (
    <section className="lp-facts" data-section="fact-strip">
      <div className="container">
        <ul className="lp-facts-list fade-in">
          {m.facts.map((f, i) => (
            <li key={FACT_ICONS[i]} className="lp-fact">
              <svg className="lp-fact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[FACT_ICONS[i]]}
              </svg>
              <div>
                <p className="lp-fact-title">{format(f.title, v)}</p>
                <p className="lp-fact-text">{format(f.text, v)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
