"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { sectionASchema } from "@/lib/schemas";
import type { SectionA as SectionAType } from "@/lib/types";
import { z } from "zod";

type FormValues = z.infer<typeof sectionASchema>;

type Props = {
  data: SectionAType;
  onChange: (val: SectionAType) => void;
};

export function SectionA({ data, onChange }: Props) {
  const { register, watch } = useForm<FormValues>({
    resolver: zodResolver(sectionASchema),
    defaultValues: data,
  });

  useEffect(() => {
    const sub = watch((values) => {
      onChange(values as SectionAType);
    });
    return () => sub.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Section A — Contract Information</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Basic identification information for this solicitation.
        </p>
      </div>
      <div className="space-y-5 bg-white rounded-lg border p-6">
        <div className="space-y-1.5">
          <Label htmlFor="a-title">Contract Title / Project Name</Label>
          <Input
            id="a-title"
            {...register("title")}
            placeholder="Design Services for Federal Building Renovation"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="a-contractNumber">Contract Number</Label>
            <Input
              id="a-contractNumber"
              {...register("contractNumber")}
              placeholder="47QRAA24R0001"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="a-solicitationNumber">Solicitation Number</Label>
            <Input
              id="a-solicitationNumber"
              {...register("solicitationNumber")}
              placeholder="47QRAA24R0001-SOL"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="a-date">Date Prepared</Label>
          <Input
            id="a-date"
            type="date"
            {...register("date")}
            className="max-w-xs"
          />
        </div>
      </div>
    </div>
  );
}
