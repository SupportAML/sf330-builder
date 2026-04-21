import type { SF330Doc } from "./types";

export function calcProgress(doc: SF330Doc): number {
  let filled = 0;
  const total = 8;

  // Section A
  const a = doc.sectionA;
  if (a.title || a.contractNumber || a.solicitationNumber || a.date) filled++;

  // Section B
  const b = doc.sectionB;
  if (b.name || b.firm || b.email) filled++;

  // Section C
  if (doc.sectionC.firms.length > 0) filled++;

  // Section D
  const d = doc.sectionD;
  if (d.imageDataUrl || d.textDescription) filled++;

  // Section E
  if (doc.sectionE.personnel.length > 0) filled++;

  // Section F
  if (doc.sectionF.projects.length > 0) filled++;

  // Section G
  const matrixEntries = Object.values(doc.sectionG.matrix).flatMap((v) =>
    Object.values(v)
  );
  if (matrixEntries.some(Boolean)) filled++;

  // Section H
  if (doc.sectionH.additionalInfo) filled++;

  return Math.round((filled / total) * 100);
}
