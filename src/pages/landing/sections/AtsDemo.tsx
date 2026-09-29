import { useState } from 'react';
import { CONFIG } from '../../../lib/config';
import { TEMPLATES } from '../../../templates';
import { sampleResumeData } from '../../../lib/sampleData';
import sampleAvatar from '../../../assets/sample-avatar.png';
import { ATS_DEMO as C } from '../landingContent';
import { CtaButton } from '../parts/CtaButton';
import { ParsedText } from '../parts/ParsedText';
import { ScaledResume } from '../parts/ScaledResume';
import { SegmentedToggle } from '../parts/SegmentedToggle';

const resumeData = {
  ...sampleResumeData,
  personal: { ...sampleResumeData.personal, photo: sampleAvatar },
};

export function AtsDemo() {
  const [view, setView] = useState<'resume' | 'text'>('resume');

  return (
    <section className="lp-night lp-atsd" data-section="ats-demo">
      <div className="container">
        <div className="lp-atsd-head">
          <span className="lp-eyebrow lp-eyebrow--night fade-in">{C.eyebrow}</span>
          <h2 className="lp-section-title lp-section-title--night fade-in">{C.title}</h2>
          <p className="lp-section-sub lp-section-sub--night fade-in">{C.lead}</p>
        </div>

        <div className="fade-in">
          <div className="lp-atsd-switch">
            <SegmentedToggle
              idPrefix="lp-atsd"
              label={C.toggleLabel}
              tone="night"
              value={view}
              onChange={(v) => setView(v as 'resume' | 'text')}
              options={[
                { id: 'resume', label: C.resumeTab, controls: 'lp-atsd-panel-resume' },
                { id: 'text', label: C.textTab, controls: 'lp-atsd-panel-text' },
              ]}
            />
          </div>

          <div className="lp-atsd-stage">
            <div className="lp-atsd-view" id="lp-atsd-panel-resume" role="tabpanel" aria-labelledby="lp-atsd-resume" hidden={view !== 'resume'}>
              <ScaledResume Component={TEMPLATES.modern.Component} data={resumeData} />
            </div>
            <div className="lp-atsd-view lp-atsd-view--text" id="lp-atsd-panel-text" role="tabpanel" aria-labelledby="lp-atsd-text" hidden={view !== 'text'}>
              <ParsedText data={sampleResumeData} label={C.textRegionLabel} />
            </div>
          </div>

          <p className="lp-atsd-note">{C.note}</p>
          <div className="lp-atsd-cta">
            <CtaButton dataCta="ats">{C.cta(CONFIG.PRODUCT_PRICE)}</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
