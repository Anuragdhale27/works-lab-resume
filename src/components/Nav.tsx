import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG, goToPayment } from '../lib/config';
import { ThemeToggle } from '../pages/landing/theme/ThemeToggle';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { useLang } from '../i18n/LangContext';
import { format } from '../i18n/format';

export function Nav({
  fontClass,
  showThemeToggle,
  showLanguage,
}: { fontClass?: string; showThemeToggle?: boolean; showLanguage?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const { messages: m } = useLang();
  const vars = { price: CONFIG.PRODUCT_PRICE };

  return (
    <>
      <nav className={fontClass}>
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="nav-logo">
              Works<span>Lab</span>
            </Link>
            <ul className="nav-links">
              <li>
                <a href="/#templates">{m.nav.templates}</a>
              </li>
              <li>
                <a href="/#how-it-works">{m.nav.howItWorks}</a>
              </li>
              <li>
                <a href="/#pricing">{m.nav.pricing}</a>
              </li>
              <li>
                <a href="/#faq">{m.nav.faq}</a>
              </li>
              {(showThemeToggle || showLanguage) && (
                <li>
                  {/* Slot for small nav controls: language and theme. */}
                  <div className="lp-nav-tools">
                    {showLanguage && <LanguageSwitcher variant="compact" />}
                    {showThemeToggle && <ThemeToggle variant="compact" />}
                  </div>
                </li>
              )}
              <li>
                <a
                  href="/#templates"
                  className="nav-cta"
                  data-cta="nav"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPayment('modern');
                  }}
                >
                  {format(m.nav.build, vars)}
                </a>
              </li>
            </ul>
            <div className="nav-mobile-actions">
              <button
                type="button"
                className="nav-cta nav-cta-mobile"
                data-cta="nav"
                onClick={() => goToPayment('modern')}
              >
                {format(m.nav.buildShort, vars)}
              </button>
              <button
                className="nav-menu-btn"
                aria-label={m.nav.menu}
                aria-expanded={open}
                aria-controls="mobileNav"
                onClick={() => setOpen((o) => !o)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav${open ? ' open' : ''}${fontClass ? ` ${fontClass}` : ''}`} id="mobileNav">
        <a href="/#templates" onClick={() => setOpen(false)}>{m.nav.templates}</a>
        <a href="/#how-it-works" onClick={() => setOpen(false)}>{m.nav.howItWorks}</a>
        <a href="/#pricing" onClick={() => setOpen(false)}>{m.nav.pricing}</a>
        <a href="/#faq" onClick={() => setOpen(false)}>{m.nav.faq}</a>
        <a
          href="/#templates"
          className="mobile-nav-cta"
          data-cta="nav"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            goToPayment('modern');
          }}
        >
          {format(m.nav.build, vars)}
        </a>
        {showLanguage && <LanguageSwitcher variant="grid" />}
        {showThemeToggle && (
          <div className="lp-nav-tools lp-nav-tools--panel">
            <ThemeToggle variant="segmented" />
          </div>
        )}
      </div>
    </>
  );
}
