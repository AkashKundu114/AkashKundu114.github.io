import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

describe('ThemeContext and useTheme Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns default context values when used outside of ThemeProvider', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('theme-1');
    expect(typeof result.current.changeTheme).toBe('function');

    expect(() => result.current.changeTheme('theme-2')).not.toThrow();
  });

  it('restores saved theme from localStorage on mount if present', () => {
    localStorage.setItem('portfolio_theme', 'theme-5');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('theme-5');
    expect(document.documentElement.getAttribute('data-theme')).toBe('theme-5');
  });

  it('initializes with a random theme between theme-1 and theme-5 when no saved theme exists', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.4);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('theme-3');
    expect(document.documentElement.getAttribute('data-theme')).toBe('theme-3');
    expect(localStorage.getItem('portfolio_theme')).toBe('theme-3');
  });

  it('changes theme dynamically, trims whitespace, and persists to localStorage and DOM', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.changeTheme('  theme-2  ');
    });

    expect(result.current.theme).toBe('theme-2');
    expect(document.documentElement.getAttribute('data-theme')).toBe('theme-2');
    expect(localStorage.getItem('portfolio_theme')).toBe('theme-2');
  });

  it('ignores invalid or empty theme inputs to preserve current theme', () => {
    localStorage.setItem('portfolio_theme', 'theme-1');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('theme-1');

    act(() => {
      result.current.changeTheme('');
      result.current.changeTheme(null as unknown as string);
      result.current.changeTheme(undefined as unknown as string);
    });

    expect(result.current.theme).toBe('theme-1');
    expect(document.documentElement.getAttribute('data-theme')).toBe('theme-1');
  });

  it('handles localStorage errors gracefully during theme persistence', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage disabled');
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    expect(() => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      act(() => {
        result.current.changeTheme('theme-4');
      });
    }).not.toThrow();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '[ThemeContext] Unable to persist theme to localStorage:',
      expect.any(Error)
    );
  });

  it('provides default isEcoMode and toggleEcoMode, and toggles eco mode on demand', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    const initialEco = result.current.isEcoMode;
    expect(typeof result.current.toggleEcoMode).toBe('function');

    act(() => {
      result.current.toggleEcoMode();
    });

    expect(result.current.isEcoMode).toBe(!initialEco);
    expect(document.documentElement.getAttribute('data-eco')).toBe(String(!initialEco));
    expect(localStorage.getItem('portfolio_eco_mode')).toBe(String(!initialEco));
  });

  it('restores saved eco mode setting from localStorage', () => {
    localStorage.setItem('portfolio_eco_mode', 'true');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.isEcoMode).toBe(true);
    expect(document.documentElement.getAttribute('data-eco')).toBe('true');
  });
});
