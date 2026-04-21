"use client";

import { use, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, Printer } from "lucide-react";
import { useStore, isDemo } from "@/lib/store";
import { calcProgress } from "@/lib/progress";
import { SectionA } from "@/components/sections/SectionA";
import { SectionB } from "@/components/sections/SectionB";
import { SectionC } from "@/components/sections/SectionC";
import { SectionD } from "@/components/sections/SectionD";
import { SectionE } from "@/components/sections/SectionE";
import { SectionF } from "@/components/sections/SectionF";
import { SectionG } from "@/components/sections/SectionG";
import { SectionH } from "@/components/sections/SectionH";
import { Seal } from "@/components/ui-editorial/Seal";
import { Kicker } from "@/components/ui-editorial/Kicker";
import { DisplayHeading } from "@/components/ui-editorial/DisplayHeading";

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

const SECTION_SUBTITLES: Record<string, string> = {
  A: "Project title, contract number, and solicitation reference.",
  B: "Primary point of contact for this submission.",
  C: "All firms participating in the proposed team.",
  D: "Organizational chart showing team structure and reporting.",
  E: "Resumes and relevant project history for key personnel.",
  F: "Example projects demonstrating relevant experience.",
  G: "Personnel participation across example projects.",
  H: "Any additional information relevant to this submission.",
};

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
      <div className="min-h-screen flex items-center justify-center bg-[var(--paper)]">
        <div className="text-[var(--muted-foreground)] text-sm font-mono">Loading…</div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--paper)]">
        <p className="text-[var(--muted-foreground)] font-serif italic">Document not found.</p>
        <button
          onClick={() => router.push("/")}
          className="text-xs border border-[var(--ink)] text-[var(--ink)] px-4 py-2 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const progress = calcProgress(doc);
  const demo = isDemo(id);

  const isSectionFilled = (key: string) => {
    switch (key) {
      case "A":
        return !!(doc.sectionA.title || doc.sectionA.contractNumber || doc.sectionA.date);
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
    <div className="flex flex-col h-screen bg-[var(--paper)]">
      {/* Top bar */}
      <header className="border-b border-[var(--border)] bg-[var(--paper)] z-10 shrink-0">
        <div className="flex items-center gap-4 px-5 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Seal size={24} />
            <span className="font-serif italic text-sm font-medium text-[var(--ink)] hidden sm:block">
              SF 330
            </span>
          </Link>

          {/* Separator */}
          <div className="h-5 w-px bg-[var(--border)] shrink-0" />

          {/* Editable doc title */}
          {editingName ? (
            <input
              autoFocus
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
              className="font-serif italic text-sm flex-1 border-b border-[var(--brass)] outline-none bg-transparent text-[var(--ink)] max-w-md"
            />
          ) : (
            <button
              onClick={() => !demo && setEditingName(true)}
              className={`font-serif italic text-sm truncate max-w-xs text-[var(--ink)] ${!demo ? "hover:text-[var(--brass-ink)] transition-colors" : "cursor-default"}`}
            >
              {doc.name}
            </button>
          )}

          {/* Section stepper dots */}
          <div className="ml-auto hidden sm:flex items-center gap-1.5 mr-3">
            {SECTIONS.map((s) => {
              const filled = isSectionFilled(s.key);
              const active = activeSection === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  title={s.label}
                  className={`w-2 h-2 rounded-full transition-all ${
                    active
                      ? "bg-[var(--brass)] scale-125"
                      : filled
                      ? "bg-[var(--brass-soft)]"
                      : "bg-[var(--border)] hover:bg-[var(--muted-foreground)]"
                  }`}
                />
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href={`/preview/${id}`}>
              <button className="text-xs border border-[var(--border)] text-[var(--ink)] px-3 py-1.5 hover:border-[var(--ink)] transition-colors flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </button>
            </Link>
            <Link href={`/export/${id}`}>
              <button className="text-xs bg-[var(--ink)] text-[var(--paper)] px-3 py-1.5 hover:bg-[var(--ink-soft)] transition-colors flex items-center gap-1.5">
                <Printer className="h-3.5 w-3.5" />
                Print PDF
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — book ToC style */}
        <aside className="w-52 border-r border-[var(--border)] bg-[var(--paper)] shrink-0 overflow-y-auto">
          <div className="pt-5 pb-3 px-4">
            <Kicker>Part I</Kicker>
          </div>
          <nav className="pb-4">
            {SECTIONS.map((section) => {
              const filled = isSectionFilled(section.key);
              const active = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors relative ${
                    active
                      ? "bg-[var(--muted)] text-[var(--ink)]"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/50 hover:text-[var(--ink)]"
                  }`}
                  style={{
                    borderLeft: active ? "2px solid var(--brass)" : "2px solid transparent",
                    transition: "border-color 150ms ease, background-color 150ms ease",
                  }}
                >
                  <span
                    className={`font-serif italic text-lg leading-none w-5 shrink-0 ${
                      active ? "text-[var(--brass)]" : filled ? "text-[var(--brass-soft)]" : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    {section.key}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.12em] font-medium leading-tight truncate">
                      {section.label}
                    </span>
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 border ${
                      filled
                        ? "bg-[var(--brass)] border-[var(--brass)]"
                        : "bg-transparent border-[var(--border)]"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Progress indicator at bottom */}
          <div className="px-4 pb-4 border-t border-[var(--border)] pt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase tracking-widest">Progress</span>
              <span className="text-[10px] font-mono text-[var(--brass-ink)]">{progress}%</span>
            </div>
            <div className="h-px bg-[var(--border)] relative">
              <div
                className="h-px bg-[var(--brass)] absolute top-0 left-0 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[var(--background)]">
          {/* Section header */}
          <div className="mb-8 pb-6 border-b border-[var(--border)]">
            <Kicker className="mb-2">Section {activeSection}</Kicker>
            <DisplayHeading as="h2" className="text-3xl md:text-4xl mb-2">
              {SECTIONS.find((s) => s.key === activeSection)?.label}
            </DisplayHeading>
            <p className="font-serif italic text-[var(--muted-foreground)] text-base">
              {SECTION_SUBTITLES[activeSection]}
            </p>
          </div>

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
