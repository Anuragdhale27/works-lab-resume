import { Link } from 'react-router-dom';
import type { TemplateMeta } from '../templates';
import { TemplatePreview } from './TemplatePreview';
import { CONFIG, goToPayment } from '../lib/config';
import { useLang } from '../i18n/LangContext';
import { format } from '../i18n/format';

export function TemplateCard({ template }: { template: TemplateMeta }) {
  const { messages: m } = useLang();
  const C = m.templates;
  return (
    <div className="lp-tpl-card fade-in">
      <Link to={`/template/${template.key}`} className="lp-tpl-preview lp-resume-frame" aria-label={format(C.previewAria, { name: template.name })}>
        <TemplatePreview template={template} />
      </Link>
      <div className="lp-tpl-body">
        <span className="badge badge-green lp-tpl-badge">{C.atsFriendly}</span>
        <div className="lp-tpl-name">{template.name}</div>
        <div className="lp-tpl-best">{format(C.bestFor, { best: C.best[template.key] ?? template.best })}</div>
        <div className="lp-tpl-footer">
          <div className="lp-tpl-price">₹{CONFIG.PRODUCT_PRICE}</div>
          <div className="lp-tpl-actions">
            <Link to={`/template/${template.key}`} className="btn btn-outline btn-sm">
              {C.preview}
            </Link>
            <button className="btn btn-primary btn-sm" data-cta={`card-${template.key}`} onClick={() => goToPayment(template.key)}>
              {C.getThis}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
