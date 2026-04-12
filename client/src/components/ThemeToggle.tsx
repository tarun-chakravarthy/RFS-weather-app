/**
 * Theme Toggle Button
 * Simple button to switch between light and dark modes
 */

import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="
        p-2 rounded-lg
        bg-bg-card dark:bg-slate-700
        border border-border dark:border-slate-600
        text-text-primary dark:text-text-primary
        hover:bg-bg-app dark:hover:bg-slate-600
        transition-colors
        flex items-center justify-center
      "
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}
