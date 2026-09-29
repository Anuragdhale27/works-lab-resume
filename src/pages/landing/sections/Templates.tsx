import { TemplateCard } from '../../../components/TemplateCard';
import { TEMPLATE_KEYS, TEMPLATES } from '../../../templates';
import { TEMPLATES_SECTION as C } from '../landingContent';
import { SectionHeader } from '../parts/SectionHeader';

export function Templates() {
  return (
    <section className="lp-tpls" id="templates" data-section="templates">
      <div className="container">
        <SectionHeader eyebrow={C.eyebrow} title={C.title(TEMPLATE_KEYS.length)} lead={C.lead} />
        <div
          className="lp-tpls-grid"
          role="region"
          aria-label="Resume templates, scroll sideways to see all"
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
