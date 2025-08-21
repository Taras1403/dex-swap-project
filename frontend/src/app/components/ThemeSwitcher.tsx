'use client';

import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get the theme from localStorage on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme === 'light' ? 'light' : 'dark');
    document.documentElement.classList.add(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="py-2 px-4 rounded-full bg-[#e0e5ec] text-black font-bold
                                    shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                                    dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]">
      {theme === 'light' ? 'dark' : 'light'}
    </button>
  );
}