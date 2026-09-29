import { CONFIG } from '../../../lib/config';
import { FINAL_CTA as C } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';

export function FinalCta() {
  const price = CONFIG.PRODUCT_PRICE;
  return (
    <section className="lp-final" data-section="final-cta">
      <div className="container">
        <h2 className="lp-final-title fade-in">{C.title}</h2>
        <div className="fade-in">
          <CtaButton variant="light" dataCta="final">{C.cta(price)}</CtaButton>
        </div>
        <ul className="lp-final-trust fade-in">
          {C.trust(price).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
