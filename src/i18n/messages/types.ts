import type { TemplateKey } from '../../types/resume';

/** A fixed-length array type, so a translation with a missing or extra list
 * item is a compile error rather than a silent gap. */
type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N ? R : Tuple<T, N, [...R, T]>;

export interface Tile {
  title: string;
  text: string;
}

/** Accent preset names (see src/lib/accentPresets.ts), as shown in aria-labels. */
export type ColorName =
  | 'Default' | 'Navy' | 'Teal' | 'Emerald' | 'Maroon' | 'Plum' | 'Slate' | 'Charcoal';

/**
 * Every visible or accessible string on the landing page, per language.
 * Placeholders: {price} {listPrice} {save} {count} plus the named ones used in
 * the English source ({year}, {name}, {best}, {template}, {accent}, {current},
 * {next}). A translation must use exactly the placeholders English uses.
 */
export interface Messages {
  skipLink: string;
  nav: {
    templates: string;
    howItWorks: string;
    pricing: string;
    faq: string;
    /** Desktop CTA, e.g. "Build resume – ₹{price}". */
    build: string;
    /** Short mobile top-bar CTA, e.g. "Build ₹{price}". */
    buildShort: string;
    menu: string;
  };
  language: {
    label: string;
    /** Trigger button accessible name; {name} is the current language's native name. */
    triggerLabel: string;
  };
  theme: {
    label: string;
    system: string;
    light: string;
    dark: string;
    systemLong: string;
    /** {current} and {next} are the long labels above. */
    toggle: string;
  };
  footer: {
    tagline: string;
    templates: string;
    faq: string;
    contact: string;
    privacy: string;
    terms: string;
    refund: string;
    madeIn: string;
    /** {year} is the current year. */
    copyright: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    caption: string;
    ctaPrimary: string;
    ctaSecondary: string;
    chips: Tuple<string, 4>;
    studio: {
      /** Screen-reader status: {template} is the template name, {accent} a colours.* value. */
      status: string;
      tabsLabel: string;
      accentsLabel: string;
    };
  };
  colors: Record<ColorName, string>;
  facts: Tuple<Tile, 4>;
  beforeAfter: {
    eyebrow: string;
    title: string;
    lead: string;
    tabsLabel: string;
    beforeTab: string;
    afterTab: string;
    beforeLabel: string;
    afterLabel: string;
    badge: string;
    caption: string;
    beforeNotes: Tuple<string, 3>;
    afterNotes: Tuple<string, 3>;
  };
  atsDemo: {
    eyebrow: string;
    title: string;
    lead: string;
    toggleLabel: string;
    resumeTab: string;
    textTab: string;
    textRegionLabel: string;
    note: string;
    cta: string;
  };
  how: {
    eyebrow: string;
    title: string;
    steps: Tuple<Tile, 3>;
    cta: string;
  };
  templates: {
    eyebrow: string;
    title: string;
    lead: string;
    carouselLabel: string;
    preview: string;
    /** {name} is the template name. */
    previewAria: string;
    getThis: string;
    atsFriendly: string;
    /** {best} is one of the best.* values. */
    bestFor: string;
    best: Record<TemplateKey, string>;
  };
  features: {
    eyebrow: string;
    title: string;
    large: Tuple<Tile, 2>;
    small: Tuple<Tile, 6>;
    mock: { page: string; pageBreak: string; pageTwo: string };
  };
  privacyPrice: {
    eyebrow: string;
    title: string;
    privacy: { title: string; points: Tuple<string, 3> };
    price: { title: string; points: Tuple<string, 3> };
    refund: string;
    note: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    label: string;
    launchOffer: string;
    period: string;
    /** {save} is the plain difference between the two prices. */
    save: string;
    /** Screen-reader text for the struck-through price. */
    srPrice: string;
    note: string;
    items: Tuple<string, 6>;
    cta: string;
    refund: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Tuple<{ q: string; a: string }, 9>;
  };
  finalCta: {
    title: string;
    cta: string;
    trust: Tuple<string, 3>;
  };
}
