import { CONFIG } from '../../../lib/config';
import { useLang } from '../../../i18n/LangContext';
import { format } from '../../../i18n/format';
import { LIST_PRICE, priceVars } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';

export function FinalCta() {
  const price = CONFIG.PRODUCT_PRICE;
  const { messages: m } = useLang();
  const C = m.finalCta;
  const v = priceVars(price);
  return (
    <section className="lp-final" data-section="final-cta">
      <div className="container">
        <h2 className="lp-final-title fade-in">{C.title}</h2>
        <p className="lp-final-offer fade-in">
          <span aria-hidden="true">{m.pricing.launchOffer}: </span>
          <span className="lp-sr-only">{m.pricing.launchOffer}, {format(m.pricing.srPrice, v)}</span>
          <strong aria-hidden="true">{`₹${price}`}</strong>{' '}
          <s aria-hidden="true">{`₹${LIST_PRICE}`}</s>
        </p>
        <div className="fade-in">
          <CtaButton variant="light" dataCta="final">{format(C.cta, v)}</CtaButton>
        </div>
        <ul className="lp-final-trust fade-in">
          {C.trust.map((t) => (
            <li key={t}>{format(t, v)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
