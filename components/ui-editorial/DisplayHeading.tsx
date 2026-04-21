import { cn } from "@/lib/utils";

export function DisplayHeading({
  children,
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-serif text-4xl md:text-5xl font-medium tracking-tight text-[var(--ink)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
