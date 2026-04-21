"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import type { SF330Doc } from "@/lib/types";

function SectionHeader({ letter, title }: { letter: string; title: string }) {
  return (
    <div className="bg-slate-900 text-white px-4 py-1.5 flex items-center gap-3 mt-8 first:mt-0">
      <span className="font-bold text-xs tracking-widest uppercase">
        Section {letter}
      </span>
      <span className="text-xs font-normal tracking-wide uppercase">
        — {title}
      </span>
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
      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}:{" "}
      </span>
      <span
        className={`text-xs text-black ${mono ? "font-mono whitespace-pre-wrap" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function PreviewContent({ doc }: { doc: SF330Doc }) {
  return (
    <div className="bg-white text-black font-serif text-sm leading-snug max-w-[816px] mx-auto shadow-sm border">
      {/* Cover header */}
      <div className="px-8 pt-6 pb-4 border-b-2 border-slate-900">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest font-sans text-gray-500 mb-1">
            OMB No. 9000-0157
          </p>
          <h1 className="text-lg font-bold uppercase tracking-wide font-sans">
            Architect-Engineer Qualifications
          </h1>
          <p className="text-sm uppercase tracking-wide font-sans">
            Standard Form 330 — Part I: Contract-Specific Qualifications
          </p>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Section A */}
        <SectionHeader letter="A" title="Contract Information" />
        <div className="py-3 space-y-1">
          <Field label="1. Title" value={doc.sectionA.title} />
          <Field
            label="2. Contract No."
            value={doc.sectionA.contractNumber}
          />
          <Field
            label="3. Solicitation No."
            value={doc.sectionA.solicitationNumber}
          />
          <Field label="4. Date Prepared" value={doc.sectionA.date} />
        </div>

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

        {/* Section C */}
        <SectionHeader letter="C" title="Proposed Team" />
        <div className="py-3">
          {doc.sectionC.firms.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No firms listed.</p>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-left font-semibold">
                    #
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-left font-semibold">
                    Role
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-left font-semibold">
                    Firm Name
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-left font-semibold">
                    Address
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-left font-semibold">
                    Branch?
                  </th>
                </tr>
              </thead>
              <tbody>
                {doc.sectionC.firms.map((firm, i) => (
                  <tr key={firm.id} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-2 py-1">
                      C-{i + 1}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {firm.role}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {firm.name}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 whitespace-pre-line">
                      {firm.address}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {firm.checkIfBranch ? "Yes" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Section D */}
        <SectionHeader letter="D" title="Organizational Chart" />
        <div className="py-3">
          {doc.sectionD.imageDataUrl ? (
            <img
              src={doc.sectionD.imageDataUrl}
              alt="Org chart"
              className="max-w-full border"
            />
          ) : doc.sectionD.textDescription ? (
            <pre className="text-xs font-mono whitespace-pre-wrap text-black">
              {doc.sectionD.textDescription}
            </pre>
          ) : (
            <p className="text-xs text-gray-400 italic">
              No org chart provided.
            </p>
          )}
        </div>

        {/* Section E */}
        <SectionHeader letter="E" title="Resumes of Key Personnel" />
        <div className="py-3">
          {doc.sectionE.personnel.length === 0 ? (
            <p className="text-xs text-gray-400 italic">
              No personnel listed.
            </p>
          ) : (
            doc.sectionE.personnel.map((person, pi) => (
              <div
                key={person.id}
                className={`mb-6 ${pi > 0 ? "pt-4 border-t border-gray-200" : ""}`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-bold text-sm font-sans">{person.name}</p>
                  <p className="text-xs text-gray-500 font-sans">
                    {person.role}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                  <Field label="Firm" value={person.firm} />
                  <Field
                    label="Years Total"
                    value={String(person.yearsTotal)}
                  />
                  <Field
                    label="Years w/ Firm"
                    value={String(person.yearsFirm)}
                  />
                </div>
                {person.education && (
                  <div className="mb-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-0.5">
                      Education:
                    </p>
                    <pre className="text-xs font-sans whitespace-pre-wrap">
                      {person.education}
                    </pre>
                  </div>
                )}
                {person.registration && (
                  <div className="mb-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-0.5">
                      Registrations:
                    </p>
                    <pre className="text-xs font-sans whitespace-pre-wrap">
                      {person.registration}
                    </pre>
                  </div>
                )}
                {person.otherQualifications && (
                  <div className="mb-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-0.5">
                      Other Qualifications:
                    </p>
                    <p className="text-xs">{person.otherQualifications}</p>
                  </div>
                )}
                {person.relevantProjects.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                      Relevant Projects:
                    </p>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Title
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Location
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Yr (Des.)
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Yr (Con.)
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Cost
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Fee
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Role
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {person.relevantProjects.map((proj) => (
                          <tr key={proj.id}>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {proj.title}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {proj.location}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {proj.yearCompleted}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {proj.yearConstruction}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {proj.cost}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {proj.fee}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {proj.role}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {person.relevantProjects.map(
                      (proj) =>
                        proj.scope && (
                          <div key={`scope-${proj.id}`} className="mt-1">
                            <span className="font-semibold">{proj.title}: </span>
                            <span>{proj.scope}</span>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Section F */}
        <SectionHeader letter="F" title="Example Projects" />
        <div className="py-3">
          {doc.sectionF.projects.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No projects listed.</p>
          ) : (
            doc.sectionF.projects.map((proj, pi) => (
              <div
                key={proj.id}
                className={`mb-5 ${pi > 0 ? "pt-4 border-t border-gray-200" : ""}`}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <p className="font-bold text-sm font-sans">
                    F-{pi + 1}. {proj.title}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <Field label="Location" value={proj.location} />
                  <Field label="Owner" value={proj.projectOwner} />
                  <Field label="Year Completed (Design)" value={proj.yearCompleted} />
                  <Field
                    label="Year Completed (Construction)"
                    value={proj.yearConstructionCompleted}
                  />
                  <Field label="Point of Contact" value={proj.pointOfContact} />
                  <Field label="POC Phone" value={proj.pointOfContactPhone} />
                </div>
                {proj.briefDescription && (
                  <div className="text-xs mb-2">
                    <p className="font-bold uppercase tracking-wide text-gray-500 mb-0.5">
                      Description:
                    </p>
                    <p>{proj.briefDescription}</p>
                  </div>
                )}
                {proj.firmsInvolved.length > 0 && (
                  <div className="text-xs">
                    <p className="font-bold uppercase tracking-wide text-gray-500 mb-0.5">
                      Firms Involved:
                    </p>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Firm
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Role
                          </th>
                          <th className="border border-gray-300 px-1.5 py-0.5 text-left">
                            Location
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {proj.firmsInvolved.map((f) => (
                          <tr key={f.id}>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {f.firmName}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {f.role}
                            </td>
                            <td className="border border-gray-300 px-1.5 py-0.5">
                              {f.location}
                            </td>
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

        {/* Section G */}
        <SectionHeader letter="G" title="Key Personnel Participation Matrix" />
        <div className="py-3">
          {doc.sectionE.personnel.length === 0 ||
          doc.sectionF.projects.length === 0 ? (
            <p className="text-xs text-gray-400 italic">
              Matrix not available (add personnel and projects).
            </p>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1 text-left bg-gray-100">
                    Personnel
                  </th>
                  {doc.sectionF.projects.map((proj, i) => (
                    <th
                      key={proj.id}
                      className="border border-gray-300 px-1 py-1 text-center bg-gray-100"
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
                    className={pi % 2 === 0 ? "" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-2 py-1">
                      {person.name}
                    </td>
                    {doc.sectionF.projects.map((proj) => (
                      <td
                        key={proj.id}
                        className="border border-gray-300 px-1 py-1 text-center"
                      >
                        {doc.sectionG.matrix[person.id]?.[proj.id] ? "✓" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Section H */}
        <SectionHeader letter="H" title="Additional Information" />
        <div className="py-3">
          {doc.sectionH.additionalInfo ? (
            <p className="text-xs whitespace-pre-wrap">
              {doc.sectionH.additionalInfo}
            </p>
          ) : (
            <p className="text-xs text-gray-400 italic">None provided.</p>
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

  return (
    <>
      {/* Toolbar — hidden on print */}
      <div className="no-print sticky top-0 z-10 bg-white border-b px-4 py-2 flex items-center gap-3">
        <Link href={`/builder/${id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Back to Builder
          </Button>
        </Link>
        <Button
          size="sm"
          onClick={() => window.print()}
          className="ml-auto"
        >
          <Printer className="h-3.5 w-3.5 mr-1" />
          Print / Save as PDF
        </Button>
      </div>

      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <PreviewContent doc={doc} />
      </div>
    </>
  );
}
