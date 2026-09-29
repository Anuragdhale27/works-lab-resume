import { Link } from 'react-router-dom';
import { CONFIG } from '../../../lib/config';
import { useLang } from '../../../i18n/LangContext';
import { format } from '../../../i18n/format';
import { REFUND_HREF, priceVars } from '../landingContent';
import { SectionHeader } from '../parts/SectionHeader';

export function PrivacyPrice() {
  const { messages: m } = useLang();
  const C = m.privacyPrice;
  return (
    <section className="lp-pp" data-section="privacy-price">
      <div className="container">
        <SectionHeader eyebrow={C.eyebrow} title={C.title} />
        <div className="lp-pp-grid">
          <div className="lp-pp-col fade-in">
            <h3>{C.privacy.title}</h3>
            <ul>
              {C.privacy.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="lp-pp-col fade-in">
            <h3>{C.price.title}</h3>
            <ul>
              {C.price.points.map((p) => (
                <li key={p}>{format(p, priceVars(CONFIG.PRODUCT_PRICE))}</li>
              ))}
            </ul>
            <Link to={REFUND_HREF} className="lp-link">
              {C.refund}
            </Link>
          </div>
        </div>
        <p className="lp-pp-note fade-in">{C.note}</p>
      </div>
    </section>
  );
}
