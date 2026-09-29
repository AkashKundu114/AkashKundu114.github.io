import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemeName = 'theme-1' | 'theme-2' | 'theme-3' | 'theme-4' | 'theme-5' | string;

export interface ThemeContextValue {
  theme: ThemeName;
  changeTheme: (newTheme: ThemeName) => void;
}

const THEME_STORAGE_KEY = 'portfolio_theme';
const DEFAULT_THEME: ThemeName = 'theme-1';
const AVAILABLE_THEMES: readonly ThemeName[] = [
  'theme-1',
  'theme-2',
  'theme-3',
  'theme-4',
  'theme-5',
];

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

function persistTheme(theme: ThemeName): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('[ThemeContext] Unable to persist theme to localStorage:', error);
  }
}

function applyThemeToDocument(theme: ThemeName): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  changeTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
    persistTheme(theme);
  }, [theme]);

  const changeTheme = (newTheme: ThemeName) => {
    if (!newTheme || typeof newTheme !== 'string') return;
    const sanitizedTheme = newTheme.trim();
    setTheme(sanitizedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
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
