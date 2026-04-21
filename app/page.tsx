"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus, MoreVertical, Copy, Trash2, Eye, Edit3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore, isDemo } from "@/lib/store";
import { DEMO_DOC, DEMO_DOC_ID } from "@/lib/demo";
import { calcProgress } from "@/lib/progress";
import { IdentityPopover } from "@/components/identity-popover";
import { Seal } from "@/components/ui-editorial/Seal";
import { Kicker } from "@/components/ui-editorial/Kicker";
import { DisplayHeading } from "@/components/ui-editorial/DisplayHeading";
import { ProgressRing } from "@/components/ui-editorial/ProgressRing";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const { docs, createDoc, deleteDoc, duplicateDoc, injectDemo } = useStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Inject demo on first hydration if not dismissed and not present
  useEffect(() => {
    if (hydrated) {
      injectDemo(DEMO_DOC);
    }
  }, [hydrated, injectDemo]);

  const handleNewDoc = () => {
    const name = `SF 330 — ${format(new Date(), "MMM d, yyyy")}`;
    const id = createDoc(name);
    router.push(`/builder/${id}`);
  };

  const handleDelete = (id: string, name: string) => {
    deleteDoc(id);
    toast.success(`"${name}" deleted`);
  };

  const handleDuplicate = (id: string) => {
    const newId = duplicateDoc(id);
    if (newId) {
      toast.success("Document duplicated");
      router.push(`/builder/${newId}`);
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--paper)]">
        <div className="text-[var(--muted-foreground)] text-sm font-mono">Loading…</div>
      </div>
    );
  }

  const demoDoc = docs.find((d) => d.id === DEMO_DOC_ID);
  const userDocs = docs.filter((d) => d.id !== DEMO_DOC_ID);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)]">
      {/* Nav bar */}
      <header className="border-b border-[var(--border)] bg-[var(--paper)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Seal size={28} />
            <span className="font-serif font-medium text-base text-[var(--ink)] tracking-tight italic">
              SF 330
            </span>
          </div>
          <div className="flex items-center gap-4">
            <IdentityPopover />
            <button
              onClick={handleNewDoc}
              className="text-xs font-medium border border-[var(--ink)] text-[var(--ink)] px-3 py-1.5 hover:bg-[var(--brass)] hover:border-[var(--brass)] hover:text-[var(--paper)] transition-colors"
            >
              <Plus className="h-3.5 w-3.5 inline mr-1 -mt-0.5" />
              New submission
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Hero block */}
        <div className="mb-12 pb-10 border-b border-[var(--border)]">
          <Kicker className="mb-3">U.S. General Services Administration · OMB 9000-0157</Kicker>
          <DisplayHeading className="mb-3 leading-tight">
            Architect-Engineer<br />Qualifications
          </DisplayHeading>
          <p className="text-[var(--muted-foreground)] font-serif italic text-lg max-w-lg">
            Draft, preview, and export Standard Form 330 Part I submissions.
          </p>
          <button
            onClick={handleNewDoc}
            className="mt-6 text-sm border border-[var(--ink)] text-[var(--ink)] px-4 py-2 hover:bg-[var(--brass)] hover:border-[var(--brass)] hover:text-[var(--paper)] transition-colors"
          >
            Start new submission
          </button>
        </div>

        {/* Featured demo card */}
        {demoDoc && (
          <div className="mb-10">
            <Kicker className="mb-4">Featured Example</Kicker>
            <div
              className="border border-[var(--border)] bg-[var(--card)] p-8 flex flex-col md:flex-row gap-8 items-start cursor-pointer hover:border-[var(--brass-soft)] transition-colors card-animate"
              style={{ animationDelay: "0ms" }}
              onClick={() => router.push(`/builder/${demoDoc.id}`)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <Seal size={36} />
                  <div>
                    <Kicker>Demo Document</Kicker>
                  </div>
                </div>
                <h2 className="font-serif text-2xl font-medium text-[var(--ink)] mb-2 leading-snug">
                  {demoDoc.name}
                </h2>
                <p className="font-serif italic text-[var(--muted-foreground)] text-sm leading-relaxed max-w-md">
                  A complete SF 330 Part I submission for VA Office of General Counsel medical-legal expert witness services — featuring five board-certified specialists across neurology, plastic surgery, pathology, and legal operations.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/preview/${demoDoc.id}`);
                    }}
                    className="text-xs font-medium border border-[var(--brass)] text-[var(--brass-ink)] px-3 py-1.5 hover:bg-[var(--brass)] hover:text-[var(--paper)] transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5 inline mr-1 -mt-0.5" />
                    View example
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/builder/${demoDoc.id}`);
                    }}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--ink)] transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 inline mr-1 -mt-0.5" />
                    Open in builder
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <ProgressRing value={calcProgress(demoDoc)} size={56} />
                <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase tracking-widest">
                  {format(new Date(demoDoc.updatedAt), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* User documents grid */}
        {userDocs.length > 0 && (
          <div>
            <Kicker className="mb-4">Your Drafts</Kicker>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userDocs.map((doc, i) => {
                const progress = calcProgress(doc);
                return (
                  <div
                    key={doc.id}
                    className="group border border-[var(--border)] bg-[var(--card)] p-5 cursor-pointer card-animate"
                    style={{
                      animationDelay: `${i * 60}ms`,
                      transition: "transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = "0 4px 16px rgba(11,18,32,0.06)";
                      el.style.borderColor = "var(--brass-soft)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                      el.style.borderColor = "var(--border)";
                    }}
                    onClick={() => router.push(`/builder/${doc.id}`)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-serif font-normal text-[var(--ink)] text-base leading-snug truncate max-w-[calc(100%-2.5rem)]">
                        {doc.name}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center hover:bg-[var(--muted)]"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <DropdownMenuItem
                            onClick={() => router.push(`/builder/${doc.id}`)}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/preview/${doc.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicate(doc.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(doc.id, doc.name)}
                            variant="destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {doc.sectionA.contractNumber && (
                      <p className="text-xs font-mono text-[var(--muted-foreground)] mb-1 truncate">
                        {doc.sectionA.contractNumber}
                      </p>
                    )}
                    {doc.sectionA.title && (
                      <p className="text-xs text-[var(--muted-foreground)] truncate mb-3">
                        {doc.sectionA.title}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--muted)]">
                      <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase tracking-widest">
                        {format(new Date(doc.updatedAt), "MMM d, yyyy")}
                      </span>
                      <ProgressRing value={progress} size={36} />
                    </div>
                  </div>
                );
              })}

              {/* New doc card */}
              <button
                onClick={handleNewDoc}
                className="border border-dashed border-[var(--border)] p-6 flex flex-col items-center justify-center gap-2 text-[var(--muted-foreground)] hover:border-[var(--brass)] hover:text-[var(--brass)] transition-colors min-h-[160px]"
                style={{ transition: "border-color 200ms ease-out, color 200ms ease-out" }}
              >
                <Plus className="h-6 w-6" />
                <span className="text-xs font-medium uppercase tracking-widest">New SF 330</span>
              </button>
            </div>
          </div>
        )}

        {/* If no user docs, just show the new doc button below demo */}
        {userDocs.length === 0 && (
          <div className="mt-2">
            <Kicker className="mb-4">Your Drafts</Kicker>
            <button
              onClick={handleNewDoc}
              className="border border-dashed border-[var(--border)] p-8 flex flex-col items-center justify-center gap-2 text-[var(--muted-foreground)] hover:border-[var(--brass)] hover:text-[var(--brass)] transition-colors w-full max-w-xs"
            >
              <Plus className="h-6 w-6" />
              <span className="text-xs font-medium uppercase tracking-widest">Start your first SF 330</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
