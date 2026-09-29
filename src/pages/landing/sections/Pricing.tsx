import { Link } from 'react-router-dom';
import { CONFIG } from '../../../lib/config';
import { TEMPLATE_KEYS } from '../../../templates';
import { PRICING as C } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';
import { SectionHeader } from '../parts/SectionHeader';

export function Pricing() {
  const price = CONFIG.PRODUCT_PRICE;
  return (
    <section className="lp-price" id="pricing" data-section="pricing">
      <div className="container">
        <SectionHeader eyebrow={C.eyebrow} title={C.title} />
        <div className="lp-price-card fade-in">
          <div className="lp-price-main">
            <span className="lp-price-label">{C.label}</span>
            <p className="lp-price-amount">
              <span className="lp-price-currency">₹</span>
              {price}
              <span className="lp-price-period">{C.period}</span>
            </p>
            <p className="lp-price-note">{C.note}</p>
            <CtaButton dataCta="pricing">{C.cta(price)}</CtaButton>
            <Link to={C.refundHref} className="lp-link lp-link--night">
              {C.refund}
            </Link>
          </div>
          <ul className="lp-price-list">
            {C.items(TEMPLATE_KEYS.length).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
