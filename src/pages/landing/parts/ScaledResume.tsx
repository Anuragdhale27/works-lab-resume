import { useLayoutEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import type { ResumeData } from '../../../types/resume';

const PAGE_WIDTH = 794;

interface ScaledResumeProps {
  Component: ComponentType<{ data: ResumeData }>;
  data: ResumeData;
}

/** Renders a resume template at its real 794px width, scaled to fit the
 * container width. Fixed A4 aspect ratio means switching templates never
 * shifts layout. Purely decorative: not interactive, hidden from AT. */
export function ScaledResume({ Component, data }: ScaledResumeProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setScale(w / PAGE_WIDTH);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="lp-scaled" aria-hidden="true" inert>
      <div
        className="lp-scaled-inner"
        style={{ width: PAGE_WIDTH, transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}
      >
        <Component data={data} />
      </div>
    </div>
  );
}
