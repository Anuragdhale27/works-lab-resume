export function SkipLink({ fontClass }: { fontClass?: string } = {}) {
  return (
    <a href="#main" className={`skip-link${fontClass ? ` ${fontClass}` : ''}`}>
      Skip to content
    </a>
  );
}
