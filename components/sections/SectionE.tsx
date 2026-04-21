"use client";

import { useCallback } from "react";
import { nanoid } from "nanoid";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonResumeCard } from "./PersonResumeCard";
import type { SectionE as SectionEType, PersonResume } from "@/lib/types";

type Props = {
  data: SectionEType;
  onChange: (val: SectionEType) => void;
};

export function SectionE({ data, onChange }: Props) {
  const addPerson = useCallback(() => {
    const np: PersonResume = {
      id: nanoid(),
      name: "",
      role: "",
      yearsTotal: "",
      yearsFirm: "",
      firm: "",
      education: "",
      registration: "",
      otherQualifications: "",
      relevantProjects: [],
    };
    onChange({ personnel: [...data.personnel, np] });
  }, [data.personnel, onChange]);

  const updatePerson = useCallback(
    (id: string, updated: PersonResume) => {
      onChange({
        personnel: data.personnel.map((p) => (p.id === id ? updated : p)),
      });
    },
    [data.personnel, onChange]
  );

  const removePerson = useCallback(
    (id: string) => {
      onChange({ personnel: data.personnel.filter((p) => p.id !== id) });
    },
    [data.personnel, onChange]
  );

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Section E — Key Personnel Resumes
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide a resume for each key person proposed for this contract.
          Include up to 5 relevant projects per person.
        </p>
      </div>

      <div className="space-y-4">
        {data.personnel.length === 0 && (
          <div className="bg-white rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground text-sm">
              No personnel added yet. Click &quot;Add Personnel&quot; to get
              started.
            </p>
          </div>
        )}
        {data.personnel.map((person, i) => (
          <PersonResumeCard
            key={person.id}
            person={person}
            index={i}
            onUpdate={(p) => updatePerson(person.id, p)}
            onRemove={() => removePerson(person.id)}
          />
        ))}
        <Button variant="outline" onClick={addPerson} className="w-full">
          <Plus className="h-4 w-4 mr-1" />
          Add Personnel
        </Button>
      </div>
    </div>
  );
}
