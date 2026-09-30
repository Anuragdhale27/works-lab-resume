import { TemplateCard } from '../../../components/TemplateCard';
import { TEMPLATE_KEYS, TEMPLATES } from '../../../templates';
import { useLang } from '../../../i18n/LangContext';
import { format } from '../../../i18n/format';
import { SectionHeader } from '../parts/SectionHeader';

export function Templates() {
  const { messages: m } = useLang();
  const C = m.templates;
  return (
    <section className="lp-tpls" id="templates" data-section="templates">
      <div className="container">
        <SectionHeader eyebrow={C.eyebrow} title={format(C.title, { count: TEMPLATE_KEYS.length })} lead={C.lead} />
        <div
          className="lp-tpls-grid"
          role="region"
          aria-label={C.carouselLabel}
          tabIndex={0}
        >
          {TEMPLATE_KEYS.map((key) => (
            <TemplateCard key={key} template={TEMPLATES[key]} />
          ))}
        </div>
      </div>
    </section>
  );
}
