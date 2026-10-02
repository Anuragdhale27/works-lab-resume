import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(__dirname, 'site-font.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

describe('site-font.css guard', () => {
  it('has no Playfair, Inter or --serif', () => {
    for (const bad of ['Playfair', 'Inter', '--serif']) expect(css.includes(bad), bad).toBe(false);
  });
  it('only declares font-family as var(--lp-font)', () => {
    const values = [...css.matchAll(/font-family\s*:\s*([^;]+);/g)].map((m) => m[1].trim());
    expect(values.length).toBeGreaterThan(0);
    for (const v of values) expect(v).toBe('var(--lp-font)');
  });
  it('excludes the resume preview frame', () => {
    expect(css).toContain(':not(.template-detail-frame, .template-detail-frame *)');
  });
});
