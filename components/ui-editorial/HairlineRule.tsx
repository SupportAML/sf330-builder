import { cn } from "@/lib/utils";

export function HairlineRule({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        "h-px border-0 bg-[var(--brass-soft)]/50",
        className
      )}
    />
  );
}
