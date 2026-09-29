import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(__dirname, '../../..');
const rawCss = readFileSync(resolve(root, 'src/styles/landing.css'), 'utf8');
const css = rawCss.replace(/\/\*[\s\S]*?\*\//g, '');
const landing = readFileSync(resolve(root, 'src/pages/Landing.tsx'), 'utf8');

describe('landing font guard (one font: Poppins)', () => {
  it('has no Playfair, --serif, monospace or Inter in landing.css', () => {
    for (const bad of ['Playfair', '--serif', 'monospace', 'Inter']) {
      expect(css.includes(bad), bad).toBe(false);
    }
  });

  it('only declares font-family as var(--lp-font), inherit, or var(--font) in the resume frame', () => {
    const decls = [...css.matchAll(/([^{}]*)\{([^{}]*)\}/g)].flatMap(([, sel, body]) =>
      [...body.matchAll(/font-family\s*:\s*([^;]+);/g)].map((m) => ({ sel: sel.trim(), value: m[1].trim() })),
    );
    expect(decls.length).toBeGreaterThan(0);
    for (const { sel, value } of decls) {
      if (value === 'var(--lp-font)' || value === 'inherit') continue;
      if (value === 'var(--font)' && sel === '.lp-resume-frame') continue;
      // MessyResume is deliberately a Times-like "bad resume" picture.
      if (sel === '.lp-messy' && value.startsWith("'Times New Roman'")) continue;
      throw new Error(`Unexpected font-family "${value}" in "${sel}"`);
    }
  });

  it('Landing.tsx imports the fonts module', () => {
    expect(landing).toMatch(/import ['"]\.\/landing\/fonts['"]/);
  });
});
