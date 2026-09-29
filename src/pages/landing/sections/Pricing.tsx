import { Link } from 'react-router-dom';
import { CONFIG } from '../../../lib/config';
import { TEMPLATE_KEYS } from '../../../templates';
import { useLang } from '../../../i18n/LangContext';
import { format } from '../../../i18n/format';
import { LIST_PRICE, REFUND_HREF, priceVars } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';
import { SectionHeader } from '../parts/SectionHeader';

export function Pricing() {
  const price = CONFIG.PRODUCT_PRICE;
  const { messages: m } = useLang();
  const C = m.pricing;
  const v = priceVars(price, TEMPLATE_KEYS.length);
  return (
    <section className="lp-price" id="pricing" data-section="pricing">
      <div className="container">
        <SectionHeader eyebrow={C.eyebrow} title={C.title} />
        <div className="lp-price-card fade-in">
          <div className="lp-price-main">
            <span className="lp-price-label">{C.label}</span>
            <span className="lp-offer-badge">{C.launchOffer}</span>
            <p className="lp-price-amount">
              <span className="lp-sr-only">{format(C.srPrice, v)}</span>
              <s className="lp-price-old" aria-hidden="true">{`₹${LIST_PRICE}`}</s>
              <span className="lp-price-now" aria-hidden="true">
                <span className="lp-price-currency">₹</span>
                {price}
              </span>
              <span className="lp-price-period" aria-hidden="true">{C.period}</span>
            </p>
            <p className="lp-price-save">{format(C.save, v)}</p>
            <p className="lp-price-note">{C.note}</p>
            <CtaButton dataCta="pricing">{format(C.cta, v)}</CtaButton>
            <Link to={REFUND_HREF} className="lp-link lp-link--night">
              {C.refund}
            </Link>
          </div>
          <ul className="lp-price-list">
            {C.items.map((item) => (
              <li key={item}>{format(item, v)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
