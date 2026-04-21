"use client";

import { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SectionC as SectionCType, TeamFirm } from "@/lib/types";

type Props = {
  data: SectionCType;
  onChange: (val: SectionCType) => void;
};

function FirmRow({
  firm,
  index,
  onUpdate,
  onRemove,
}: {
  firm: TeamFirm;
  index: number;
  onUpdate: (f: TeamFirm) => void;
  onRemove: () => void;
}) {
  return (
    <div className="bg-white rounded-lg border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          C-{index + 1}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Role</Label>
          <Select
            value={firm.role}
            onValueChange={(v) =>
              onUpdate({ ...firm, role: v as TeamFirm["role"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prime">Prime</SelectItem>
              <SelectItem value="Subconsultant">Subconsultant</SelectItem>
              <SelectItem value="JV Partner">JV Partner</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Firm Name</Label>
          <Input
            value={firm.name}
            onChange={(e) => onUpdate({ ...firm, name: e.target.value })}
            placeholder="Smith Engineering LLC"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Address</Label>
        <Textarea
          value={firm.address}
          onChange={(e) => onUpdate({ ...firm, address: e.target.value })}
          placeholder="123 Main Street, Suite 400, Atlanta, GA 30301"
          rows={2}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`branch-${firm.id}`}
          checked={firm.checkIfBranch}
          onCheckedChange={(v) =>
            onUpdate({ ...firm, checkIfBranch: Boolean(v) })
          }
        />
        <Label htmlFor={`branch-${firm.id}`} className="font-normal">
          Check if branch office
        </Label>
      </div>
    </div>
  );
}

export function SectionC({ data, onChange }: Props) {
  const addFirm = useCallback(() => {
    const newFirm: TeamFirm = {
      id: nanoid(),
      role: "Prime",
      name: "",
      address: "",
      checkIfBranch: false,
    };
    onChange({ firms: [...data.firms, newFirm] });
  }, [data.firms, onChange]);

  const updateFirm = useCallback(
    (id: string, updated: TeamFirm) => {
      onChange({
        firms: data.firms.map((f) => (f.id === id ? updated : f)),
      });
    },
    [data.firms, onChange]
  );

  const removeFirm = useCallback(
    (id: string) => {
      onChange({ firms: data.firms.filter((f) => f.id !== id) });
    },
    [data.firms, onChange]
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Section C — Proposed Team</h2>
        <p className="text-sm text-muted-foreground mt-1">
          List all firms that will be part of the proposed team (prime,
          subconsultants, JV partners).
        </p>
      </div>

      <div className="space-y-4">
        {data.firms.length === 0 && (
          <div className="bg-white rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground text-sm">
              No firms added yet. Click &quot;Add Firm&quot; to get started.
            </p>
          </div>
        )}
        {data.firms.map((firm, i) => (
          <FirmRow
            key={firm.id}
            firm={firm}
            index={i}
            onUpdate={(f) => updateFirm(firm.id, f)}
            onRemove={() => removeFirm(firm.id)}
          />
        ))}
        <Button variant="outline" onClick={addFirm} className="w-full">
          <Plus className="h-4 w-4 mr-1" />
          Add Firm
        </Button>
      </div>
    </div>
  );
}
