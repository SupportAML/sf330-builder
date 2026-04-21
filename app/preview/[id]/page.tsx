"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { useStore } from "@/lib/store";
import type { SF330Doc } from "@/lib/types";

function SectionHeader({ letter, title }: { letter: string; title: string }) {
  return (
    <div className="bg-[var(--ink)] text-[var(--paper)] px-5 py-2 flex items-center gap-3 mt-8 first:mt-0">
      <span
        className="font-serif italic text-base text-[var(--brass-soft)]"
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
      >
        {letter}
      </span>
      <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[var(--paper)]/70">
        — {title}
      </span>
    </div>
  );
}

function DiamondDivider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-[var(--brass-soft)]/30" />
      <span style={{ fontSize: "8px", color: "var(--brass-soft)", opacity: 0.6 }}>◆</span>
      <div className="flex-1 h-px bg-[var(--brass-soft)]/30" />
    </div>
  );
}

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="mb-2">
      <span
        className="text-[10px] font-medium uppercase tracking-[0.14em]"
        style={{ color: "var(--brass-ink)" }}
      >
        {label}:{" "}
      </span>
      <span
        className="text-xs text-[var(--ink)]"
        style={mono ? { fontFamily: "var(--font-mono), monospace", whiteSpace: "pre-wrap" } : {}}
      >
        {value}
      </span>
    </div>
  );
}

function PreviewContent({ doc }: { doc: SF330Doc }) {
  return (
    <div
      className="text-[var(--ink)] font-sans text-sm leading-snug max-w-[816px] mx-auto border border-[var(--border)]"
      style={{
        background: "#FFFDF7",
        boxShadow: "0 4px 32px rgba(11,18,32,0.08)",
      }}
    >
      {/* Cover header */}
      <div className="px-8 pt-8 pb-5" style={{ borderBottom: "1.5px solid var(--ink)" }}>
        <div className="text-center">
          <p
            className="text-[10px] uppercase tracking-[0.2em] mb-2"
            style={{ color: "var(--brass-ink)" }}
          >
            OMB No. 9000-0157
          </p>
          <h1
            className="text-xl font-medium uppercase tracking-[0.06em] mb-1"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              color: "var(--ink)",
            }}
          >
            Architect-Engineer Qualifications
          </h1>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Standard Form 330 · Part I · Contract-Specific Qualifications
          </p>
          <div className="mt-4 h-px bg-[var(--brass-soft)]/40" />
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Section A */}
        <SectionHeader letter="A" title="Contract Information" />
        <div className="py-3 space-y-1">
          <Field label="1. Title" value={doc.sectionA.title} />
          <Field label="2. Contract No." value={doc.sectionA.contractNumber} />
          <Field label="3. Solicitation No." value={doc.sectionA.solicitationNumber} />
          <Field label="4. Date Prepared" value={doc.sectionA.date} />
        </div>

        <DiamondDivider />

        {/* Section B */}
        <SectionHeader letter="B" title="Architect-Engineer Point of Contact" />
        <div className="py-3 space-y-1">
          <Field label="5. Name" value={doc.sectionB.name} />
          <Field label="6. Title" value={doc.sectionB.title} />
          <Field label="7. Firm" value={doc.sectionB.firm} />
          <Field label="8. Address" value={doc.sectionB.address} />
          <div className="flex gap-8">
            <Field label="9. Phone" value={doc.sectionB.phone} />
            <Field label="10. Fax" value={doc.sectionB.fax} />
          </div>
          <Field label="11. Email" value={doc.sectionB.email} />
        </div>

        <DiamondDivider />

        {/* Section C */}
        <SectionHeader letter="C" title="Proposed Team" />
        <div className="py-3">
          {doc.sectionC.firms.length === 0 ? (
            <p className="text-xs text-[var(--muted-foreground)] italic">No firms listed.</p>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ background: "var(--muted)" }}>
                  <th className="px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--brass-ink)]">#</th>
                  <th className="px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--brass-ink)]">Role</th>
                  <th className="px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--brass-ink)]">Firm Name</th>
                  <th className="px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--brass-ink)]">Address</th>
                  <th className="px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--brass-ink)]">Branch?</th>
                </tr>
              </thead>
              <tbody>
                {doc.sectionC.firms.map((firm, i) => (
                  <tr
                    key={firm.id}
                    style={{
                      background: i % 2 === 0 ? "transparent" : "var(--muted)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <td className="px-2 py-1.5 text-[var(--muted-foreground)]">C-{i + 1}</td>
                    <td className="px-2 py-1.5">{firm.role}</td>
                    <td className="px-2 py-1.5">{firm.name}</td>
                    <td className="px-2 py-1.5 whitespace-pre-line">{firm.address}</td>
                    <td className="px-2 py-1.5 text-center">{firm.checkIfBranch ? "Yes" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <DiamondDivider />

        {/* Section D */}
        <SectionHeader letter="D" title="Organizational Chart" />
        <div className="py-3">
          {doc.sectionD.imageDataUrl ? (
            <img src={doc.sectionD.imageDataUrl} alt="Org chart" className="max-w-full border border-[var(--border)]" />
          ) : doc.sectionD.textDescription ? (
            <pre
              className="text-xs whitespace-pre-wrap text-[var(--ink)]"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              {doc.sectionD.textDescription}
            </pre>
          ) : (
            <p className="text-xs text-[var(--muted-foreground)] italic">No org chart provided.</p>
          )}
        </div>

        <DiamondDivider />

        {/* Section E */}
        <SectionHeader letter="E" title="Resumes of Key Personnel" />
        <div className="py-3">
          {doc.sectionE.personnel.length === 0 ? (
            <p className="text-xs text-[var(--muted-foreground)] italic">No personnel listed.</p>
          ) : (
            doc.sectionE.personnel.map((person, pi) => (
              <div
                key={person.id}
                className={`mb-6 ${pi > 0 ? "pt-4 border-t border-[var(--border)]" : ""}`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <p
                    className="text-sm font-medium"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "var(--ink)" }}
                  >
                    {person.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--brass-ink)" }}>{person.role}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                  <Field label="Firm" value={person.firm} />
                  <Field label="Years Total" value={String(person.yearsTotal)} />
                  <Field label="Years w/ Firm" value={String(person.yearsFirm)} />
                </div>
                {person.education && (
                  <div className="mb-1">
                    <p className="text-[10px] uppercase tracking-[0.14em] mb-0.5" style={{ color: "var(--brass-ink)" }}>
                      Education:
                    </p>
                    <pre className="text-xs whitespace-pre-wrap text-[var(--ink)]" style={{ fontFamily: "inherit" }}>
                      {person.education}
                    </pre>
                  </div>
                )}
                {person.registration && (
                  <div className="mb-1">
                    <p className="text-[10px] uppercase tracking-[0.14em] mb-0.5" style={{ color: "var(--brass-ink)" }}>
                      Registrations:
                    </p>
                    <pre className="text-xs whitespace-pre-wrap text-[var(--ink)]" style={{ fontFamily: "inherit" }}>
                      {person.registration}
                    </pre>
                  </div>
                )}
                {person.otherQualifications && (
                  <div className="mb-1">
                    <p className="text-[10px] uppercase tracking-[0.14em] mb-0.5" style={{ color: "var(--brass-ink)" }}>
                      Other Qualifications:
                    </p>
                    <p className="text-xs text-[var(--ink)]">{person.otherQualifications}</p>
                  </div>
                )}
                {person.relevantProjects.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--brass-ink)" }}>
                      Relevant Projects:
                    </p>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr style={{ background: "var(--muted)" }}>
                          {["Title", "Location", "Yr (Des.)", "Yr (Con.)", "Cost", "Fee", "Role"].map((h) => (
                            <th key={h} className="px-1.5 py-1 text-left text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--brass-ink)" }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {person.relevantProjects.map((proj, ri) => (
                          <tr key={proj.id} style={{ borderBottom: "1px solid var(--border)", background: ri % 2 === 0 ? "transparent" : "var(--muted)" }}>
                            <td className="px-1.5 py-1">{proj.title}</td>
                            <td className="px-1.5 py-1">{proj.location}</td>
                            <td className="px-1.5 py-1">{proj.yearCompleted}</td>
                            <td className="px-1.5 py-1">{proj.yearConstruction}</td>
                            <td className="px-1.5 py-1">{proj.cost}</td>
                            <td className="px-1.5 py-1">{proj.fee}</td>
                            <td className="px-1.5 py-1">{proj.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {person.relevantProjects.map(
                      (proj) =>
                        proj.scope && (
                          <div key={`scope-${proj.id}`} className="mt-1 text-xs">
                            <span className="font-medium text-[var(--brass-ink)]">{proj.title}: </span>
                            <span className="text-[var(--ink)]">{proj.scope}</span>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <DiamondDivider />

        {/* Section F */}
        <SectionHeader letter="F" title="Example Projects" />
        <div className="py-3">
          {doc.sectionF.projects.length === 0 ? (
            <p className="text-xs text-[var(--muted-foreground)] italic">No projects listed.</p>
          ) : (
            doc.sectionF.projects.map((proj, pi) => (
              <div
                key={proj.id}
                className={`mb-5 ${pi > 0 ? "pt-4 border-t border-[var(--border)]" : ""}`}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <p
                    className="text-sm font-medium"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "var(--ink)" }}
                  >
                    F-{pi + 1}. {proj.title}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <Field label="Location" value={proj.location} />
                  <Field label="Owner" value={proj.projectOwner} />
                  <Field label="Year Completed (Design)" value={proj.yearCompleted} />
                  <Field label="Year Completed (Construction)" value={proj.yearConstructionCompleted} />
                  <Field label="Point of Contact" value={proj.pointOfContact} />
                  <Field label="POC Phone" value={proj.pointOfContactPhone} />
                </div>
                {proj.briefDescription && (
                  <div className="text-xs mb-2">
                    <p className="text-[10px] uppercase tracking-[0.14em] mb-0.5" style={{ color: "var(--brass-ink)" }}>
                      Description:
                    </p>
                    <p className="text-[var(--ink)]">{proj.briefDescription}</p>
                  </div>
                )}
                {proj.firmsInvolved.length > 0 && (
                  <div className="text-xs">
                    <p className="text-[10px] uppercase tracking-[0.14em] mb-0.5" style={{ color: "var(--brass-ink)" }}>
                      Firms Involved:
                    </p>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr style={{ background: "var(--muted)" }}>
                          {["Firm", "Role", "Location"].map((h) => (
                            <th key={h} className="px-1.5 py-1 text-left text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--brass-ink)" }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {proj.firmsInvolved.map((f, fi) => (
                          <tr key={f.id} style={{ borderBottom: "1px solid var(--border)", background: fi % 2 === 0 ? "transparent" : "var(--muted)" }}>
                            <td className="px-1.5 py-1">{f.firmName}</td>
                            <td className="px-1.5 py-1">{f.role}</td>
                            <td className="px-1.5 py-1">{f.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <DiamondDivider />

        {/* Section G */}
        <SectionHeader letter="G" title="Key Personnel Participation Matrix" />
        <div className="py-3">
          {doc.sectionE.personnel.length === 0 || doc.sectionF.projects.length === 0 ? (
            <p className="text-xs text-[var(--muted-foreground)] italic">
              Matrix not available (add personnel and projects).
            </p>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ background: "var(--muted)" }}>
                  <th className="px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--brass-ink)" }}>
                    Personnel
                  </th>
                  {doc.sectionF.projects.map((proj, i) => (
                    <th
                      key={proj.id}
                      className="px-1 py-1.5 text-center text-[10px] uppercase tracking-[0.12em]"
                      style={{ color: "var(--brass-ink)" }}
                    >
                      F-{i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doc.sectionE.personnel.map((person, pi) => (
                  <tr
                    key={person.id}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: pi % 2 === 0 ? "transparent" : "var(--muted)",
                    }}
                  >
                    <td className="px-2 py-1.5 text-[var(--ink)]">{person.name}</td>
                    {doc.sectionF.projects.map((proj) => (
                      <td key={proj.id} className="px-1 py-1.5 text-center text-[var(--brass)]">
                        {doc.sectionG.matrix[person.id]?.[proj.id] ? "✓" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <DiamondDivider />

        {/* Section H */}
        <SectionHeader letter="H" title="Additional Information" />
        <div className="py-3">
          {doc.sectionH.additionalInfo ? (
            <p className="text-xs whitespace-pre-wrap text-[var(--ink)] leading-relaxed">
              {doc.sectionH.additionalInfo}
            </p>
          ) : (
            <p className="text-xs text-[var(--muted-foreground)] italic">None provided.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoprint = searchParams.get("autoprint") === "1";
  const { getDoc } = useStore();
  const [hydrated, setHydrated] = useState(false);
  const [doc, setDoc] = useState<SF330Doc | undefined>(undefined);

  useEffect(() => {
    setHydrated(true);
    const d = getDoc(id);
    setDoc(d);
  }, [id, getDoc]);

  useEffect(() => {
    if (hydrated && doc && autoprint) {
      const t = setTimeout(() => window.print(), 400);
      return () => clearTimeout(t);
    }
  }, [hydrated, doc, autoprint]);

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

  return (
    <>
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-10 bg-[var(--paper)] border-b border-[var(--border)] px-6 py-2.5 flex items-center gap-3">
        <Link href={`/builder/${id}`}>
          <button className="text-xs border border-[var(--border)] text-[var(--ink)] px-3 py-1.5 flex items-center gap-1.5 hover:border-[var(--ink)] transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Builder
          </button>
        </Link>
        <button
          className="ml-auto text-xs bg-[var(--ink)] text-[var(--paper)] px-3 py-1.5 flex items-center gap-1.5 hover:bg-[var(--ink-soft)] transition-colors"
          onClick={() => window.print()}
        >
          <Printer className="h-3.5 w-3.5" />
          Print / Save as PDF
        </button>
      </div>

      <div
        className="min-h-screen py-8 px-4"
        style={{ background: "var(--muted)" }}
      >
        <PreviewContent doc={doc} />
      </div>
    </>
  );
}
