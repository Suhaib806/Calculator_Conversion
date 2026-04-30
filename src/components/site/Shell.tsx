import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 5% 5%, rgba(45,79,184,0.16), transparent 38%), radial-gradient(circle at 95% 10%, rgba(101,82,255,0.14), transparent 30%)",
        }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
