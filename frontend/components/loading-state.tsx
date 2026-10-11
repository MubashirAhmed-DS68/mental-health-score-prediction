import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 rounded-control bg-brand-soft px-4 py-3 text-sm font-medium text-brand">
      <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      Analyzing your information...
    </div>
  );
}
