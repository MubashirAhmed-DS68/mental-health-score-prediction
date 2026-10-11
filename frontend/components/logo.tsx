/** Original mark: a brain-like outline made of connected data nodes. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M16 5c-3 0-5 1.6-5.6 3.8C8 9.2 6.5 11.2 6.5 13.6c0 1.2.4 2.3 1.1 3.1-.5.8-.8 1.7-.8 2.7 0 2.5 1.9 4.5 4.3 4.7.8 1.5 2.4 2.4 4.9 2.4s4.1-.9 4.9-2.4c2.4-.2 4.3-2.2 4.3-4.7 0-1-.3-1.9-.8-2.7.7-.8 1.1-1.9 1.1-3.1 0-2.4-1.5-4.4-3.9-4.8C21 6.6 19 5 16 5Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
      />
      <path d="M16 6v20M16 12l-4 3M16 17l4-3M16 21l-3.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
      <circle cx="20" cy="14" r="1.4" fill="currentColor" />
      <circle cx="12.5" cy="23.5" r="1.4" fill="currentColor" />
    </svg>
  );
}
