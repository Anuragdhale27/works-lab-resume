import { describe, it, expect } from 'vitest';
import {
  HERO, heroSub, heroPrimaryCta, heroFactChips, factStripItems, BEFORE_AFTER, ATS_DEMO,
  HOW, TEMPLATES_SECTION, FEATURES, PRIVACY_PRICE, PRICING, FAQ_SECTION, FINAL_CTA, STICKY,
} from './landingContent';
import { landingResumeData } from './landingData';

// Matched at a word start so "preview" does not trip "review".
const BANNED = [
  'trusted', 'thousand', 'million', 'users', 'customers', 'rated', 'rating', 'review',
  'testimonial', '#1', 'best', 'award', 'guarantee', 'instant', 'fastest',
  'encrypt', 'gdpr', 'no tracking', 'upsell', 'secure', 'unlimited', 'free updates',
  'competitor', 'leading', 'top-rated',
];
const BANNED_RE = BANNED.map((w) => new RegExp(`(^|[^a-z0-9])${w.replace('#', '\\#')}`, 'i'));

/** Flatten any string / function / array / object into its strings. */
const flatten = (v: unknown): string[] => {
  if (typeof v === 'string') return [v];
  if (typeof v === 'function') return flatten((v as (a: number) => unknown)(149));
  if (Array.isArray(v)) return v.flatMap(flatten);
  if (v && typeof v === 'object') return Object.values(v).flatMap(flatten);
  return [];
};

describe('landingContent', () => {
  const strings = [
    ...Object.values(HERO),
    heroSub(149),
    heroPrimaryCta(149),
    ...heroFactChips(149, 6),
    ...factStripItems(149, 6).flatMap((f) => [f.title, f.text]),
    ...Object.values(BEFORE_AFTER).flat(),
    ...Object.values(ATS_DEMO).map((v) => (typeof v === 'function' ? v(149) : v)),
    ...[HOW, TEMPLATES_SECTION, FEATURES, PRIVACY_PRICE, PRICING, FAQ_SECTION, FINAL_CTA, STICKY].flatMap(flatten),
  ];

  it('has content to check', () => {
    expect(strings.length).toBeGreaterThan(60);
  });

  it('contains no unverifiable claims or superlatives', () => {
    for (const s of strings) {
      BANNED_RE.forEach((re, i) => {
        expect(re.test(s), `"${s}" contains "${BANNED[i]}"`).toBe(false);
      });
    }
  });

  it('keeps the exact hero headline', () => {
    expect(HERO.title).toBe("A resume that gets past the bots and into a human's hands.");
  });

  it('keeps the FAQ lifetime-access wording in the pricing list', () => {
    expect(PRICING.items(6)).toContain('Lifetime access to the builder and all six templates');
  });

  it('has six feature tiles and two large tiles', () => {
    expect(FEATURES.small).toHaveLength(6);
    expect(FEATURES.large).toHaveLength(2);
  });
});

describe('landingResumeData', () => {
  it('is the sample resume without awards or custom sections', () => {
    expect(landingResumeData.awards).toEqual([]);
    expect(landingResumeData.customSections).toEqual([]);
    expect(landingResumeData.personal.name).toBe('Rahul Sharma');
  });
});
