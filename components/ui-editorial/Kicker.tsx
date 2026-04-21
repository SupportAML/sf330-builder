import { cn } from "@/lib/utils";

export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--brass-ink)]",
        className
      )}
    >
      {children}
    </p>
  );
}
