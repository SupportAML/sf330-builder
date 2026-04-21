"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sectionBSchema } from "@/lib/schemas";
import type { SectionB as SectionBType } from "@/lib/types";
import { z } from "zod";

type FormValues = z.infer<typeof sectionBSchema>;

type Props = {
  data: SectionBType;
  onChange: (val: SectionBType) => void;
};

export function SectionB({ data, onChange }: Props) {
  const { register, watch } = useForm<FormValues>({
    resolver: zodResolver(sectionBSchema),
    defaultValues: data,
  });

  useEffect(() => {
    const sub = watch((values) => {
      onChange(values as SectionBType);
    });
    return () => sub.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Section B — A-E Point of Contact</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Primary contact person for this submission.
        </p>
      </div>
      <div className="space-y-5 bg-white rounded-lg border p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="b-name">Name</Label>
            <Input id="b-name" {...register("name")} placeholder="Jane Smith" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="b-title">Title</Label>
            <Input
              id="b-title"
              {...register("title")}
              placeholder="Principal Engineer"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-firm">Firm</Label>
          <Input
            id="b-firm"
            {...register("firm")}
            placeholder="Smith Engineering LLC"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-address">Address</Label>
          <Textarea
            id="b-address"
            {...register("address")}
            placeholder="123 Main Street&#10;Suite 400&#10;Atlanta, GA 30301"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="b-phone">Phone</Label>
            <Input
              id="b-phone"
              type="tel"
              {...register("phone")}
              placeholder="(404) 555-1234"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="b-fax">Fax</Label>
            <Input
              id="b-fax"
              type="tel"
              {...register("fax")}
              placeholder="(404) 555-5678"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-email">Email</Label>
          <Input
            id="b-email"
            type="email"
            {...register("email")}
            placeholder="jane@smithengineering.com"
          />
        </div>
      </div>
    </div>
  );
}
