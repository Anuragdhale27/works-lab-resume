import type { ReactNode } from 'react';
import { SkipLink } from './SkipLink';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function Layout({ children, variant }: { children: ReactNode; variant?: 'landing' | 'site' }) {
  const fontClass = variant ? 'lp-font' : undefined;
  return (
    <>
      <SkipLink fontClass={fontClass} />
      <Nav fontClass={fontClass} showThemeToggle={variant === 'landing'} showLanguage={variant === 'landing'} />
      <main id="main" tabIndex={-1} className={variant === 'site' ? 'lp-font lp-site' : fontClass}>
        {children}
      </main>
      <Footer fontClass={fontClass} />
    </>
  );
}
