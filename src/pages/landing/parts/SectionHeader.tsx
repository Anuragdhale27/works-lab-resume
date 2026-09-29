import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'light' | 'night';
  align?: 'left' | 'center';
}

/** Eyebrow + h2 + optional lead, shared by the landing sections. */
export function SectionHeader({ eyebrow, title, lead, tone = 'light', align = 'center' }: SectionHeaderProps) {
  const night = tone === 'night';
  return (
    <div className={`lp-head lp-head--${align}`}>
      <span className={`lp-eyebrow fade-in${night ? ' lp-eyebrow--night' : ''}`}>{eyebrow}</span>
      <h2 className={`lp-section-title fade-in${night ? ' lp-section-title--night' : ''}`}>{title}</h2>
      {lead && <p className={`lp-section-sub fade-in${night ? ' lp-section-sub--night' : ''}`}>{lead}</p>}
    </div>
  );
}
