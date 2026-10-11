import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-control focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3 rounded-control">
          <span className="grid size-9 shrink-0 place-items-center rounded-control bg-brand-soft text-brand">
            <Logo className="size-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold sm:text-base">Mental Health Score Prediction</span>
            <span className="hidden text-xs text-muted sm:block">A data-driven look at daily habits</span>
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium text-muted sm:flex">
          <a href="#assessment" className="rounded-control hover:text-brand">Assessment</a>
          <a href="#notice" className="rounded-control hover:text-brand">Notice</a>
        </nav>
      </div>
    </header>
  );
}
