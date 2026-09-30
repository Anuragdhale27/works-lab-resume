import type { ResumeData } from '../../../types/resume';
import { useParsedText } from '../useParsedText';

interface ParsedTextProps {
  data: ResumeData;
  label: string;
}

/** Monospace plain-text view of a resume, in reading order. Focusable so
 * keyboard users can scroll it when the text is taller than the card. */
export function ParsedText({ data, label }: ParsedTextProps) {
  const text = useParsedText(data);
  return (
    <pre className="lp-parsed" tabIndex={0} aria-label={label}>
      {text}
    </pre>
  );
}
