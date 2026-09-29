import { FaqAccordion } from '../../../components/FaqAccordion';
import { FAQ_SECTION as C } from '../landingContent';

export function Faq() {
  return (
    <section className="lp-faq2" id="faq" data-section="faq">
      <div className="container lp-faq2-grid">
        <div className="lp-faq2-intro">
          <span className="lp-eyebrow fade-in">{C.eyebrow}</span>
          <h2 className="lp-section-title fade-in">{C.title}</h2>
          <p className="lp-section-sub fade-in">{C.lead}</p>
        </div>
        <FaqAccordion />
      </div>
    </section>
  );
}
