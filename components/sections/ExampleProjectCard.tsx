"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { ChevronDown, ChevronUp, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Project, FirmInvolved } from "@/lib/types";

type Props = {
  project: Project;
  index: number;
  onUpdate: (p: Project) => void;
  onRemove: () => void;
};

export function ExampleProjectCard({ project, index, onUpdate, onRemove }: Props) {
  const [expanded, setExpanded] = useState(true);

  const addFirm = () => {
    const nf: FirmInvolved = {
      id: nanoid(),
      firmName: "",
      role: "",
      location: "",
    };
    onUpdate({ ...project, firmsInvolved: [...project.firmsInvolved, nf] });
  };

  const updateFirm = (id: string, updated: FirmInvolved) => {
    onUpdate({
      ...project,
      firmsInvolved: project.firmsInvolved.map((f) =>
        f.id === id ? updated : f
      ),
    });
  };

  const removeFirm = (id: string) => {
    onUpdate({
      ...project,
      firmsInvolved: project.firmsInvolved.filter((f) => f.id !== id),
    });
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-muted-foreground">
            F-{index + 1}
          </span>
          <div>
            <p className="font-medium text-sm">
              {project.title || "Unnamed Project"}
            </p>
            {project.location && (
              <p className="text-xs text-muted-foreground">{project.location}</p>
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
              <Label>Project Title</Label>
              <Input
                value={project.title}
                onChange={(e) => onUpdate({ ...project, title: e.target.value })}
                placeholder="Federal Building Renovation"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input
                value={project.location}
                onChange={(e) =>
                  onUpdate({ ...project, location: e.target.value })
                }
                placeholder="Washington, DC"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Year Completed (Design)</Label>
              <Input
                value={project.yearCompleted}
                onChange={(e) =>
                  onUpdate({ ...project, yearCompleted: e.target.value })
                }
                placeholder="2021"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Year Completed (Construction)</Label>
              <Input
                value={project.yearConstructionCompleted}
                onChange={(e) =>
                  onUpdate({
                    ...project,
                    yearConstructionCompleted: e.target.value,
                  })
                }
                placeholder="2023"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Project Owner</Label>
              <Input
                value={project.projectOwner}
                onChange={(e) =>
                  onUpdate({ ...project, projectOwner: e.target.value })
                }
                placeholder="U.S. General Services Administration"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Point of Contact</Label>
              <Input
                value={project.pointOfContact}
                onChange={(e) =>
                  onUpdate({ ...project, pointOfContact: e.target.value })
                }
                placeholder="John Doe, Project Manager"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Point of Contact Phone</Label>
              <Input
                value={project.pointOfContactPhone}
                onChange={(e) =>
                  onUpdate({ ...project, pointOfContactPhone: e.target.value })
                }
                placeholder="(202) 555-1234"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Brief Description (role, scope, cost, fee)</Label>
            <Textarea
              value={project.briefDescription}
              onChange={(e) =>
                onUpdate({ ...project, briefDescription: e.target.value })
              }
              placeholder="Served as prime A-E firm for full building renovation including mechanical, electrical, and plumbing upgrades. Construction cost: $18M. A-E fee: $1.4M."
              rows={4}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Firms Involved</Label>
              <Button variant="outline" size="sm" onClick={addFirm}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Firm
              </Button>
            </div>
            {project.firmsInvolved.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No firms listed yet.
              </p>
            )}
            <div className="space-y-2">
              {project.firmsInvolved.map((firm) => (
                <div
                  key={firm.id}
                  className="bg-gray-50 rounded-md border p-3 grid grid-cols-1 sm:grid-cols-3 gap-2 items-start"
                >
                  <div className="space-y-1">
                    <Label className="text-xs">Firm Name</Label>
                    <Input
                      value={firm.firmName}
                      onChange={(e) =>
                        updateFirm(firm.id, { ...firm, firmName: e.target.value })
                      }
                      placeholder="ABC Consulting"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Role</Label>
                    <Input
                      value={firm.role}
                      onChange={(e) =>
                        updateFirm(firm.id, { ...firm, role: e.target.value })
                      }
                      placeholder="Structural"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="space-y-1 flex-1">
                      <Label className="text-xs">Location</Label>
                      <Input
                        value={firm.location}
                        onChange={(e) =>
                          updateFirm(firm.id, {
                            ...firm,
                            location: e.target.value,
                          })
                        }
                        placeholder="Atlanta, GA"
                        className="h-8 text-sm"
                      />
                    </div>
                    <button
                      onClick={() => removeFirm(firm.id)}
                      className="text-destructive hover:text-destructive/80 mb-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
