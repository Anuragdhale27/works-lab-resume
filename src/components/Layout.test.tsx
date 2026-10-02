import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from './Layout';

function renderLayout(variant?: 'landing' | 'site') {
  return render(
    <MemoryRouter>
      <Layout variant={variant}>
        <p>content</p>
      </Layout>
    </MemoryRouter>,
  );
}

describe('Layout variants', () => {
  it('site uses Poppins class everywhere but has no language or theme controls', () => {
    const { container } = renderLayout('site');
    expect(container.querySelector('nav')).toHaveClass('lp-font');
    expect(container.querySelector('footer')).toHaveClass('lp-font');
    expect(container.querySelector('main')).toHaveClass('lp-font');
    expect(container.querySelector('.skip-link')).toHaveClass('lp-font');
    expect(screen.queryByRole('button', { name: /language|theme/i })).toBeNull();
    expect(container.querySelector('[aria-label*="anguage" i], [aria-label*="heme" i]')).toBeNull();
  });

  it('default variant has no lp-font', () => {
    const { container } = renderLayout();
    expect(container.querySelector('main')).not.toHaveClass('lp-font');
    expect(container.querySelector('nav')).not.toHaveClass('lp-font');
  });
});
