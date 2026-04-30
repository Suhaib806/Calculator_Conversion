import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/calculators";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-lg font-semibold">calc.site</div>
            <p className="mt-2 max-w-xs text-sm text-blue-100">
              A modern collection of free calculators and converters for everyday use.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {CATEGORIES.map((c) => (
              <div key={c.id}>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  {c.name}
                </div>
                <Link
                  to="/c/$category"
                  params={{ category: c.id }}
                  className="mt-2 block text-sm text-white/95 hover:text-white hover:underline"
                >
                  Browse →
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/20 pt-6 text-xs text-blue-100 md:flex-row">
          <div>© {new Date().getFullYear()} calc.site — Improved clone for educational use.</div>
          <div>Built with care. Not financial or medical advice.</div>
        </div>
      </div>
    </footer>
  );
}
