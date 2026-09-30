import type { LangCode } from '../languages';
import type { Messages } from './types';
import { en } from './en';

export type { Messages } from './types';
export { en } from './en';

type Loader = () => Promise<Messages>;

/**
 * One line per non-English language. Each import() becomes its own lazy
 * chunk; English is bundled statically. Record<Exclude<LangCode,'en'>, ...>
 * makes a language listed in languages.ts but missing here a compile error.
 */
export const LOADERS: Record<Exclude<LangCode, 'en'>, Loader> = {
  hi: () => import('./hi').then((m) => m.hi),
  mr: () => import('./mr').then((m) => m.mr),
  bn: () => import('./bn').then((m) => m.bn),
  ta: () => import('./ta').then((m) => m.ta),
  te: () => import('./te').then((m) => m.te),
};

export function loadMessages(code: LangCode): Promise<Messages> {
  if (code === 'en') return Promise.resolve(en);
  return LOADERS[code]();
}
