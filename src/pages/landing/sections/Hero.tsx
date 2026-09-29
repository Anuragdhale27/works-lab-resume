import { CONFIG } from '../../../lib/config';
import { TEMPLATE_KEYS } from '../../../templates';
import { HERO, heroSub, heroPrimaryCta, heroFactChips } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';
import { HeroStudio } from '../parts/HeroStudio';

export function Hero() {
  const price = CONFIG.PRODUCT_PRICE;
  return (
    <section className="lp-hero2" data-section="hero">
      <div className="container lp-hero2-inner">
        <div className="lp-hero2-text">
          <span className="lp-eyebrow">{HERO.eyebrow}</span>
          <h1 className="lp-hero2-title">{HERO.title}</h1>
          <p className="lp-hero2-sub">{heroSub(price)}</p>
          <div className="lp-hero2-actions">
            <CtaButton dataCta="hero">{heroPrimaryCta(price)}</CtaButton>
            <a href={HERO.secondaryHref} className="lp-btn lp-btn--ghost">
              {HERO.secondaryCta}
            </a>
          </div>
          <ul className="lp-chips">
            {heroFactChips(price, TEMPLATE_KEYS.length).map((c) => (
              <li key={c}>{c}</li>
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
