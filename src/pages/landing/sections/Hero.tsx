import { CONFIG } from '../../../lib/config';
import { TEMPLATE_KEYS } from '../../../templates';
import { useLang } from '../../../i18n/LangContext';
import { format } from '../../../i18n/format';
import { HERO_SECONDARY_HREF, priceVars } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';
import { HeroStudio } from '../parts/HeroStudio';

export function Hero() {
  const price = CONFIG.PRODUCT_PRICE;
  const { messages: m } = useLang();
  const v = priceVars(price, TEMPLATE_KEYS.length);
  const h = m.hero;
  return (
    <section className="lp-hero2" data-section="hero">
      <div className="container lp-hero2-inner">
        <div className="lp-hero2-text">
          <span className="lp-eyebrow">{h.eyebrow}</span>
          <h1 className="lp-hero2-title">{h.title}</h1>
          <p className="lp-hero2-sub">{format(h.sub, v)}</p>
          <div className="lp-hero2-actions">
            <CtaButton dataCta="hero">{format(h.ctaPrimary, v)}</CtaButton>
            <a href={HERO_SECONDARY_HREF} className="lp-btn lp-btn--ghost">
              {h.ctaSecondary}
            </a>
          </div>
          <ul className="lp-chips">
            {h.chips.map((c) => (
              <li key={c}>{format(c, v)}</li>
            ))}
          </ul>
        </div>
        <div className="lp-hero2-visual">
          <HeroStudio />
        </div>
      </div>
    </section>
  );
}
