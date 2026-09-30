import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { format } from '../i18n/format';

export function Footer({ fontClass }: { fontClass?: string } = {}) {
  const { messages: m } = useLang();
  const f = m.footer;
  return (
    <footer className={fontClass}>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">
              Works<span className="footer-brand-accent">Lab</span>
            </div>
            <div className="footer-brand-desc">{f.tagline}</div>
          </div>
          <ul className="footer-links">
            <li><a href="/#templates">{f.templates}</a></li>
            <li><a href="/#faq">{f.faq}</a></li>
            <li><a href="mailto:adwork895@gmail.com">{f.contact}</a></li>
            <li><Link to="/privacy">{f.privacy}</Link></li>
            <li><Link to="/terms">{f.terms}</Link></li>
            <li><Link to="/refund">{f.refund}</Link></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>{format(f.copyright, { year: new Date().getFullYear() })}</span>
          <span>{f.madeIn} 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}
