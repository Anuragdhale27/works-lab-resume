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

// ---- Launch price (the only place "offer"/"save" copy may live) ----
// LIST_PRICE is the regular price; CONFIG.PRODUCT_PRICE is the current launch
// price. No end date, countdown or percentage: just the arithmetic.
export const LIST_PRICE = 300;

export const OFFER = {
  label: 'Launch offer',
  original: (): string => `₹${LIST_PRICE}`,
  current: (price: number | string): string => `₹${price}`,
  savings: (price: number | string): string => `You save ₹${LIST_PRICE - Number(price)}`,
  srPrice: (price: number | string): string => `Original price ₹${LIST_PRICE}, now ₹${price}`,
  chip: (price: number | string): string => `₹${price} launch offer`,
};

export const heroSub = (price: number | string): string =>
  `An ATS-friendly resume builder for Indian job seekers. ₹${price} once. No subscription.`;

export const heroPrimaryCta = (price: number | string): string => `Build my resume — ₹${price}`;

export const heroFactChips = (price: number | string, templateCount: number): string[] => [
  'Real-text PDF',
  'Data stays in your browser',
  OFFER.chip(price),
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

// ---- How it works ----
export type HowIcon = 'pick' | 'form' | 'pdf';
export const HOW = {
  eyebrow: 'How it works',
  title: 'Three steps to a resume you can send today',
  steps: [
    { icon: 'pick', title: 'Pick a template', text: 'Choose from six single- and two-column layouts. You can switch any time and your details carry over.' },
    { icon: 'form', title: 'Fill in the guided form', text: 'Work through it step by step while a live A4 preview updates beside you.' },
    { icon: 'pdf', title: 'Download your PDF', text: 'A real PDF with selectable text. Word (.docx) and JSON export are there too.' },
  ] as { icon: HowIcon; title: string; text: string }[],
  cta: (price: number | string): string => `Build my resume — ₹${price}`,
};

// ---- Templates ----
export const TEMPLATES_SECTION = {
  eyebrow: 'Templates',
  title: (n: number): string => `${n} templates. Pick the one that fits.`,
  lead:
    'Single-column layouts read cleanly in applicant tracking systems. The two-column ones keep your main content first.',
};

// ---- Features (dark bento) ----
export type FeatureIcon =
  | 'preview' | 'export' | 'undo' | 'accent' | 'sections' | 'phone' | 'steps' | 'save';
export interface FeatureTile {
  icon: FeatureIcon;
  title: string;
  text: string;
}
export const FEATURES = {
  eyebrow: "What's in the builder",
  title: 'Everything you need to finish the resume',
  large: [
    {
      icon: 'preview',
      title: 'Live A4 preview',
      text: 'See a true-size A4 page update as you type, with a line wherever a page will break.',
    },
    {
      icon: 'export',
      title: 'Export: PDF, Word, JSON',
      text: "Save a real-text PDF from your browser's print dialog, download a Word (.docx) file, or keep a JSON backup.",
    },
  ] as FeatureTile[],
  small: [
    { icon: 'undo', title: 'Undo & redo', text: 'Step back or forward through your edits.' },
    { icon: 'accent', title: 'Accent colours', text: 'Pick an accent colour and it carries through the template.' },
    { icon: 'sections', title: 'Custom sections and section order', text: 'Add your own sections and change the order they appear in.' },
    { icon: 'phone', title: 'Works on your phone', text: 'Switch between Edit and Preview on a small screen.' },
    { icon: 'steps', title: 'Step-by-step form with progress', text: 'A progress bar shows which sections still need details.' },
    { icon: 'save', title: 'Autosaves on your device', text: 'Changes are saved in your browser as you type.' },
  ] as FeatureTile[],
  mock: { page: 'Page 1', pageBreak: 'Page break', pageTwo: 'Page 2' },
};

// ---- Privacy + price ("How it's built") ----
export const PRIVACY_PRICE = {
  eyebrow: "How it's built",
  title: 'How Works Lab is built',
  privacy: {
    title: 'Private by design',
    points: [
      'No account to create.',
      'No backend: your details are saved in your browser, on your device.',
      'The site is static, hosted on GitHub Pages.',
    ],
  },
  price: {
    title: 'One payment, no subscription',
    points: (price: number | string): string[] => [
      `₹${price}, paid once.`,
      'Lifetime access to the builder and all six templates.',
      'No recurring charges.',
    ],
  },
  refund: 'Refund policy',
  refundHref: '/refund',
  note:
    'Because data lives in your browser, clearing site data removes it. Export a JSON backup from the builder any time.',
};

// ---- Pricing ----
export const PRICING = {
  eyebrow: 'Pricing',
  title: 'One price. Everything included.',
  label: 'Works Lab access',
  period: 'one-time',
  note: 'No subscription.',
  items: (templateCount: number): string[] => [
    `All ${templateCount} templates`,
    'Live A4 preview',
    'PDF export with real, selectable text',
    'Word (.docx) and JSON export',
    'Undo/redo and accent colours',
    'Lifetime access to the builder and all six templates',
  ],
  cta: (price: number | string): string => `Build my resume — ₹${price}`,
  refund: 'Refund policy',
  refundHref: '/refund',
};

// ---- FAQ wrapper ----
export const FAQ_SECTION = {
  eyebrow: 'FAQ',
  title: 'Questions, answered',
  lead: 'The short answers about price, privacy and the PDF.',
};

// ---- Final CTA ----
export const FINAL_CTA = {
  title: 'Your next application deserves a cleaner resume.',
  offerLabel: `${OFFER.label}:`,
  cta: (price: number | string): string => `Build my resume — ₹${price}`,
  trust: (price: number | string): string[] => [
    `One-time ₹${price}`,
    'No subscription',
    'Data stays on your device',
  ],
};
