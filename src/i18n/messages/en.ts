// English: the source of truth. Copy rules: only true, verifiable product
// facts. No user counts, ratings, testimonials, logos, awards, superlatives
// or urgency (the English audit in landingContent.test.ts enforces this).
import type { Messages } from './types';

export const en: Messages = {
  skipLink: 'Skip to content',
  nav: {
    templates: 'Templates',
    howItWorks: 'How it works',
    pricing: 'Pricing',
    faq: 'FAQ',
    build: 'Build resume – ₹{price}',
    buildShort: 'Build ₹{price}',
    menu: 'Menu',
  },
  language: {
    label: 'Language',
    triggerLabel: 'Language: {name}',
  },
  theme: {
    label: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    systemLong: 'System (follows your device)',
    toggle: 'Theme: {current}. Switch to {next}',
  },
  footer: {
    tagline: 'Digital products built to be useful.',
    templates: 'Templates',
    faq: 'FAQ',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    refund: 'Refund Policy',
    madeIn: 'Made in India',
    copyright: '© {year} Works Lab. All rights reserved.',
  },
  hero: {
    eyebrow: 'Built for the Indian job market',
    title: "A resume that gets past the bots and into a human's hands.",
    sub: 'An ATS-friendly resume builder for Indian job seekers. ₹{price} once. No subscription.',
    caption: 'Try it: pick a template and colour. Nothing is uploaded.',
    ctaPrimary: 'Build my resume — ₹{price}',
    ctaSecondary: 'See templates',
    chips: ['Real-text PDF', 'Data stays in your browser', '₹{price} launch offer', '{count} templates'],
    studio: {
      status: 'Preview of the {template} template in {accent}',
      tabsLabel: 'Resume template',
      accentsLabel: 'Accent colour',
    },
  },
  colors: {
    Default: 'Default',
    Navy: 'Navy',
    Teal: 'Teal',
    Emerald: 'Emerald',
    Maroon: 'Maroon',
    Plum: 'Plum',
    Slate: 'Slate',
    Charcoal: 'Charcoal',
  },
  facts: [
    { title: 'Real text, not an image', text: "Your PDF's text is selectable and searchable" },
    { title: 'Stays on your device', text: 'No account, no upload' },
    { title: '₹{price} once', text: 'No subscription' },
    { title: '{count} templates', text: 'Single- and two-column layouts' },
  ],
  beforeAfter: {
    eyebrow: 'Before and after',
    title: 'Same experience. Very different result.',
    lead: 'Both resumes hold the same details. What changes is how cleanly software can read them.',
    tabsLabel: 'Compare resumes',
    beforeTab: 'Before',
    afterTab: 'After',
    beforeLabel: 'A typical messy resume',
    afterLabel: 'The same content in Works Lab',
    badge: 'Illustrative',
    caption: 'Both are examples built from the same sample data.',
    beforeNotes: [
      'Tables and columns can scramble reading order',
      "Logos and graphics can't be read as text",
      'Inconsistent dates are hard to parse',
    ],
    afterNotes: ['Standard section headings', 'Consistent dates', 'Real text in reading order'],
  },
  atsDemo: {
    eyebrow: 'Under the hood',
    title: 'What the bot actually reads.',
    lead:
      'Your Works Lab PDF is real text, not a picture of a resume. This is the kind of plain text an applicant tracking system pulls out of it.',
    toggleLabel: 'Resume view',
    resumeTab: 'Your resume',
    textTab: 'What an ATS extracts',
    textRegionLabel: 'Extracted plain text from the sample resume',
    note: 'Illustration built from the sample resume. Your own PDF contains your text in the same way.',
    cta: 'Build my resume — ₹{price}',
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps to a resume you can send today',
    steps: [
      { title: 'Pick a template', text: 'Choose from six single- and two-column layouts. You can switch any time and your details carry over.' },
      { title: 'Fill in the guided form', text: 'Work through it step by step while a live A4 preview updates beside you.' },
      { title: 'Download your PDF', text: 'A real PDF with selectable text. Word (.docx) and JSON export are there too.' },
    ],
    cta: 'Build my resume — ₹{price}',
  },
  templates: {
    eyebrow: 'Templates',
    title: '{count} templates. Pick the one that fits.',
    lead:
      'Single-column layouts read cleanly in applicant tracking systems. The two-column ones keep your main content first.',
    carouselLabel: 'Resume templates, scroll sideways to see all',
    preview: 'Preview',
    previewAria: 'Preview {name}',
    getThis: 'Get this',
    atsFriendly: 'ATS Friendly',
    bestFor: 'Best for: {best}',
    best: {
      modern: 'Software / IT / Tech',
      classic: 'Corporate / Finance / Operations',
      minimal: 'Freshers / Students',
      executive: 'Experienced Professionals',
      sidebar: 'Tech / Product / Design',
      split: 'Business / Marketing / Sales',
    },
  },
  features: {
    eyebrow: "What's in the builder",
    title: 'Everything you need to finish the resume',
    large: [
      {
        title: 'Live A4 preview',
        text: 'See a true-size A4 page update as you type, with a line wherever a page will break.',
      },
      {
        title: 'Export: PDF, Word, JSON',
        text: "Save a real-text PDF from your browser's print dialog, download a Word (.docx) file, or keep a JSON backup.",
      },
    ],
    small: [
      { title: 'Undo & redo', text: 'Step back or forward through your edits.' },
      { title: 'Accent colours', text: 'Pick an accent colour and it carries through the template.' },
      { title: 'Custom sections and section order', text: 'Add your own sections and change the order they appear in.' },
      { title: 'Works on your phone', text: 'Switch between Edit and Preview on a small screen.' },
      { title: 'Step-by-step form with progress', text: 'A progress bar shows which sections still need details.' },
      { title: 'Autosaves on your device', text: 'Changes are saved in your browser as you type.' },
    ],
    mock: { page: 'Page 1', pageBreak: 'Page break', pageTwo: 'Page 2' },
  },
  privacyPrice: {
    eyebrow: "How it's built",
    title: 'How Works Lab is built',
    privacy: {
      title: 'Private by design',
      points: [
        'No account to create.',
        'No backend: your details are saved in your browser, on your device.',
      ],
    },
    price: {
      title: 'One payment, no subscription',
      points: [
        '₹{price}, paid once.',
        'Lifetime access to the builder and all six templates.',
        'No recurring charges.',
      ],
    },
    refund: 'Refund policy',
    note:
      'Because data lives in your browser, clearing site data removes it. Export a JSON backup from the builder any time.',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'One price. Everything included.',
    label: 'Works Lab access',
    launchOffer: 'Launch offer',
    period: 'one-time',
    save: 'You save ₹{save}',
    srPrice: 'Original price ₹{listPrice}, now ₹{price}',
    note: 'No subscription.',
    items: [
      'All {count} templates',
      'Live A4 preview',
      'PDF export with real, selectable text',
      'Word (.docx) and JSON export',
      'Undo/redo and accent colours',
      'Lifetime access to the builder and all six templates',
    ],
    cta: 'Build my resume — ₹{price}',
    refund: 'Refund policy',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    lead: 'The short answers about price, privacy and the PDF.',
    items: [
      {
        q: 'What does ₹{price} include?',
        a: 'One-time access to all 6 resume templates and the resume builder. Fill in your details, preview in real time, and export your resume as a PDF whenever you like. No recurring charges.',
      },
      {
        q: 'Can I use different templates?',
        a: 'Yes. The builder has a template switcher right above the live preview — pick from Modern, Classic, Minimal, Executive, Sidebar or Split at any point and your entered details carry over automatically.',
      },
      {
        q: 'Is the resume ATS-friendly?',
        a: 'All six templates are built with clean, structured markup — no tables, text boxes or graphics that trip up applicant tracking systems. Standard section headings and readable fonts are used throughout.',
      },
      {
        q: 'Can I edit my information later?',
        a: "Yes. Your data is saved automatically to your browser's local storage as you type. As long as you return on the same device and browser, it will be there — update and re-download as many times as you need.",
      },
      {
        q: 'Is my data private?',
        a: 'Works Lab has no backend and no account. Everything you type — including your photo, if you add one — is stored only in your own browser. Nothing is ever uploaded to a server, so we never see your resume.',
      },
      {
        q: 'Do I need Microsoft Word or design software?',
        a: 'No. Works Lab runs entirely in your browser. Fill in the guided form, watch the true-to-size A4 preview update live, and export straight from there — no installs.',
      },
      {
        q: 'How do I get the PDF?',
        a: 'Click "Download PDF" and choose "Save as PDF" as the destination in your browser’s print dialog. That produces a real, selectable-text A4 PDF — not a flattened image — ready to send to recruiters or upload to job portals.',
      },
      {
        q: 'Is there a subscription?',
        a: 'No. ₹{price} is a one-time payment for lifetime access to the builder and all six templates. There are no renewals or monthly charges.',
      },
      {
        q: 'Can I use this resume for multiple applications?',
        a: 'Absolutely. Download it once and reuse it for as many applications as you like. You can also come back, update your details and export a fresh PDF any time.',
      },
    ],
  },
  finalCta: {
    title: 'Your next application deserves a cleaner resume.',
    cta: 'Build my resume — ₹{price}',
    trust: ['One-time ₹{price}', 'No subscription', 'Data stays on your device'],
  },
};
