import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroStudio } from './HeroStudio';
import { ScaledResume } from './ScaledResume';
import { TEMPLATES } from '../../../templates';
import { sampleResumeData } from '../../../lib/sampleData';

const root = (c: HTMLElement) => c.querySelector('.lp-scaled-inner > div') as HTMLElement;

describe('HeroStudio', () => {
  it('renders six template tabs, first selected', () => {
    render(<HeroStudio />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(6);
    expect(tabs.filter((t) => t.getAttribute('aria-selected') === 'true')).toHaveLength(1);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  it('switches template on click', () => {
    const { container } = render(<HeroStudio />);
    expect(root(container).className).toContain('resume-modern');
    fireEvent.click(screen.getByRole('tab', { name: 'Classic ATS' }));
    expect(root(container).className).toContain('resume-classic');
  });

  it('switches template with arrow keys and moves focus', () => {
    const { container } = render(<HeroStudio />);
    const first = screen.getAllByRole('tab')[0];
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(root(container).className).toContain('resume-classic');
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Classic ATS' }));
    fireEvent.keyDown(document.activeElement as Element, { key: 'End' });
    expect(screen.getAllByRole('tab')[5].getAttribute('aria-selected')).toBe('true');
    fireEvent.keyDown(document.activeElement as Element, { key: 'Home' });
    expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe('true');
  });

  it('has no accent by default and applies --r-accent when a swatch is chosen', () => {
    const { container } = render(<HeroStudio />);
    expect(root(container).style.getPropertyValue('--r-accent')).toBe('');
    fireEvent.click(screen.getByRole('radio', { name: 'Navy' }));
    expect(root(container).style.getPropertyValue('--r-accent')).toBe('#1e3a5f');
    fireEvent.click(screen.getByRole('radio', { name: 'Default' }));
    expect(root(container).style.getPropertyValue('--r-accent')).toBe('');
  });

  it('marks exactly one swatch as checked', () => {
    render(<HeroStudio />);
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBeGreaterThan(1);
    expect(radios.filter((r) => r.getAttribute('aria-checked') === 'true')).toHaveLength(1);
    fireEvent.click(screen.getByRole('radio', { name: 'Teal' }));
    expect(screen.getAllByRole('radio').filter((r) => r.getAttribute('aria-checked') === 'true')).toHaveLength(1);
  });
});

describe('ScaledResume', () => {
  it('renders its template content and is hidden from AT', () => {
    const { container } = render(<ScaledResume Component={TEMPLATES.modern.Component} data={sampleResumeData} />);
    expect(container.textContent).toContain('Rahul Sharma');
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
