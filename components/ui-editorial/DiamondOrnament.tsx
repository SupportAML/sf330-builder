import { cn } from "@/lib/utils";

export function DiamondOrnament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 my-2", className)}>
      <div className="flex-1 h-px bg-[var(--brass-soft)]/50" />
      <span className="text-[10px] text-[var(--brass)]/80">◆</span>
      <div className="flex-1 h-px bg-[var(--brass-soft)]/50" />
    </div>
  );
}
