"use client";

import { use, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  ChevronLeft,
  Eye,
  Download,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { calcProgress } from "@/lib/progress";
import { SectionA } from "@/components/sections/SectionA";
import { SectionB } from "@/components/sections/SectionB";
import { SectionC } from "@/components/sections/SectionC";
import { SectionD } from "@/components/sections/SectionD";
import { SectionE } from "@/components/sections/SectionE";
import { SectionF } from "@/components/sections/SectionF";
import { SectionG } from "@/components/sections/SectionG";
import { SectionH } from "@/components/sections/SectionH";

const SECTIONS = [
  { key: "A", label: "Contract Information" },
  { key: "B", label: "A-E Point of Contact" },
  { key: "C", label: "Proposed Team" },
  { key: "D", label: "Organizational Chart" },
  { key: "E", label: "Key Personnel Resumes" },
  { key: "F", label: "Example Projects" },
  { key: "G", label: "Participation Matrix" },
  { key: "H", label: "Additional Information" },
];

export default function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getDoc, updateDoc } = useStore();
  const [activeSection, setActiveSection] = useState("A");
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const doc = hydrated ? getDoc(id) : undefined;

  useEffect(() => {
    if (doc) {
      setNameValue(doc.name);
    }
  }, [doc?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNameBlur = useCallback(() => {
    if (nameValue.trim() && doc) {
      updateDoc(id, { name: nameValue.trim() });
    }
    setEditingName(false);
  }, [nameValue, doc, id, updateDoc]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Document not found.</p>
        <Button onClick={() => router.push("/")} variant="outline">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const progress = calcProgress(doc);

  const isSectionFilled = (key: string) => {
    switch (key) {
      case "A":
        return !!(
          doc.sectionA.title ||
          doc.sectionA.contractNumber ||
          doc.sectionA.date
        );
      case "B":
        return !!(doc.sectionB.name || doc.sectionB.firm);
      case "C":
        return doc.sectionC.firms.length > 0;
      case "D":
        return !!(doc.sectionD.imageDataUrl || doc.sectionD.textDescription);
      case "E":
        return doc.sectionE.personnel.length > 0;
      case "F":
        return doc.sectionF.projects.length > 0;
      case "G":
        return Object.values(doc.sectionG.matrix).some((row) =>
          Object.values(row).some(Boolean)
        );
      case "H":
        return !!doc.sectionH.additionalInfo;
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="border-b bg-white z-10 shrink-0">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold hidden sm:block">
              SF 330 Builder
            </span>
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          {editingName ? (
            <input
              autoFocus
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
              className="text-sm font-medium flex-1 border-b border-primary outline-none bg-transparent"
            />
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="text-sm font-medium truncate max-w-xs hover:text-primary transition-colors"
            >
              {doc.name}
            </button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {progress}% complete
            </span>
            <Progress value={progress} className="w-20 h-1.5 hidden sm:block" />
            <Link href={`/preview/${id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-3.5 w-3.5 mr-1" />
                Preview
              </Button>
            </Link>
            <Link href={`/export/${id}`}>
              <Button size="sm">
                <Download className="h-3.5 w-3.5 mr-1" />
                Export PDF
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r bg-white shrink-0 overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            {SECTIONS.map((section) => {
              const filled = isSectionFilled(section.key);
              const active = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors text-left ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {filled ? (
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${
                        active ? "text-primary-foreground" : "text-green-600"
                      }`}
                    />
                  ) : (
                    <Circle
                      className={`h-4 w-4 shrink-0 ${
                        active
                          ? "text-primary-foreground/60"
                          : "text-muted-foreground"
                      }`}
                    />
                  )}
                  <span className="leading-snug">
                    <span className="font-semibold">
                      {section.key}
                    </span>{" "}
                    <span className={active ? "" : "text-muted-foreground text-xs"}>
                      {section.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === "A" && (
            <SectionA
              data={doc.sectionA}
              onChange={(v) => updateDoc(id, { sectionA: v })}
            />
          )}
          {activeSection === "B" && (
            <SectionB
              data={doc.sectionB}
              onChange={(v) => updateDoc(id, { sectionB: v })}
            />
          )}
          {activeSection === "C" && (
            <SectionC
              data={doc.sectionC}
              onChange={(v) => updateDoc(id, { sectionC: v })}
            />
          )}
          {activeSection === "D" && (
            <SectionD
              data={doc.sectionD}
              onChange={(v) => updateDoc(id, { sectionD: v })}
            />
          )}
          {activeSection === "E" && (
            <SectionE
              data={doc.sectionE}
              onChange={(v) => updateDoc(id, { sectionE: v })}
            />
          )}
          {activeSection === "F" && (
            <SectionF
              data={doc.sectionF}
              onChange={(v) => updateDoc(id, { sectionF: v })}
            />
          )}
          {activeSection === "G" && (
            <SectionG
              doc={doc}
              onChange={(v) => updateDoc(id, { sectionG: v })}
            />
          )}
          {activeSection === "H" && (
            <SectionH
              data={doc.sectionH}
              onChange={(v) => updateDoc(id, { sectionH: v })}
            />
          )}
        </main>
      </div>
    </div>
  );
}
