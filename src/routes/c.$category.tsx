import { createFileRoute, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { CalcCard } from "@/components/site/CalcCard";
import {
  CATEGORY_BY_ID,
  calculatorsByCategory,
  CATEGORIES,
  type CategoryId,
} from "@/lib/calculators";

export const Route = createFileRoute("/c/$category")({
  head: ({ params }) => {
    const cat = CATEGORY_BY_ID[params.category as CategoryId];
    const title = cat ? `${cat.name} Calculators — calc.site` : "Calculators";
    const desc = cat?.blurb ?? "Free calculators and converters.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    if (!CATEGORY_BY_ID[params.category as CategoryId]) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <Shell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Category not found</h1>
      </div>
    </Shell>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = CATEGORY_BY_ID[category as CategoryId];
  const items = calculatorsByCategory(category as CategoryId);

  return (
    <Shell>
      <section className="border-b border-primary/20 panel-navy">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-100">
            Category
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {cat.name}
          </h1>
          <p className="mt-3 max-w-2xl text-blue-100">{cat.blurb}</p>
          <div className="mt-6 text-sm text-blue-200">{items.length} calculators</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <CalcCard key={c.slug} calc={c} />
          ))}
        </div>

        <div className="mt-16 border-t border-primary/15 pt-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Other categories
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.id !== category).map((c) => (
              <a
                key={c.id}
                href={`/c/${c.id}`}
                className="rounded-full border border-primary/15 bg-white px-3 py-1 text-sm hover:bg-accent"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
