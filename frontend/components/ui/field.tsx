import * as React from "react";
import { cn } from "@/lib/utils";

const control =
  "h-11 w-full rounded-control border bg-white px-3 text-sm text-ink placeholder:text-muted/70 transition-colors hover:border-line-strong";

interface ShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

/** Label + control + hint/error wrapper. The control must use the same `id` (see Input / Select). */
export function FieldShell({ id, label, hint, error, children }: ShellProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      {children}
      <p id={`${id}-msg`} aria-live="polite" className={cn("min-h-4 text-xs", error ? "font-medium text-danger" : "text-muted")}>
        {error ? `Error: ${error}` : hint}
      </p>
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, id, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-msg` : undefined}
      className={cn(control, invalid ? "border-danger bg-danger-soft" : "border-line", className)}
      {...props}
    />
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
  options: readonly string[];
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, id, options, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-msg` : undefined}
      className={cn(control, invalid ? "border-danger bg-danger-soft" : "border-line", className)}
      {...props}
    >
      <option value="" disabled>Select an option</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
});
