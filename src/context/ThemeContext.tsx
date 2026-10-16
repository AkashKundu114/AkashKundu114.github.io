import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemeName = 'theme-1' | 'theme-2' | 'theme-3' | 'theme-4' | 'theme-5' | string;

export interface ThemeContextValue {
  theme: ThemeName;
  changeTheme: (newTheme: ThemeName) => void;
  isEcoMode: boolean;
  toggleEcoMode: () => void;
}

export const THEME_STORAGE_KEY = 'portfolio_theme';
export const ECO_STORAGE_KEY = 'portfolio_eco_mode';
export const DEFAULT_THEME: ThemeName = 'theme-1';
export const AVAILABLE_THEMES: readonly ThemeName[] = [
  'theme-1',
  'theme-2',
  'theme-3',
  'theme-4',
  'theme-5',
];

export const THEME_METADATA: Record<string, { label: string; accentColor: string }> = {
  'theme-1': { label: 'Crimson', accentColor: '#fbf59c' },
  'theme-2': { label: 'Amethyst', accentColor: '#a8cf17' },
  'theme-3': { label: 'Magenta', accentColor: '#ff6206' },
  'theme-4': { label: 'Moss', accentColor: '#96a142' },
  'theme-5': { label: 'Cobalt', accentColor: '#ff5c6d' },
};

function getRandomTheme(): ThemeName {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_THEMES.length);
  return AVAILABLE_THEMES[randomIndex] ?? DEFAULT_THEME;
}

function getInitialTheme(): ThemeName {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && typeof savedTheme === 'string' && savedTheme.trim().length > 0) {
      return savedTheme.trim();
    }
  } catch (error) {
    console.warn('[ThemeContext] Unable to read theme from localStorage:', error);
  }
  return getRandomTheme();
}

function getInitialEcoMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const savedEco = window.localStorage.getItem(ECO_STORAGE_KEY);
    if (savedEco !== null) {
      return savedEco === 'true';
    }
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowCore =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= 4;
    return Boolean(prefersReducedMotion || isLowCore);
  } catch (error) {
    console.warn('[ThemeContext] Unable to read eco mode from localStorage:', error);
    return false;
  }
}

function persistTheme(theme: ThemeName): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('[ThemeContext] Unable to persist theme to localStorage:', error);
  }
}

function persistEcoMode(isEco: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ECO_STORAGE_KEY, String(isEco));
  } catch (error) {
    console.warn('[ThemeContext] Unable to persist eco mode to localStorage:', error);
  }
}

function applyThemeToDocument(theme: ThemeName): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

function applyEcoModeToDocument(isEco: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-eco', isEco ? 'true' : 'false');
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  changeTheme: () => {},
  isEcoMode: false,
  toggleEcoMode: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);
  const [isEcoMode, setIsEcoMode] = useState<boolean>(getInitialEcoMode);

  useEffect(() => {
    applyThemeToDocument(theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyEcoModeToDocument(isEcoMode);
    persistEcoMode(isEcoMode);
  }, [isEcoMode]);

  const changeTheme = (newTheme: ThemeName) => {
    if (!newTheme || typeof newTheme !== 'string') return;
    const sanitizedTheme = newTheme.trim();
    setTheme(sanitizedTheme);
  };

  const toggleEcoMode = () => {
    setIsEcoMode((previousState) => !previousState);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, isEcoMode, toggleEcoMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
