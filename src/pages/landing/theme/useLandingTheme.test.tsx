import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { useLandingTheme } from './useLandingTheme';
import { setThemePref } from './themeStore';

type Listener = (e: { matches: boolean }) => void;
let listeners: Listener[];
let systemDark: boolean;

function mockMatchMedia() {
  listeners = [];
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return query.includes('dark') ? systemDark : false;
    },
    media: query,
    addEventListener: (_: string, l: Listener) => listeners.push(l),
    removeEventListener: (_: string, l: Listener) => {
      listeners = listeners.filter((x) => x !== l);
    },
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

function Probe() {
  useLandingTheme();
  return null;
}

const root = () => document.documentElement.dataset;

beforeEach(() => {
  systemDark = false;
  localStorage.clear();
  mockMatchMedia();
});
afterEach(() => {
  vi.restoreAllMocks();
  setThemePref('system');
});

describe('useLandingTheme', () => {
  it('follows a dark system setting', () => {
    systemDark = true;
    render(<Probe />);
    expect(root().lpTheme).toBe('dark');
    expect(root().lpThemePref).toBe('system');
  });

  it('follows a light system setting', () => {
    render(<Probe />);
    expect(root().lpTheme).toBe('light');
    expect(root().lpThemePref).toBe('system');
  });

  it('a stored choice overrides the system', () => {
    systemDark = true;
    localStorage.setItem('workslab_theme', 'light');
    const { unmount } = render(<Probe />);
    expect(root().lpTheme).toBe('light');
    expect(root().lpThemePref).toBe('light');
    unmount();
    systemDark = false;
    localStorage.setItem('workslab_theme', 'dark');
    render(<Probe />);
    expect(root().lpTheme).toBe('dark');
    expect(root().lpThemePref).toBe('dark');
  });

  it('ignores an invalid stored value', () => {
    systemDark = true;
    localStorage.setItem('workslab_theme', 'purple');
    render(<Probe />);
    expect(root().lpTheme).toBe('dark');
    expect(root().lpThemePref).toBe('system');
  });

  it('updates live when the system setting changes', () => {
    render(<Probe />);
    expect(root().lpTheme).toBe('light');
    act(() => {
      systemDark = true;
      listeners.forEach((l) => l({ matches: true }));
    });
    expect(root().lpTheme).toBe('dark');
  });

  it('does not follow the system when a choice is stored', () => {
    localStorage.setItem('workslab_theme', 'light');
    render(<Probe />);
    act(() => {
      systemDark = true;
      listeners.forEach((l) => l({ matches: true }));
    });
    expect(root().lpTheme).toBe('light');
  });

  it('removes both attributes and its listener on unmount', () => {
    const { unmount } = render(<Probe />);
    expect(listeners.length).toBe(1);
    unmount();
    expect(root().lpTheme).toBeUndefined();
    expect(root().lpThemePref).toBeUndefined();
    expect(listeners.length).toBe(0);
  });

  it('does not crash when localStorage throws', () => {
    systemDark = true;
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(() => render(<Probe />)).not.toThrow();
    expect(root().lpTheme).toBe('dark');
    expect(root().lpThemePref).toBe('system');
  });
});
