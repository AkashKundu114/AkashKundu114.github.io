import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'theme-1', changeTheme: (_: string) => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('theme-1');

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 5) + 1;
    const randomTheme = `theme-${randomNum}`;
    setTheme(randomTheme);
    document.documentElement.setAttribute('data-theme', randomTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
