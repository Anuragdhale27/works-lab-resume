import type { ReactNode } from 'react';
import { goToPayment } from '../../../lib/config';

interface CtaButtonProps {
  variant?: 'primary' | 'ghost' | 'ghost-night' | 'light';
  children: ReactNode;
  dataCta?: string;
}

export function CtaButton({ variant = 'primary', children, dataCta }: CtaButtonProps) {
  return (
    <button
      type="button"
      className={`lp-btn lp-btn--${variant}`}
      data-cta={dataCta}
      onClick={() => goToPayment('modern')}
    >
      {children}
    </button>
  );
}
