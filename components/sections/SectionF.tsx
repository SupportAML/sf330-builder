"use client";

import { useCallback } from "react";
import { nanoid } from "nanoid";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExampleProjectCard } from "./ExampleProjectCard";
import type { SectionF as SectionFType, Project } from "@/lib/types";

type Props = {
  data: SectionFType;
  onChange: (val: SectionFType) => void;
};

export function SectionF({ data, onChange }: Props) {
  const atMax = data.projects.length >= 10;

  const addProject = useCallback(() => {
    if (atMax) return;
    const np: Project = {
      id: nanoid(),
      title: "",
      location: "",
      yearCompleted: "",
      yearConstructionCompleted: "",
      projectOwner: "",
      pointOfContact: "",
      pointOfContactPhone: "",
      briefDescription: "",
      firmsInvolved: [],
    };
    onChange({ projects: [...data.projects, np] });
  }, [data.projects, onChange, atMax]);

  const updateProject = useCallback(
    (id: string, updated: Project) => {
      onChange({
        projects: data.projects.map((p) => (p.id === id ? updated : p)),
      });
    },
    [data.projects, onChange]
  );

  const removeProject = useCallback(
    (id: string) => {
      onChange({ projects: data.projects.filter((p) => p.id !== id) });
    },
    [data.projects, onChange]
  );

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Section F — Example Projects</h2>
        <p className="text-sm text-muted-foreground mt-1">
          List up to 10 example projects that demonstrate the team&apos;s
          relevant experience. Maximum 10 projects.
        </p>
      </div>

      <div className="space-y-4">
        {data.projects.length === 0 && (
          <div className="bg-white rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground text-sm">
              No projects added yet. Click &quot;Add Project&quot; to get
              started.
            </p>
          </div>
        )}
        {data.projects.map((project, i) => (
          <ExampleProjectCard
            key={project.id}
            project={project}
            index={i}
            onUpdate={(p) => updateProject(project.id, p)}
            onRemove={() => removeProject(project.id)}
          />
        ))}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={addProject}
            disabled={atMax}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </Button>
          {atMax && (
            <p className="text-sm text-muted-foreground">
              Maximum 10 projects reached.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
