import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Calculator } from "@/lib/calculators";
import { CategoryBadge } from "./CategoryBadge";

export function CalcCard({ calc }: { calc: Calculator }) {
  return (
    <Link
      to="/calc/$slug"
      params={{ slug: calc.slug }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/15 bg-white p-5 shadow-sm shadow-primary/10 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-transform group-hover:scale-125" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold">{calc.name}</h3>
            {!calc.implemented && (
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                soon
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{calc.description}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-primary/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <div className="mt-4">
        <CategoryBadge id={calc.category} />
      </div>
    </Link>
  );
}
