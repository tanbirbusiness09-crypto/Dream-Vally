"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer">
        <span className="material-symbols-outlined text-[20px]">dark_mode</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      <span className="material-symbols-outlined text-[20px]">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
