"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { ChevronDown, ChevronUp, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { PersonResume, RelevantProject } from "@/lib/types";

type Props = {
  person: PersonResume;
  index: number;
  onUpdate: (p: PersonResume) => void;
  onRemove: () => void;
};

function ProjectRow({
  project,
  index,
  onUpdate,
  onRemove,
}: {
  project: RelevantProject;
  index: number;
  onUpdate: (p: RelevantProject) => void;
  onRemove: () => void;
}) {
  return (
    <div className="bg-gray-50 rounded-md border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Project {index + 1}
        </span>
        <button onClick={onRemove} className="text-destructive hover:text-destructive/80">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Project Title</Label>
          <Input
            value={project.title}
            onChange={(e) => onUpdate({ ...project, title: e.target.value })}
            placeholder="Courthouse Renovation"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Location</Label>
          <Input
            value={project.location}
            onChange={(e) => onUpdate({ ...project, location: e.target.value })}
            placeholder="Atlanta, GA"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Year Completed (Design)</Label>
          <Input
            value={project.yearCompleted}
            onChange={(e) => onUpdate({ ...project, yearCompleted: e.target.value })}
            placeholder="2022"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Year Completed (Construction)</Label>
          <Input
            value={project.yearConstruction}
            onChange={(e) => onUpdate({ ...project, yearConstruction: e.target.value })}
            placeholder="2023"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Project Cost</Label>
          <Input
            value={project.cost}
            onChange={(e) => onUpdate({ ...project, cost: e.target.value })}
            placeholder="$12M"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Fee</Label>
          <Input
            value={project.fee}
            onChange={(e) => onUpdate({ ...project, fee: e.target.value })}
            placeholder="$850K"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">Role on Project</Label>
          <Input
            value={project.role}
            onChange={(e) => onUpdate({ ...project, role: e.target.value })}
            placeholder="Project Engineer / Structural Lead"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">Brief Scope Description</Label>
          <Textarea
            value={project.scope}
            onChange={(e) => onUpdate({ ...project, scope: e.target.value })}
            placeholder="Responsible for structural design and coordination..."
            rows={2}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export function PersonResumeCard({ person, index, onUpdate, onRemove }: Props) {
  const [expanded, setExpanded] = useState(true);

  const addProject = () => {
    if (person.relevantProjects.length >= 5) return;
    const np: RelevantProject = {
      id: nanoid(),
      title: "",
      location: "",
      yearCompleted: "",
      yearConstruction: "",
      cost: "",
      role: "",
      scope: "",
      fee: "",
    };
    onUpdate({
      ...person,
      relevantProjects: [...person.relevantProjects, np],
    });
  };

  const updateProject = (id: string, updated: RelevantProject) => {
    onUpdate({
      ...person,
      relevantProjects: person.relevantProjects.map((p) =>
        p.id === id ? updated : p
      ),
    });
  };

  const removeProject = (id: string) => {
    onUpdate({
      ...person,
      relevantProjects: person.relevantProjects.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-muted-foreground">
            #{index + 1}
          </span>
          <div>
            <p className="font-medium text-sm">
              {person.name || "Unnamed Person"}
            </p>
            {person.role && (
              <p className="text-xs text-muted-foreground">{person.role}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                value={person.name}
                onChange={(e) => onUpdate({ ...person, name: e.target.value })}
                placeholder="Jane Smith"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role in this Contract</Label>
              <Input
                value={person.role}
                onChange={(e) => onUpdate({ ...person, role: e.target.value })}
                placeholder="Project Manager"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Firm</Label>
              <Input
                value={person.firm}
                onChange={(e) => onUpdate({ ...person, firm: e.target.value })}
                placeholder="Smith Engineering LLC"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Years Total</Label>
                <Input
                  type="number"
                  min={0}
                  value={person.yearsTotal as string}
                  onChange={(e) =>
                    onUpdate({ ...person, yearsTotal: e.target.value })
                  }
                  placeholder="15"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Years w/ Firm</Label>
                <Input
                  type="number"
                  min={0}
                  value={person.yearsFirm as string}
                  onChange={(e) =>
                    onUpdate({ ...person, yearsFirm: e.target.value })
                  }
                  placeholder="8"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Education (one per line)</Label>
            <Textarea
              value={person.education}
              onChange={(e) =>
                onUpdate({ ...person, education: e.target.value })
              }
              placeholder="B.S. Civil Engineering, Georgia Tech, 2005&#10;M.S. Structural Engineering, MIT, 2007"
              rows={3}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Registrations / Licenses (one per line)</Label>
            <Textarea
              value={person.registration}
              onChange={(e) =>
                onUpdate({ ...person, registration: e.target.value })
              }
              placeholder="Licensed PE, Georgia, #12345, 2010&#10;LEED AP BD+C, 2012"
              rows={3}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Other Qualifications / Memberships</Label>
            <Textarea
              value={person.otherQualifications}
              onChange={(e) =>
                onUpdate({ ...person, otherQualifications: e.target.value })
              }
              placeholder="Member, ASCE; Certified Construction Manager (CCM); SECRET Clearance"
              rows={2}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>
                Relevant Projects ({person.relevantProjects.length}/5)
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addProject}
                disabled={person.relevantProjects.length >= 5}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Project
              </Button>
            </div>
            {person.relevantProjects.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No relevant projects added yet.
              </p>
            )}
            <div className="space-y-3">
              {person.relevantProjects.map((proj, i) => (
                <ProjectRow
                  key={proj.id}
                  project={proj}
                  index={i}
                  onUpdate={(p) => updateProject(proj.id, p)}
                  onRemove={() => removeProject(proj.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
