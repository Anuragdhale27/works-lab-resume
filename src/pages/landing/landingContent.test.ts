import { describe, it, expect } from 'vitest';
import { HERO, heroSub, heroPrimaryCta, heroFactChips } from './landingContent';

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
