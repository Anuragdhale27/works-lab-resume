import { useState } from 'react';
import { TEMPLATES } from '../../../templates';
import { landingResumeData } from '../landingData';
import { useLang } from '../../../i18n/LangContext';
import { MessyResume } from '../parts/MessyResume';
import { ScaledResume } from '../parts/ScaledResume';
import { SegmentedToggle } from '../parts/SegmentedToggle';

export function BeforeAfter() {
  const { messages: m } = useLang();
  const C = m.beforeAfter;
  const [view, setView] = useState<'before' | 'after'>('before');

  return (
    <section className="lp-ba" data-section="before-after">
      <div className="container">
        <div className="lp-section-head">
          <span className="lp-eyebrow fade-in">{C.eyebrow}</span>
          <h2 className="lp-section-title fade-in">{C.title}</h2>
          <p className="lp-section-sub fade-in">{C.lead}</p>
        </div>

        <div className="fade-in">
          <div className="lp-ba-switch">
            <SegmentedToggle
              idPrefix="lp-ba"
              label={C.tabsLabel}
              value={view}
              onChange={(v) => setView(v as 'before' | 'after')}
              options={[
                { id: 'before', label: C.beforeTab, controls: 'lp-ba-panel-before' },
                { id: 'after', label: C.afterTab, controls: 'lp-ba-panel-after' },
              ]}
            />
          </div>

          <div className="lp-ba-grid">
            <div className="lp-ba-panel" id="lp-ba-panel-before" role="group" aria-labelledby="lp-ba-before-label" data-active={view === 'before'}>
              <p className="lp-ba-label" id="lp-ba-before-label">
                {C.beforeLabel} <span className="lp-ba-badge">{C.badge}</span>
              </p>
              <ScaledResume>
                <MessyResume />
              </ScaledResume>
              <ul className="lp-ba-notes lp-ba-notes--bad">
                {C.beforeNotes.map((n, i) => (
                  <li key={n}>
                    <span className="lp-ba-num" aria-hidden="true">{i + 1}</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp-ba-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </div>

            <div className="lp-ba-panel" id="lp-ba-panel-after" role="group" aria-labelledby="lp-ba-after-label" data-active={view === 'after'}>
              <p className="lp-ba-label" id="lp-ba-after-label">{C.afterLabel}</p>
              <ScaledResume Component={TEMPLATES.modern.Component} data={landingResumeData} />
              <ul className="lp-ba-notes lp-ba-notes--good">
                {C.afterNotes.map((n) => (
                  <li key={n}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="lp-ba-caption">{C.caption}</p>
        </div>
      </div>
    </section>
  );
}
