import { describe, it, expect } from 'vitest';
import {
  HERO, heroSub, heroPrimaryCta, heroFactChips, factStripItems, BEFORE_AFTER, ATS_DEMO,
} from './landingContent';

const BANNED = [
  'trusted', 'thousand', 'million', 'users', 'customers', 'rated', 'rating', 'review',
  'testimonial', '#1', 'best', 'award', 'guarantee', 'instant', 'fastest',
];

describe('landingContent', () => {
  const strings = [
    ...Object.values(HERO),
    heroSub(149),
    heroPrimaryCta(149),
    ...heroFactChips(149, 6),
    ...factStripItems(149, 6).flatMap((f) => [f.title, f.text]),
    ...Object.values(BEFORE_AFTER).flat(),
    ...Object.values(ATS_DEMO).map((v) => (typeof v === 'function' ? v(149) : v)),
  ];

  it('has content to check', () => {
    expect(strings.length).toBeGreaterThan(8);
  });

  it('contains no unverifiable claims or superlatives', () => {
    for (const s of strings) {
      const lower = s.toLowerCase();
      for (const word of BANNED) {
        expect(lower.includes(word), `"${s}" contains "${word}"`).toBe(false);
      }
    }
  });

  it('keeps the exact hero headline', () => {
    expect(HERO.title).toBe("A resume that gets past the bots and into a human's hands.");
  });
});
