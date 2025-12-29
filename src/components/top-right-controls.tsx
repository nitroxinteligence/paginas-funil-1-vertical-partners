"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DARK_CLASS = "dark";

export function TopRightControls() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains(DARK_CLASS));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(DARK_CLASS, isDark);
  }, [isDark]);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex items-center gap-3 sm:right-6 sm:top-6">
      <div className="pointer-events-auto rounded-[55px] border border-black/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-700 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] dark:border-white/10">
        <span className="bg-gradient-to-r from-sky-300 via-sky-500 to-blue-600 bg-clip-text text-sm font-semibold text-transparent sm:text-base">
          Vertical Partners
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Alternar tema"
        onClick={() => setIsDark((prev) => !prev)}
        className="pointer-events-auto inline-flex h-10 w-16 items-center rounded-full border border-black/10 bg-white/90 p-1 shadow-sm transition-colors dark:border-white/15 dark:bg-black/70"
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform ${
            isDark
              ? "translate-x-0 bg-slate-100 text-slate-900"
              : "translate-x-6 bg-gradient-to-br from-sky-400 to-blue-600 text-white"
          }`}
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </span>
      </button>
    </div>
  );
}
