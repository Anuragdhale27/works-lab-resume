import { describe, it, expect } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import { sampleResumeData } from '../../lib/sampleData';
import type { ResumeData } from '../../types/resume';
import { useParsedText } from './useParsedText';
import { ParsedText } from './parts/ParsedText';

describe('useParsedText', () => {
  const text = renderHook(() => useParsedText(sampleResumeData)).result.current;
  const lines = text.split('\n');

  it('starts with the name, then title', () => {
    expect(lines[0]).toBe('Rahul Sharma');
    expect(lines[1]).toBe('Software Engineer');
  });

  it('prints WORK EXPERIENCE before SKILLS', () => {
    expect(text.indexOf('WORK EXPERIENCE')).toBeGreaterThan(-1);
    expect(text.indexOf('WORK EXPERIENCE')).toBeLessThan(text.indexOf('SKILLS'));
  });

  it('keeps bullets as "• " lines', () => {
    expect(lines.some((l) => l.startsWith('• Led development of microservices'))).toBe(true);
  });

  it('skips empty sections', () => {
    const sparse: ResumeData = {
      ...sampleResumeData,
      projects: [],
      certifications: [],
      languages: [],
      awards: [],
      customSections: [],
    };
    const t = renderHook(() => useParsedText(sparse)).result.current;
    for (const h of ['PROJECTS', 'CERTIFICATIONS', 'LANGUAGES', 'AWARDS & ACHIEVEMENTS', 'VOLUNTEERING']) {
      expect(t).not.toContain(h);
    }
    expect(t).toContain('SKILLS');
  });

  it('renders as a labelled pre', () => {
    const { container } = render(<ParsedText data={sampleResumeData} label="Extracted" />);
    const pre = container.querySelector('pre');
    expect(pre?.textContent).toBe(text);
    expect(pre?.getAttribute('aria-label')).toBe('Extracted');
  });
});
