import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { searchCalculators, CATEGORY_BY_ID } from "@/lib/calculators";

export function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchCalculators(q, 8), [q]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search 150+ calculators — try 'mortgage' or 'bmi'"
          className="w-full rounded-2xl border border-primary/20 bg-white px-12 py-4 text-base shadow-md shadow-primary/10 outline-none transition focus:border-primary/50 focus:shadow-lg focus:shadow-primary/20"
        />
      </div>
      {q && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-primary/20 bg-popover shadow-xl shadow-primary/20">
          {results.map((r) => (
            <Link
              key={r.slug}
              to="/calc/$slug"
              params={{ slug: r.slug }}
              onClick={() => setQ("")}
              className="flex items-center justify-between gap-4 border-b border-primary/10 px-4 py-3 last:border-0 hover:bg-accent"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{r.name}</div>
                <div className="truncate text-xs text-muted-foreground">{r.description}</div>
              </div>
              <span className="shrink-0 rounded-full border border-primary/20 bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {CATEGORY_BY_ID[r.category].name}
              </span>
            </Link>
          ))}
        </div>
      )}
      {q && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-primary/20 bg-popover px-4 py-3 text-sm text-muted-foreground shadow-xl shadow-primary/20">
          No matches for "{q}".
        </div>
      )}
    </div>
  );
}
