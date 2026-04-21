"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SectionH as SectionHType } from "@/lib/types";

type Props = {
  data: SectionHType;
  onChange: (val: SectionHType) => void;
};

export function SectionH({ data, onChange }: Props) {
  const [value, setValue] = useState(data.additionalInfo);

  useEffect(() => {
    setValue(data.additionalInfo);
  }, [data.additionalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange({ additionalInfo: e.target.value });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Section H — Additional Information
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide any additional information requested in the solicitation. This
          section may include discussion of quality assurance, small business
          utilization, past performance, or other relevant factors.
        </p>
      </div>
      <div className="bg-white rounded-lg border p-6 space-y-3">
        <Label htmlFor="h-info">Additional Information / Narrative</Label>
        <Textarea
          id="h-info"
          value={value}
          onChange={handleChange}
          rows={16}
          placeholder="Describe your firm's quality management plan, relevant experience not captured in prior sections, small business subcontracting plan, etc."
          className="resize-y"
        />
        <p className="text-xs text-muted-foreground text-right">
          {value.length.toLocaleString()} characters
        </p>
      </div>
    </div>
  );
}
