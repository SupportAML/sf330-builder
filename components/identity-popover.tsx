"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  firm: z.string().min(1, "Firm is required"),
  email: z.string().email("Valid email required"),
});

type FormValues = z.infer<typeof schema>;

export function IdentityPopover() {
  const [open, setOpen] = useState(false);
  const { identity, setIdentity } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: identity?.name ?? "",
      firm: identity?.firm ?? "",
      email: identity?.email ?? "",
    },
  });

  // Reset form when identity changes
  useEffect(() => {
    reset({
      name: identity?.name ?? "",
      firm: identity?.firm ?? "",
      email: identity?.email ?? "",
    });
  }, [identity, reset]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const onSubmit = (data: FormValues) => {
    setIdentity(data);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-xs text-[var(--muted-foreground)] hover:text-[var(--ink)] transition-colors tracking-wide"
      >
        {identity ? (
          <span>
            <span className="font-medium">{identity.name}</span>
            <span className="mx-1 opacity-50">·</span>
            <span>{identity.firm}</span>
          </span>
        ) : (
          "Set identity"
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-[var(--card)] border border-[var(--border)] shadow-lg z-50 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--brass-ink)] mb-3">
            Your Identity
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="id-name" className="text-xs text-[var(--muted-foreground)]">
                Name
              </Label>
              <Input
                id="id-name"
                {...register("name")}
                placeholder="Jane Smith, MD"
                className="h-8 text-sm border-[var(--border)] focus-visible:ring-[var(--brass)] focus-visible:ring-2 focus-visible:border-[var(--brass)] bg-[var(--background)]"
              />
              {errors.name && (
                <p className="text-xs text-[var(--destructive)]">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="id-firm" className="text-xs text-[var(--muted-foreground)]">
                Firm
              </Label>
              <Input
                id="id-firm"
                {...register("firm")}
                placeholder="Smith Engineering LLC"
                className="h-8 text-sm border-[var(--border)] focus-visible:ring-[var(--brass)] focus-visible:ring-2 focus-visible:border-[var(--brass)] bg-[var(--background)]"
              />
              {errors.firm && (
                <p className="text-xs text-[var(--destructive)]">{errors.firm.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="id-email" className="text-xs text-[var(--muted-foreground)]">
                Email
              </Label>
              <Input
                id="id-email"
                type="email"
                {...register("email")}
                placeholder="jane@smithengineering.com"
                className="h-8 text-sm border-[var(--border)] focus-visible:ring-[var(--brass)] focus-visible:ring-2 focus-visible:border-[var(--brass)] bg-[var(--background)]"
              />
              {errors.email && (
                <p className="text-xs text-[var(--destructive)]">{errors.email.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-[var(--muted-foreground)] hover:text-[var(--ink)] transition-colors px-2 py-1"
              >
                Cancel
              </button>
              <Button
                type="submit"
                size="sm"
                className="h-7 text-xs bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
