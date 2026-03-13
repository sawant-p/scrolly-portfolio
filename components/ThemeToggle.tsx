"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed top-6 right-6 w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/40 transition-all shadow-sm group"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
