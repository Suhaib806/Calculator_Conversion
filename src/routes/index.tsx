import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { SearchBox } from "@/components/site/SearchBox";
import { CalcCard } from "@/components/site/CalcCard";
import { CATEGORIES, CALCULATORS, calculatorsByCategory } from "@/lib/calculators";
import {
  ArrowRight,
  Banknote,
  HeartPulse,
  Scale,
  Sigma,
  Timer,
  ChefHat,
  Home,
  Blend,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "calc.site — Free Calculators & Converters" },
      {
        name: "description",
        content:
          "150+ free, modern calculators and converters: finance, health, conversions, math, cooking, home & garden, time, and more.",
      },
      { property: "og:title", content: "calc.site — Free Calculators & Converters" },
      { property: "og:description", content: "150+ free, modern calculators and converters." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = CALCULATORS.filter((c) => c.implemented !== false).slice(0, 8);
  const totalCount = CALCULATORS.length;
  const liveCount = CALCULATORS.filter((c) => c.implemented !== false).length;
  const conversionTools = calculatorsByCategory("conversion").slice(0, 6);
  const financeTools = calculatorsByCategory("finance").slice(0, 6);

  return (
    <Shell>
      <section className="relative overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(52,87,190,0.28),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(111,78,255,0.2),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 md:px-6 md:py-18 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-medium text-primary">
              Calculator + Conversion Workspace
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Calculate faster.
              <br />
              <span className="text-primary">Convert instantly.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Built for daily use: finance planning, unit conversion, health checks, time math, and
              practical formulas in one place.
            </p>
            <div className="mt-7 max-w-2xl rounded-3xl border border-primary/15 bg-white p-3 shadow-lg shadow-primary/10">
              <SearchBox autoFocus />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/15 bg-white px-2.5 py-1">
                {liveCount} live tools
              </span>
              <span className="rounded-full border border-primary/15 bg-white px-2.5 py-1">
                {totalCount} total entries
              </span>
              <span className="rounded-full border border-primary/15 bg-white px-2.5 py-1">
                No signup required
              </span>
            </div>
          </div>

          <div className="grid gap-3 self-end">
            {[
              {
                label: "Finance",
                to: "/c/$category",
                params: { category: "finance" as const },
                icon: Banknote,
                note: "Loans, mortgage, interest",
              },
              {
                label: "Conversions",
                to: "/c/$category",
                params: { category: "conversion" as const },
                icon: Blend,
                note: "Length, weight, temp",
              },
              {
                label: "Health",
                to: "/c/$category",
                params: { category: "health" as const },
                icon: HeartPulse,
                note: "BMI, BMR and more",
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                params={item.params}
                className="group rounded-2xl border border-primary/15 bg-white p-4 shadow-sm shadow-primary/10 transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg font-semibold">{item.label}</div>
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{item.note}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Open tools{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Browse by purpose
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick what you need to solve right now.
            </p>
          </div>
          <Link
            to="/all"
            className="hidden text-sm text-muted-foreground hover:text-foreground md:inline-flex md:items-center md:gap-1"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const count = calculatorsByCategory(c.id).length;
            return (
              <Link
                key={c.id}
                to="/c/$category"
                params={{ category: c.id }}
                className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-white p-6 shadow-sm shadow-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
              >
                <div
                  className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cat-${c.id === "home-garden" ? "home" : c.id === "conversion" ? "conv" : c.id === "cooking" ? "cook" : c.id}/20 blur-2xl transition-transform group-hover:scale-125`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Browse{" "}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm shadow-primary/10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Popular conversions
              </h2>
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {conversionTools.map((c) => (
                <Link
                  key={c.slug}
                  to="/calc/$slug"
                  params={{ slug: c.slug }}
                  className="rounded-xl border border-primary/10 bg-secondary/60 px-3 py-2 text-sm transition hover:border-primary/30 hover:bg-secondary"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm shadow-primary/10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Top finance calculators
              </h2>
              <Banknote className="h-4 w-4 text-primary" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {financeTools.map((c) => (
                <Link
                  key={c.slug}
                  to="/calc/$slug"
                  params={{ slug: c.slug }}
                  className="rounded-xl border border-primary/10 bg-secondary/60 px-3 py-2 text-sm transition hover:border-primary/30 hover:bg-secondary"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Most used
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Frequently opened calculators across major niches.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => (
            <CalcCard key={c.slug} calc={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl border border-primary/20 bg-primary p-6 text-primary-foreground md:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            What do you want to calculate?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-blue-100 md:text-base">
            Start with a niche below and jump directly to the most relevant tools.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/c/$category"
              params={{ category: "math" }}
              className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            >
              <span className="inline-flex items-center gap-2">
                <Sigma className="h-3.5 w-3.5" /> Math tools
              </span>
            </Link>
            <Link
              to="/c/$category"
              params={{ category: "time" }}
              className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            >
              <span className="inline-flex items-center gap-2">
                <Timer className="h-3.5 w-3.5" /> Time tools
              </span>
            </Link>
            <Link
              to="/c/$category"
              params={{ category: "home-garden" }}
              className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            >
              <span className="inline-flex items-center gap-2">
                <Home className="h-3.5 w-3.5" /> Home tools
              </span>
            </Link>
            <Link
              to="/c/$category"
              params={{ category: "cooking" }}
              className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            >
              <span className="inline-flex items-center gap-2">
                <ChefHat className="h-3.5 w-3.5" /> Cooking tools
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
