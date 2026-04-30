import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Calculator as CalcIcon } from "lucide-react";
import { CATEGORIES } from "@/lib/calculators";

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefers =
      typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-primary/95 text-primary-foreground shadow-lg shadow-primary/20 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-base font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-primary">
            <CalcIcon className="h-4 w-4" />
          </span>
          <span>
            calc<span className="text-blue-200">.</span>site
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {CATEGORIES.slice(0, 6).map((c) => (
            <Link
              key={c.id}
              to="/c/$category"
              params={{ category: c.id }}
              className="rounded-md px-3 py-1.5 text-sm text-blue-100 transition-colors hover:bg-white/15 hover:text-white"
              activeProps={{ className: "rounded-md bg-white/20 px-3 py-1.5 text-sm text-white" }}
            >
              {c.name}
            </Link>
          ))}
          <Link
            to="/all"
            className="rounded-md px-3 py-1.5 text-sm text-blue-100 transition-colors hover:bg-white/15 hover:text-white"
            activeProps={{ className: "rounded-md bg-white/20 px-3 py-1.5 text-sm text-white" }}
          >
            All
          </Link>
        </nav>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid h-9 w-9 place-items-center rounded-md border border-white/30 bg-white/15 text-white transition-colors hover:bg-white/25"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
