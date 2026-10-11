import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-[background-color,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white shadow-sm hover:bg-brand-hover active:bg-brand-press",
        outline: "border border-line-strong bg-white text-ink hover:border-brand hover:text-brand",
      },
      size: { md: "h-11 px-5 text-sm", lg: "h-12 px-6 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

/** `asChild` styles a single child element (e.g. an anchor) as a button. */
export function Button({ className, variant, size, asChild, children, ...props }: Props) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, { className: cn(classes, children.props.className) });
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
