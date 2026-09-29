import { describe, expect, it } from 'vitest';
import { LANGUAGES } from './languages';
import type { LangCode } from './languages';
import { loadMessages } from './messages';
import { en } from './messages/en';
import { TEMPLATE_META_REGISTRY } from '../templates/meta';
import { ACCENT_PRESETS } from '../lib/accentPresets';

/**
 * Languages whose messages/<code>.ts still just re-exports English. They are
 * skipped by the translation-quality checks below (Latin text, script block,
 * differs-from-English). Whoever translates a language MUST remove its code
 * from this list in the same change; the goal is for it to end up empty.
 * Structure, placeholder and digit checks still run for every language.
 */
const PLACEHOLDER_LANGS: LangCode[] = ['ta', 'te'];

/** Strings that may legitimately equal English or lack native script (none yet). */
const SAME_AS_ENGLISH_OK = new Set<string>([]);

const SCRIPT: Record<Exclude<LangCode, 'en'>, RegExp> = {
  hi: /[ऀ-ॿ]/,
  mr: /[ऀ-ॿ]/,
  bn: /[ঀ-৿]/,
  ta: /[஀-௿]/,
  te: /[ఀ-౿]/,
};

// Terms that stay Latin in every language.
const TEMPLATE_NAMES = Object.values(TEMPLATE_META_REGISTRY).flatMap((t) => [t.name, t.name.replace(' ATS', '')]);
const ALLOWED_TERMS = [
  ...TEMPLATE_NAMES,
  'Download PDF', 'Save as PDF', 'Microsoft Word', 'GitHub Pages', 'Works Lab', 'WorksLab',
  'ATS', 'PDF', 'Word', 'docx', 'JSON', 'A4',
].sort((a, b) => b.length - a.length);

type Leaf = [path: string, value: string];
const leaves = (v: unknown, path = ''): Leaf[] => {
  if (typeof v === 'string') return [[path, v]];
  if (Array.isArray(v)) return v.flatMap((x, i) => leaves(x, `${path}[${i}]`));
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => leaves(x, path ? `${path}.${k}` : k));
  return [];
};
const shape = (v: unknown): unknown => {
  if (typeof v === 'string') return 'string';
  if (Array.isArray(v)) return v.map(shape);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b)).map(([k, x]) => [k, shape(x)]));
  return typeof v;
};
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
const digits = (s: string) => s.match(/\d+/g) ?? [];

const enLeaves = leaves(en);
const enByPath = new Map(enLeaves);

describe('accent colour names', () => {
  it('has a translation slot for every accent preset', () => {
    for (const p of ACCENT_PRESETS) expect(en.colors, p.name).toHaveProperty(p.name);
  });
});

describe.each(LANGUAGES.filter((l) => l.code !== 'en').map((l) => l.code))('messages: %s', (code) => {
  const skipQuality = PLACEHOLDER_LANGS.includes(code);
  const getMessages = () => loadMessages(code);

  it('has the same key structure as English (arrays included)', async () => {
    expect(shape(await getMessages())).toEqual(shape(en));
  });

  it('has no empty strings', async () => {
    for (const [path, s] of leaves(await getMessages())) expect(s.trim(), path).not.toBe('');
  });

  it('uses exactly the same placeholders as English', async () => {
    for (const [path, s] of leaves(await getMessages())) {
      expect(placeholders(s), path).toEqual(placeholders(enByPath.get(path) ?? ''));
    }
  });

  it('contains the same digit sequences as English (no invented numbers)', async () => {
    for (const [path, s] of leaves(await getMessages())) {
      expect(digits(s), `${path}: "${s}"`).toEqual(digits(enByPath.get(path) ?? ''));
    }
  });

  it.skipIf(skipQuality)('keeps prices in Western digits', async () => {
    for (const [path, s] of leaves(await getMessages())) {
      expect(/[०-९০-৯௦-௯౦-౯]/.test(s), path).toBe(false);
    }
  });

  it.skipIf(skipQuality)('leaves no untranslated Latin words (except allowed terms)', async () => {
    for (const [path, s] of leaves(await getMessages())) {
      let rest = s.replace(/\{\w+\}/g, '');
      for (const term of ALLOWED_TERMS) rest = rest.split(term).join('');
      expect(/[A-Za-z]/.test(rest), `${path}: "${s}" has Latin text outside the allowed terms`).toBe(false);
    }
  });

  it.skipIf(skipQuality)('is written in the language’s script and differs from English', async () => {
    for (const [path, s] of leaves(await getMessages())) {
      if (SAME_AS_ENGLISH_OK.has(path)) continue;
      expect(SCRIPT[code as Exclude<LangCode, 'en'>].test(s), `${path}: "${s}" has no ${code} script`).toBe(true);
      expect(s, `${path} equals the English string`).not.toBe(enByPath.get(path));
    }
  });
});

describe('placeholder guard', () => {
  it('PLACEHOLDER_LANGS only lists languages that really re-export English', async () => {
    for (const code of PLACEHOLDER_LANGS) {
      expect(await loadMessages(code), `${code} is translated: remove it from PLACEHOLDER_LANGS`).toBe(en);
    }
    for (const l of LANGUAGES) {
      if (l.code === 'en' || PLACEHOLDER_LANGS.includes(l.code)) continue;
      expect(await loadMessages(l.code), `${l.code} still re-exports English: add it to PLACEHOLDER_LANGS`).not.toBe(en);
    }
  });
});
