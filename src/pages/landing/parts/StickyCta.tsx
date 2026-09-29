import { useEffect, useState } from 'react';
import { CONFIG } from '../../../lib/config';
import { STICKY as C } from '../landingContent';
import { CtaButton } from './CtaButton';

// Sections and elements while which the bar stays hidden.
const HIDE_SELECTORS = ['[data-section="pricing"]', '[data-section="final-cta"]', 'footer'];

/** Mobile-only bottom bar. Appears once the hero CTA has scrolled out of
 * view; hides while pricing, the final CTA, the footer or the mobile menu is
 * on screen. Not a `.fade-in` element: it renders conditionally by state. */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [hideBy, setHideBy] = useState<Set<string>>(new Set());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('lp-has-sticky');
    return () => document.documentElement.classList.remove('lp-has-sticky');
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const hero = document.querySelector('[data-section="hero"] [data-cta="hero"]');
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => {
        setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
      });
      o.observe(hero);
      observers.push(o);
    }
    HIDE_SELECTORS.forEach((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        setHideBy((prev) => {
          const next = new Set(prev);
          if (e.isIntersecting) next.add(sel);
          else next.delete(sel);
          return next.size === prev.size && [...next].every((s) => prev.has(s)) ? prev : next;
        });
      });
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const nav = document.getElementById('mobileNav');
    if (!nav || typeof MutationObserver === 'undefined') return;
    const sync = () => setMenuOpen(nav.classList.contains('open'));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(nav, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  const visible = pastHero && hideBy.size === 0 && !menuOpen;

  return (
    <div className="lp-sticky" data-visible={visible} data-section="sticky-cta" inert={!visible} aria-label={C.label} role="region">
      <CtaButton dataCta="sticky">{C.cta(CONFIG.PRODUCT_PRICE)}</CtaButton>
    </div>
  );
}
