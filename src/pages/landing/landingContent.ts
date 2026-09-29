// Non-text constants and helpers for the landing page. All copy lives in
// src/i18n/messages/<lang>.ts (English is the source of truth). Rule for that
// copy: only true, verifiable product facts. No user counts, ratings,
// testimonials, logos, awards or superlatives.

// LIST_PRICE is the regular price; CONFIG.PRODUCT_PRICE is the current launch
// price. No end date, countdown or percentage: just the arithmetic.
export const LIST_PRICE = 300;

/** Placeholder values shared by all landing strings. Prices stay in Western digits. */
export const priceVars = (price: number | string, count?: number) => ({
  price,
  listPrice: LIST_PRICE,
  save: LIST_PRICE - Number(price),
  ...(count === undefined ? {} : { count }),
});

export const HERO_SECONDARY_HREF = '#templates';
export const REFUND_HREF = '/refund';

export type FactIcon = 'text' | 'device' | 'price' | 'layout';
/** Icon per fact, in the same order as messages.facts. */
export const FACT_ICONS: readonly FactIcon[] = ['text', 'device', 'price', 'layout'];

export type HowIcon = 'pick' | 'form' | 'pdf';
/** Icon per step, in the same order as messages.how.steps. */
export const HOW_ICONS: readonly HowIcon[] = ['pick', 'form', 'pdf'];

export type FeatureIcon =
  | 'preview' | 'export' | 'undo' | 'accent' | 'sections' | 'phone' | 'steps' | 'save';
/** Icons in the same order as messages.features.large / .small. */
export const FEATURE_LARGE_ICONS: readonly FeatureIcon[] = ['preview', 'export'];
export const FEATURE_SMALL_ICONS: readonly FeatureIcon[] = ['undo', 'accent', 'sections', 'phone', 'steps', 'save'];
