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

// ---- Fact strip ----
export type FactIcon = 'text' | 'device' | 'price' | 'layout';
export interface FactItem {
  icon: FactIcon;
  title: string;
  text: string;
}

export const factStripItems = (price: number | string, templateCount: number): FactItem[] => [
  { icon: 'text', title: 'Real text, not an image', text: "Your PDF's text is selectable and searchable" },
  { icon: 'device', title: 'Stays on your device', text: 'No account, no upload' },
  { icon: 'price', title: `₹${price} once`, text: 'No subscription' },
  { icon: 'layout', title: `${templateCount} templates`, text: 'Single- and two-column layouts' },
];

// ---- Before / after ----
export const BEFORE_AFTER = {
  eyebrow: 'Before and after',
  title: 'Same experience. Very different result.',
  lead: 'Both resumes hold the same details. What changes is how cleanly software can read them.',
  tabsLabel: 'Compare resumes',
  beforeTab: 'Before',
  afterTab: 'After',
  beforeLabel: 'A typical messy resume',
  afterLabel: 'The same content in Works Lab',
  badge: 'Illustrative',
  arrowLabel: 'becomes',
  caption: 'Both are examples built from the same sample data.',
  beforeNotes: [
    'Tables and columns can scramble reading order',
    "Logos and graphics can't be read as text",
    'Inconsistent dates are hard to parse',
  ],
  afterNotes: ['Standard section headings', 'Consistent dates', 'Real text in reading order'],
} as const;

// ---- ATS extraction demo ----
export const ATS_DEMO = {
  eyebrow: 'Under the hood',
  title: 'What the bot actually reads.',
  lead:
    'Your Works Lab PDF is real text, not a picture of a resume. This is the kind of plain text an applicant tracking system pulls out of it.',
  toggleLabel: 'Resume view',
  resumeTab: 'Your resume',
  textTab: 'What an ATS extracts',
  textRegionLabel: 'Extracted plain text from the sample resume',
  note: 'Illustration built from the sample resume. Your own PDF contains your text in the same way.',
  cta: (price: number | string): string => `Build my resume — ₹${price}`,
} as const;
