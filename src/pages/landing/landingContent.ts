// Single, auditable source for landing-page copy and facts.
// Rule: only true, verifiable product facts. No user counts, ratings,
// testimonials, logos, awards or superlatives.

export const HERO = {
  eyebrow: 'Built for the Indian job market',
  title: "A resume that gets past the bots and into a human's hands.",
  caption: 'Try it: pick a template and colour. Nothing is uploaded.',
  secondaryCta: 'See templates',
  secondaryHref: '#templates',
} as const;

export const heroSub = (price: number | string): string =>
  `An ATS-friendly resume builder for Indian job seekers. ₹${price} once. No subscription.`;

export const heroPrimaryCta = (price: number | string): string => `Build my resume — ₹${price}`;

export const heroFactChips = (price: number | string, templateCount: number): string[] => [
  'Real-text PDF',
  'Data stays in your browser',
  `One-time ₹${price}`,
  `${templateCount} templates`,
];
