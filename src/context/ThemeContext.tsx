import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });
export function ThemeProvider({ children }) {
  return children;
}
export const useTheme = () => useContext(ThemeContext);
