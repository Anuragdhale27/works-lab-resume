import type { ReactNode } from 'react';
import { FEATURES as C } from '../landingContent';
import type { FeatureIcon, FeatureTile } from '../landingContent';
import { SectionHeader } from '../parts/SectionHeader';

const ICONS: Record<FeatureIcon, ReactNode> = {
  preview: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M5 14h14" strokeDasharray="2.5 2.5" />
      <path d="M8 7h8M8 10h6" />
    </>
  ),
  export: (
    <>
      <path d="M12 3v11M8 10l4 4 4-4" />
      <path d="M5 19h14" />
    </>
  ),
  undo: (
    <>
      <path d="M9 7L4 12l5 5" />
      <path d="M4 12h10a6 6 0 0 1 6 6" />
    </>
  ),
  accent: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8.5" cy="10" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <circle cx="15.5" cy="10" r="1" />
      <path d="M12 21a2.5 2.5 0 0 1 0-5h1.5a2 2 0 0 0 0-4" />
    </>
  ),
  sections: (
    <>
      <rect x="4" y="4" width="16" height="4" rx="1" />
      <rect x="4" y="10" width="16" height="4" rx="1" />
      <path d="M12 17v4M10 19h4" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  steps: (
    <>
      <path d="M4 12h16" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </>
  ),
  save: (
    <>
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M8 4v5h7V4" />
      <path d="M8 20v-6h8v6" />
    </>
  ),
};

function Icon({ name }: { name: FeatureIcon }) {
  return (
    <span className="lp-tile-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {ICONS[name]}
      </svg>
    </span>
  );
}

function PreviewMock() {
  return (
    <div className="lp-mock lp-mock--page" aria-hidden="true">
      <div className="lp-mock-sheet">
        <span className="lp-mock-line lp-mock-line--name" />
        <span className="lp-mock-line" />
        <span className="lp-mock-line lp-mock-line--short" />
        <span className="lp-mock-line" />
        <span className="lp-mock-line lp-mock-line--short" />
        <div className="lp-mock-break">
          <span>{C.mock.pageBreak}</span>
        </div>
        <span className="lp-mock-line" />
        <span className="lp-mock-line lp-mock-line--short" />
      </div>
      <div className="lp-mock-pages">
        <span>{C.mock.page}</span>
        <span>{C.mock.pageTwo}</span>
      </div>
    </div>
  );
}

function ExportMock() {
  return (
    <div className="lp-mock lp-mock--files" aria-hidden="true">
      {['PDF', 'DOCX', 'JSON'].map((f) => (
        <span key={f} className="lp-mock-file">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M6 3h8l4 4v14H6z" />
            <path d="M14 3v4h4" />
          </svg>
          {f}
        </span>
      ))}
    </div>
  );
}

function Tile({ tile, large, children }: { tile: FeatureTile; large?: boolean; children?: ReactNode }) {
  return (
    <div className={`lp-tile fade-in${large ? ' lp-tile--large' : ''}`}>
      <div className="lp-tile-copy">
        <Icon name={tile.icon} />
        <h3>{tile.title}</h3>
        <p>{tile.text}</p>
      </div>
      {children}
    </div>
  );
}

export function Features() {
  return (
    <section className="lp-night lp-feat" data-section="features">
      <div className="container">
        <SectionHeader eyebrow={C.eyebrow} title={C.title} tone="night" />
        <div className="lp-bento">
          <Tile tile={C.large[0]} large>
            <PreviewMock />
          </Tile>
          <Tile tile={C.large[1]} large>
            <ExportMock />
          </Tile>
          {C.small.map((t) => (
            <Tile key={t.title} tile={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
