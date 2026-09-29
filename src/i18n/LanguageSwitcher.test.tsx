import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LangProvider } from './LangContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LANGUAGES } from './languages';

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = 'en';
});

describe('LanguageSwitcher compact', () => {
  const setup = () =>
    render(
      <LangProvider>
        <LanguageSwitcher variant="compact" />
      </LangProvider>,
    );

  it('shows the current code and opens a menu of six native names', () => {
    setup();
    const trigger = screen.getByRole('button', { name: 'Language: English' });
    expect(trigger.textContent).toBe('EN');
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    fireEvent.click(trigger);
    const items = screen.getAllByRole('menuitem');
    expect(items.map((i) => i.textContent?.replace('✓', ''))).toEqual(LANGUAGES.map((l) => l.native));
    expect(items[0].getAttribute('aria-current')).toBe('true');
    expect(items.filter((i) => i.hasAttribute('aria-current'))).toHaveLength(1);
    expect(items.map((i) => i.getAttribute('lang'))).toEqual(LANGUAGES.map((l) => l.htmlLang));
  });

  it('supports arrow keys and Escape', () => {
    setup();
    const trigger = screen.getByRole('button', { name: 'Language: English' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    return waitFor(() => {
      const items = screen.getAllByRole('menuitem');
      expect(document.activeElement).toBe(items[0]);
    }).then(() => {
      const items = screen.getAllByRole('menuitem');
      fireEvent.keyDown(document, { key: 'ArrowDown' });
      expect(document.activeElement).toBe(items[1]);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('menu')).toBeNull();
      expect(document.activeElement).toBe(trigger);
    });
  });

  it('switches language, updates the label and persists', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Language: English' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'हिन्दी' }));
    const trigger = await screen.findByRole('button', { name: 'भाषा: हिन्दी' });
    expect(trigger.textContent).toBe('HI');
    expect(window.localStorage.getItem('workslab_lang')).toBe('hi');
    expect(document.documentElement.lang).toBe('hi');
  });
});

describe('LanguageSwitcher grid', () => {
  const setup = () =>
    render(
      <LangProvider>
        <LanguageSwitcher variant="grid" />
      </LangProvider>,
    );

  it('is a labelled radiogroup of six native-name options', () => {
    setup();
    const group = screen.getByRole('radiogroup', { name: 'Language' });
    expect(group).toBeTruthy();
    const radios = screen.getAllByRole('radio');
    expect(radios.map((r) => r.textContent)).toEqual(LANGUAGES.map((l) => l.native));
    expect(radios.map((r) => r.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false', 'false', 'false', 'false']);
    expect(radios.map((r) => r.getAttribute('tabindex'))).toEqual(['0', '-1', '-1', '-1', '-1', '-1']);
    expect(radios[3].getAttribute('lang')).toBe('bn');
  });

  it('changes language on click and with arrow keys, then persists', async () => {
    setup();
    fireEvent.click(screen.getByRole('radio', { name: 'हिन्दी' }));
    await waitFor(() => expect(screen.getByRole('radio', { name: 'हिन्दी' }).getAttribute('aria-checked')).toBe('true'));
    expect(screen.getByRole('radiogroup', { name: 'भाषा' })).toBeTruthy();
    expect(window.localStorage.getItem('workslab_lang')).toBe('hi');
    fireEvent.keyDown(screen.getByRole('radio', { name: 'हिन्दी' }), { key: 'ArrowLeft' });
    await waitFor(() => expect(screen.getByRole('radio', { name: 'English' }).getAttribute('aria-checked')).toBe('true'));
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'English' }));
    expect(window.localStorage.getItem('workslab_lang')).toBeNull();
  });
});
