import { useLang } from '../i18n/LangContext';

export function SkipLink({ fontClass }: { fontClass?: string } = {}) {
  const { messages: m } = useLang();
  return (
    <a href="#main" className={`skip-link${fontClass ? ` ${fontClass}` : ''}`}>
      {m.skipLink}
    </a>
  );
}
