import { describe, it, expect } from 'vitest';
import { LIST_PRICE, priceVars } from './landingContent';
import { landingResumeData } from './landingData';
import { en } from '../../i18n/messages/en';
import { format } from '../../i18n/format';
import { TEMPLATE_META_REGISTRY } from '../../templates/meta';

// The audit runs against the English source of truth (`en`).
// Matched at a word start so "preview" does not trip "review".
const BANNED = [
  'trusted', 'thousand', 'million', 'users', 'customers', 'rated', 'rating', 'review',
  'testimonial', '#1', 'best', 'award', 'guarantee', 'instant', 'fastest',
  'encrypt', 'gdpr', 'no tracking', 'upsell', 'secure', 'unlimited', 'free updates',
  'competitor', 'leading', 'top-rated',
];
const BANNED_RE = BANNED.map((w) => new RegExp(`(^|[^a-z0-9])${w.replace('#', '\\#')}`, 'i'));

/** Every string in the messages, with its dotted path, placeholders filled with the launch price. */
const entries = (v: unknown, path = ''): [string, string][] => {
  if (typeof v === 'string') return [[path, format(v, priceVars(149, 6))]];
  if (Array.isArray(v)) return v.flatMap((x, i) => entries(x, `${path}.${i}`));
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => entries(x, path ? `${path}.${k}` : k));
  return [];
};
const all = entries(en);

// "Best for:" is a label for a template's audience, not a superlative claim.
const BANNED_EXEMPT = new Set(['templates.bestFor']);

// The only strings allowed to talk about an offer or a saving (the price copy).
const PRICE_COPY = new Set(['hero.chips.2', 'pricing.launchOffer', 'pricing.save', 'pricing.srPrice']);

describe('English landing copy', () => {
  it('has content to check', () => {
    expect(all.length).toBeGreaterThan(100);
  });

  it('contains no unverifiable claims or superlatives', () => {
    for (const [path, s] of all) {
      if (BANNED_EXEMPT.has(path)) continue;
      BANNED_RE.forEach((re, i) => {
        expect(re.test(s), `${path}: "${s}" contains "${BANNED[i]}"`).toBe(false);
      });
    }
  });

  it('keeps the exact hero headline', () => {
    expect(en.hero.title).toBe("A resume that gets past the bots and into a human's hands.");
  });

  it('keeps the FAQ lifetime-access wording in the pricing list', () => {
    expect(en.pricing.items).toContain('Lifetime access to the builder and all six templates');
  });

  it('has six feature tiles and two large tiles', () => {
    expect(en.features.small).toHaveLength(6);
    expect(en.features.large).toHaveLength(2);
  });

  it('keeps template "best for" text in step with the template registry', () => {
    for (const [key, meta] of Object.entries(TEMPLATE_META_REGISTRY)) {
      expect(en.templates.best[key as keyof typeof en.templates.best]).toBe(meta.best);
    }
  });
});

describe('launch price copy', () => {
  it('lists a higher regular price than the current price', () => {
    expect(LIST_PRICE).toBeGreaterThan(149);
  });

  it('computes the saving as the plain difference', () => {
    const v = priceVars(149);
    expect(v.save).toBe(LIST_PRICE - 149);
    expect(format(en.pricing.save, v)).toBe('You save ₹151');
    expect(format(en.pricing.srPrice, v)).toBe('Original price ₹300, now ₹149');
    expect(format(en.hero.chips[2], v)).toBe('₹149 launch offer');
  });

  it('uses "offer" and "save" only in the price helpers', () => {
    const re = /\boffer|you save|savings/i;
    for (const [path, s] of all) {
      if (PRICE_COPY.has(path)) continue;
      expect(re.test(s), `${path}: "${s}" is outside the price helpers`).toBe(false);
    }
  });

  it('makes no percentage, urgency or scarcity claims', () => {
    const urgent = /%|percent|limited|hurry|\bends?\b|\bonly\b|last chance|countdown|left|expires|deadline|today only/i;
    for (const [path, s] of all) {
      // FAQ answers are long-form product facts ("stored only in your own browser").
      if (path.startsWith('faq.items')) continue;
      expect(urgent.test(s), `${path}: "${s}" reads as an urgency claim`).toBe(false);
    }
  });
});

describe('landingResumeData', () => {
  it('is the sample resume without awards or custom sections', () => {
    expect(landingResumeData.awards).toEqual([]);
    expect(landingResumeData.customSections).toEqual([]);
    expect(landingResumeData.personal.name).toBe('Rahul Sharma');
  });
});
