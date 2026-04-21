"use client";

import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import type { SectionD as SectionDType } from "@/lib/types";

type Props = {
  data: SectionDType;
  onChange: (val: SectionDType) => void;
};

export function SectionD({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert(
        "Image is larger than 2MB. Large base64 images may slow down localStorage. Consider compressing first."
      );
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onChange({ ...data, imageDataUrl: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Section D — Organizational Chart
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide an organizational chart showing the relationship of all team
          members. Upload an image or describe it in text.
        </p>
      </div>

      <Tabs
        value={data.activeTab}
        onValueChange={(v) =>
          onChange({ ...data, activeTab: v as "image" | "text" })
        }
      >
        <TabsList className="mb-4">
          <TabsTrigger value="image">Upload Image</TabsTrigger>
          <TabsTrigger value="text">Text Description</TabsTrigger>
        </TabsList>

        <TabsContent value="image">
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <div>
              <Label className="mb-2 block">Org Chart Image</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Accepted: PNG, JPG, GIF. Stored as base64 in localStorage —
                keep files under 2MB.
              </p>
              {data.imageDataUrl ? (
                <div className="space-y-3">
                  <img
                    src={data.imageDataUrl}
                    alt="Org chart"
                    className="max-w-full rounded border"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onChange({ ...data, imageDataUrl: null })}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove image
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload an org chart image
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="text">
          <div className="bg-white rounded-lg border p-6 space-y-3">
            <Label htmlFor="d-text">Text Description / ASCII Org Chart</Label>
            <p className="text-xs text-muted-foreground">
              Use monospace text to draw the organizational structure. This will
              appear verbatim in the preview.
            </p>
            <Textarea
              id="d-text"
              value={data.textDescription}
              onChange={(e) =>
                onChange({ ...data, textDescription: e.target.value })
              }
              rows={14}
              className="font-mono text-sm"
              placeholder={`Prime: Smith Engineering LLC
├── Project Manager: Jane Smith
│   ├── Lead Designer: Bob Jones
│   └── QA Lead: Maria Garcia
└── Subconsultant: ABC Consulting
    └── Structural Engineer: Tom Lee`}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
