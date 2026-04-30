import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { CalcCard } from "@/components/site/CalcCard";
import { SearchBox } from "@/components/site/SearchBox";
import { CATEGORIES, calculatorsByCategory } from "@/lib/calculators";

export const Route = createFileRoute("/all")({
  head: () => ({
    meta: [
      { title: "All Calculators — calc.site" },
      {
        name: "description",
        content: "Complete index of every calculator and converter on calc.site.",
      },
      { property: "og:title", content: "All Calculators — calc.site" },
      { property: "og:description", content: "Complete index of every calculator and converter." },
    ],
  }),
  component: AllPage,
});

function AllPage() {
  return (
    <Shell>
      <section className="border-b border-primary/20 panel-navy">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            All calculators
          </h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Every tool in one colorful index, grouped by category for faster discovery.
          </p>
          <div className="mt-6 max-w-xl rounded-3xl border border-white/20 bg-white/10 p-2">
            <SearchBox />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        {CATEGORIES.map((cat) => {
          const items = calculatorsByCategory(cat.id);
          return (
            <section
              key={cat.id}
              id={cat.id}
              className="mb-14 scroll-mt-20 rounded-2xl border border-primary/10 bg-white/80 p-5 shadow-sm shadow-primary/5"
            >
              <div className="mb-5 flex items-end justify-between border-b border-primary/10 pb-3">
                <h2 className="font-display text-2xl font-semibold tracking-tight">{cat.name}</h2>
                <span className="text-xs text-muted-foreground">{items.length} tools</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <CalcCard key={c.slug} calc={c} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Shell>
  );
}
