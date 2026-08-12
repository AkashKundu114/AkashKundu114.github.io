import { createContext, useContext } from 'react'
// Single theme — no toggle needed. Kept as stub so existing imports don't break.
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })
export function ThemeProvider({ children }) { return children }
export const useTheme = () => useContext(ThemeContext)
