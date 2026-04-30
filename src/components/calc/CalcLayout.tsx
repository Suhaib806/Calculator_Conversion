import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Calculator } from "@/lib/calculators";
import { CATEGORY_BY_ID } from "@/lib/calculators";
import { CategoryBadge } from "@/components/site/CategoryBadge";

export function CalcLayout({
  calc,
  children,
  intro,
}: {
  calc: Calculator;
  children: ReactNode;
  intro?: ReactNode;
}) {
  const cat = CATEGORY_BY_ID[calc.category];
  return (
    <>
      {/* breadcrumb */}
      <div className="border-b border-border/60 bg-surface/40">
        <div className="mx-auto flex max-w-5xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground md:px-6">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/c/$category" params={{ category: cat.id }} className="hover:text-foreground">
            {cat.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{calc.name}</span>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <CategoryBadge id={calc.category} />
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {calc.name}
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{calc.description}</p>
          </div>
        </div>

        {intro && <div className="mb-8 text-sm text-muted-foreground">{intro}</div>}

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          {children}
        </div>
      </article>
    </>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium">{label}</span>
      {hint && <span className="block text-xs text-muted-foreground mt-0.5">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      {...props}
      className={`h-11 w-full rounded-lg border border-input bg-background px-3 text-base outline-none transition focus:border-foreground/40 ${props.className ?? ""}`}
    />
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      {...props}
      className={`h-11 w-full rounded-lg border border-input bg-background px-3 text-base outline-none transition focus:border-foreground/40 ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`h-11 w-full rounded-lg border border-input bg-background px-3 text-base outline-none transition focus:border-foreground/40 ${props.className ?? ""}`}
    />
  );
}

export function ResultBox({ children }: { children: ReactNode }) {
  return <div className="mt-6 rounded-xl border border-border bg-surface p-5">{children}</div>;
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function fmtMoney(n: number, currency = "USD") {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(n);
}

export function fmtNumber(n: number, digits = 2) {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: digits }).format(n);
}
