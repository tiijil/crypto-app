'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Context for managing application-wide theme state
 * Provides theme value and toggle function to all child components
 */
const ThemeContext = createContext({
  theme: 'light' as Theme,
  toggleTheme: () => {},
});

/**
 * ThemeProvider Component
 * 
 * Manages application theme state and provides theme context to the application.
 * Features:
 * - Default light theme
 * - Theme persistence using localStorage
 * - Smooth theme transitions
 * - SSR compatibility with hydration handling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme state with light mode default
  const [theme, setTheme] = useState<Theme>('light');
  // Mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize theme on component mount
   * Checks localStorage for saved theme preference
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  /**
   * Apply theme changes to DOM and persist to localStorage
   * Handles class and data-attribute updates for theme switching
   */
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // Prevent flash of incorrect theme during SSR
  if (!mounted) {
    return null;
  }

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme context
 * @returns {Object} Theme context containing current theme and toggle function
 * @throws {Error} When used outside of ThemeProvider
 */
export const useTheme = () => useContext(ThemeContext); 