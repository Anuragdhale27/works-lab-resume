import type { ReactNode } from 'react';
import { SkipLink } from './SkipLink';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function Layout({ children, variant }: { children: ReactNode; variant?: 'landing' }) {
  const fontClass = variant === 'landing' ? 'lp-font' : undefined;
  return (
    <>
      <SkipLink />
      <Nav fontClass={fontClass} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer fontClass={fontClass} />
    </>
  );
}
