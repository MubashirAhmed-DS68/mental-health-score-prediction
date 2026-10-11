import { Info } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="notice" className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-3xl gap-3 px-5 py-10 text-sm leading-relaxed text-muted sm:px-8">
        <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        <p>
          This tool provides a machine-learning estimate for educational and informational purposes only. It is
          not a medical or psychological diagnosis and has not been clinically validated. If you are worried
          about your wellbeing, please speak with a qualified health professional.
        </p>
      </div>
    </footer>
  );
}
