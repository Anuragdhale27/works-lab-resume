import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { setThemePref } from './themeStore';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  setThemePref('system'); // resets the in-memory fallback between tests
  localStorage.clear();
});

describe('ThemeToggle compact', () => {
  it('cycles System, Light, Dark, System and persists', () => {
    render(<ThemeToggle variant="compact" />);
    const btn = () => screen.getByRole('button');
    expect(btn().getAttribute('aria-label')).toBe('Theme: System (follows your device). Switch to Light');
    expect(btn().getAttribute('title')).toBe(btn().getAttribute('aria-label'));

    fireEvent.click(btn());
    expect(localStorage.getItem('workslab_theme')).toBe('light');
    expect(btn().getAttribute('aria-label')).toBe('Theme: Light. Switch to Dark');

    fireEvent.click(btn());
    expect(localStorage.getItem('workslab_theme')).toBe('dark');
    expect(btn().getAttribute('aria-label')).toBe('Theme: Dark. Switch to System (follows your device)');

    fireEvent.click(btn());
    expect(localStorage.getItem('workslab_theme')).toBeNull();
    expect(btn().getAttribute('aria-label')).toBe('Theme: System (follows your device). Switch to Light');
  });

  it('starts from a stored preference', () => {
    localStorage.setItem('workslab_theme', 'dark');
    render(<ThemeToggle variant="compact" />);
    expect(screen.getByRole('button').getAttribute('aria-label')).toContain('Theme: Dark');
  });

  it('still works in memory when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied');
    });
    render(<ThemeToggle variant="compact" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').getAttribute('aria-label')).toContain('Theme: Light');
  });
});

describe('ThemeToggle segmented', () => {
  it('is a labelled radiogroup with three options', () => {
    render(<ThemeToggle variant="segmented" />);
    expect(screen.getByRole('radiogroup', { name: 'Theme' })).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios.map((r) => r.textContent)).toEqual(['System', 'Light', 'Dark']);
    expect(radios.map((r) => r.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false']);
  });

  it('sets the preference on click and persists', () => {
    render(<ThemeToggle variant="segmented" />);
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(localStorage.getItem('workslab_theme')).toBe('dark');
    expect(screen.getByRole('radio', { name: 'Dark' }).getAttribute('aria-checked')).toBe('true');
    expect(screen.getByRole('radio', { name: 'System' }).getAttribute('aria-checked')).toBe('false');
    fireEvent.click(screen.getByRole('radio', { name: 'System' }));
    expect(localStorage.getItem('workslab_theme')).toBeNull();
  });

  it('supports arrow keys, Home and End with roving tabindex', () => {
    render(<ThemeToggle variant="segmented" />);
    const sys = screen.getByRole('radio', { name: 'System' });
    sys.focus();
    fireEvent.keyDown(sys, { key: 'ArrowRight' });
    const light = screen.getByRole('radio', { name: 'Light' });
    expect(light.getAttribute('aria-checked')).toBe('true');
    expect(document.activeElement).toBe(light);
    expect(light.tabIndex).toBe(0);
    expect(sys.tabIndex).toBe(-1);
    fireEvent.keyDown(light, { key: 'ArrowLeft' });
    expect(sys.getAttribute('aria-checked')).toBe('true');
    fireEvent.keyDown(sys, { key: 'ArrowLeft' });
    expect(screen.getByRole('radio', { name: 'Dark' }).getAttribute('aria-checked')).toBe('true');
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Dark' }), { key: 'Home' });
    expect(sys.getAttribute('aria-checked')).toBe('true');
    fireEvent.keyDown(sys, { key: 'End' });
    expect(screen.getByRole('radio', { name: 'Dark' }).getAttribute('aria-checked')).toBe('true');
  });
});
