/**
 * Dark Mode Toggle Hook
 * Manages theme switching and stores preference in localStorage
 */

import { useState, useEffect, useCallback } from 'react';

// Returns: { isDark, toggleDarkMode }
export function useDarkMode() {
  // null = follow system, true/false = user override
  const [userPref, setUserPref] = useState<null | boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return null; // follow system
  });

  const getSystemPref = useCallback(() => window.matchMedia('(prefers-color-scheme: dark)').matches, []);

  const [isDark, setIsDark] = useState(() => userPref !== null ? userPref : getSystemPref());

  // Listen for system theme changes
  useEffect(() => {
    if (userPref !== null) return; // user override
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mql.addEventListener('change', handler);
    setIsDark(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [userPref]);

  // Apply theme to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  // When user toggles, persist preference
  const toggleDarkMode = useCallback(() => {
    setUserPref(prev => {
      const next = prev === null ? !getSystemPref() : !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      setIsDark(next);
      return next;
    });
  }, [getSystemPref]);

  return { isDark, toggleDarkMode };
}
