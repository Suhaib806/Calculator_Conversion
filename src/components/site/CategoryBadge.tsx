import { CATEGORY_BY_ID, type CategoryId } from "@/lib/calculators";

const TONE: Record<CategoryId, string> = {
  finance: "bg-cat-finance/10 text-cat-finance border-cat-finance/20",
  health: "bg-cat-health/10 text-cat-health border-cat-health/20",
  conversion: "bg-cat-conv/10 text-cat-conv border-cat-conv/20",
  math: "bg-cat-math/10 text-cat-math border-cat-math/20",
  "home-garden": "bg-cat-home/10 text-cat-home border-cat-home/20",
  cooking: "bg-cat-cook/10 text-cat-cook border-cat-cook/20",
  time: "bg-cat-time/10 text-cat-time border-cat-time/20",
  misc: "bg-cat-misc/10 text-cat-misc border-cat-misc/20",
};

export function CategoryBadge({ id }: { id: CategoryId }) {
  const cat = CATEGORY_BY_ID[id];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TONE[id]}`}
    >
      {cat.name}
    </span>
  );
}

export function CategoryDot({ id, className = "" }: { id: CategoryId; className?: string }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full bg-cat-${id === "home-garden" ? "home" : id === "conversion" ? "conv" : id === "cooking" ? "cook" : id} ${className}`}
    />
  );
}
