import { useMemo } from 'react';
import type { ResumeData } from '../../types/resume';
import { resolveSectionOrder } from '../../lib/sectionOrder';
import { parseDescription } from '../../lib/parseDescription';

const range = (start?: string, end?: string): string =>
  start || end ? `${start ?? ''} – ${end || 'Present'}` : '';

const describe = (text: string | undefined): string[] => {
  const lines: string[] = [];
  for (const block of parseDescription(text)) {
    if (block.type === 'bullets') block.items?.forEach((i) => lines.push(`• ${i}`));
    else if (block.text) lines.push(block.text);
  }
  return lines;
};

const join2 = (a: string | undefined, b: string | undefined, sep: string): string =>
  [a, b].filter(Boolean).join(sep);

/** Plain-text reading order of what the Modern template prints. */
export function buildParsedText(data: ResumeData): string {
  const p = data.personal;
  const out: string[] = [];

  out.push(p.name || 'Your Name');
  if (p.title) out.push(p.title);
  const contact = [p.email, p.phone, p.location, p.linkedin, p.portfolio].filter(Boolean).join(' | ');
  if (contact) out.push(contact);

  const section = (title: string, lines: string[]) => {
    if (lines.length === 0) return;
    out.push('', title.toUpperCase(), ...lines);
  };
  const customMap = new Map(data.customSections.map((c) => [c.id, c]));

  const builders: Record<string, () => void> = {
    summary: () => section('Professional Summary', describe(data.summary)),
    experience: () =>
      section(
        'Work Experience',
        data.experience.flatMap((e, i) => [
          ...(i ? [''] : []),
          [e.title || 'Job Title', range(e.start, e.end)].filter(Boolean).join('  '),
          join2(e.company, e.location, ' · '),
          ...describe(e.description),
        ]),
      ),
    education: () =>
      section(
        'Education',
        data.education.flatMap((e, i) => [
          ...(i ? [''] : []),
          e.degree || 'Degree',
          join2(e.institution, e.location, ' · '),
          join2(range(e.start, e.end), e.description, ' · '),
        ]),
      ),
    skills: () => section('Skills', data.skills.length ? [data.skills.join(', ')] : []),
    projects: () =>
      section(
        'Projects',
        data.projects.flatMap((pr, i) => [
          ...(i ? [''] : []),
          [pr.name || 'Project', pr.url].filter(Boolean).join('  '),
          ...(pr.tech ? [pr.tech] : []),
          ...describe(pr.description),
        ]),
      ),
    certifications: () =>
      section(
        'Certifications',
        data.certifications.flatMap((c) => [[c.name || 'Certification', c.year].filter(Boolean).join('  '), ...(c.org ? [c.org] : [])]),
      ),
    languages: () =>
      section('Languages', data.languages.length ? [data.languages.map((l) => join2(l.lang, l.level, ' · ')).join(', ')] : []),
    awards: () =>
      section(
        'Awards & Achievements',
        data.awards.flatMap((a) => [
          [a.title || 'Award', a.year].filter(Boolean).join('  '),
          ...(a.issuer ? [a.issuer] : []),
          ...describe(a.description),
        ]),
      ),
  };

  for (const key of resolveSectionOrder(data)) {
    if (key.startsWith('custom:')) {
      const c = customMap.get(key.slice(7));
      if (!c || !(c.title || c.items.some((it) => it.heading || it.description))) continue;
      section(
        c.title,
        c.items.flatMap((it) => [
          [it.heading, it.date].filter(Boolean).join('  '),
          ...(it.subheading ? [it.subheading] : []),
          ...describe(it.description),
        ]),
      );
    } else builders[key]?.();
  }
  return out.join('\n');
}

export function useParsedText(data: ResumeData): string {
  return useMemo(() => buildParsedText(data), [data]);
}
