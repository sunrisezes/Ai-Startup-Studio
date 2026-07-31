import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './ThemeToggle.css';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
      data-tour-id="theme-toggle"
    >
      {isDark ? (
        <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={18} />
      ) : (
        <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
