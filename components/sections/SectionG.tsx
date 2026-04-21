"use client";

import { ParticipationMatrix } from "./ParticipationMatrix";
import type { SF330Doc, SectionG as SectionGType } from "@/lib/types";

type Props = {
  doc: SF330Doc;
  onChange: (val: SectionGType) => void;
};

export function SectionG({ doc, onChange }: Props) {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Section G — Key Personnel Participation Matrix
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Check the box for each project (Section F) that each key person
          (Section E) participated in. Auto-generated from your E and F entries.
        </p>
      </div>
      <ParticipationMatrix doc={doc} onChange={onChange} />
    </div>
  );
}
