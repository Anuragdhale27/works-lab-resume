import { describe, it, expect, beforeEach, vi } from 'vitest';
import { THEME_NO_FLASH_SCRIPT, THEME_NO_FLASH_STYLE } from './noFlashScript';

const run = () => new Function(THEME_NO_FLASH_SCRIPT)();
const mm = (dark: boolean) => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: dark }) as unknown as typeof window.matchMedia;
};

beforeEach(() => {
  delete document.documentElement.dataset.lpTheme;
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

describe('theme no-flash inline script', () => {
  it('uses the system setting', () => {
    mm(true);
    run();
    expect(document.documentElement.dataset.lpTheme).toBe('dark');
    mm(false);
    run();
    expect(document.documentElement.dataset.lpTheme).toBe('light');
  });

  it('stored value wins, invalid is ignored', () => {
    mm(true);
    localStorage.setItem('workslab_theme', 'light');
    run();
    expect(document.documentElement.dataset.lpTheme).toBe('light');
    localStorage.setItem('workslab_theme', 'bogus');
    run();
    expect(document.documentElement.dataset.lpTheme).toBe('dark');
  });

  it('does nothing off the homepage and never throws', () => {
    mm(true);
    window.history.pushState({}, '', '/builder');
    run();
    expect(document.documentElement.dataset.lpTheme).toBeUndefined();
    window.history.pushState({}, '', '/');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(run).not.toThrow();
    expect(document.documentElement.dataset.lpTheme).toBe('dark');
  });

  it('has no network calls and a matching dark background style', () => {
    expect(THEME_NO_FLASH_SCRIPT).not.toMatch(/fetch|XMLHttpRequest|src=|import\(/);
    expect(THEME_NO_FLASH_STYLE).toContain('#0E1319');
  });
});
