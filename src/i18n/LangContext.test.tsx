import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { LangProvider, useLang, useT } from './LangContext';
import { hi } from './messages/hi';
import { en } from './messages/en';

function Probe() {
  const { lang, messages, setLang } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="skip">{messages.skipLink}</span>
      <button onClick={() => void setLang('hi')}>go-hi</button>
      <button onClick={() => void setLang('en')}>go-en</button>
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = 'en';
});
afterEach(() => {
  window.localStorage.clear();
});

describe('LangProvider', () => {
  it('defaults to English', () => {
    render(<LangProvider><Probe /></LangProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('skip').textContent).toBe(en.skipLink);
    expect(document.documentElement.lang).toBe('en');
  });

  it('uses the stored language', async () => {
    window.localStorage.setItem('workslab_lang', 'hi');
    render(<LangProvider><Probe /></LangProvider>);
    await waitFor(() => expect(screen.getByTestId('lang').textContent).toBe('hi'));
    expect(screen.getByTestId('skip').textContent).toBe(hi.skipLink);
    expect(document.documentElement.lang).toBe('hi');
    expect(document.documentElement.dataset.lpLang).toBe('hi');
  });

  it('ignores an invalid stored value', async () => {
    window.localStorage.setItem('workslab_lang', 'xx');
    render(<LangProvider><Probe /></LangProvider>);
    await act(async () => {});
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('keeps the previous language until the new one has loaded, then persists it', async () => {
    render(<LangProvider><Probe /></LangProvider>);
    act(() => screen.getByText('go-hi').click());
    // Not switched synchronously.
    expect(screen.getByTestId('lang').textContent).toBe('en');
    await waitFor(() => expect(screen.getByTestId('lang').textContent).toBe('hi'));
    expect(window.localStorage.getItem('workslab_lang')).toBe('hi');
    act(() => screen.getByText('go-en').click());
    await waitFor(() => expect(screen.getByTestId('lang').textContent).toBe('en'));
    expect(window.localStorage.getItem('workslab_lang')).toBeNull();
    expect(document.documentElement.lang).toBe('en');
  });

  it('restores the html lang attributes on unmount', async () => {
    const { unmount } = render(<LangProvider><Probe /></LangProvider>);
    act(() => screen.getByText('go-hi').click());
    await waitFor(() => expect(document.documentElement.lang).toBe('hi'));
    unmount();
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dataset.lpLang).toBeUndefined();
  });

  it('works when localStorage throws', async () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    render(<LangProvider><Probe /></LangProvider>);
    await act(async () => {});
    expect(screen.getByTestId('lang').textContent).toBe('en');
    spy.mockRestore();
  });
});

describe('outside a provider', () => {
  it('useLang and useT return English', () => {
    const { result } = renderHook(() => ({ lang: useLang(), t: useT() }));
    expect(result.current.lang.lang).toBe('en');
    expect(result.current.lang.messages).toBe(en);
    expect(result.current.t('nav.build', { price: 149 })).toBe('Build resume – ₹149');
  });
});
