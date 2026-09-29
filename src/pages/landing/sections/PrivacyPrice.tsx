import { Link } from 'react-router-dom';
import { CONFIG } from '../../../lib/config';
import { PRIVACY_PRICE as C } from '../landingContent';
import { SectionHeader } from '../parts/SectionHeader';

export function PrivacyPrice() {
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
              {C.price.points(CONFIG.PRODUCT_PRICE).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link to={C.refundHref} className="lp-link">
              {C.refund}
            </Link>
          </div>
        </div>
        <p className="lp-pp-note fade-in">{C.note}</p>
      </div>
    </section>
  );
}
