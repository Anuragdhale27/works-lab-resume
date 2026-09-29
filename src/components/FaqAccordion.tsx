import { useState } from 'react';
import { CONFIG } from '../lib/config';
import { useLang } from '../i18n/LangContext';
import { format } from '../i18n/format';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { messages: m } = useLang();
  const items = m.faq.items;
  const vars = { price: CONFIG.PRODUCT_PRICE };

  return (
    <div className="lp-faq-list fade-in">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div className={`lp-faq-item${open ? ' open' : ''}`} key={i}>
            <button
              type="button"
              className="lp-faq-q"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              {format(item.q, vars)} <span className="lp-faq-icon" aria-hidden="true">+</span>
            </button>
            <div className="lp-faq-a" id={panelId} role="region" aria-labelledby={buttonId}>
              {format(item.a, vars)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
