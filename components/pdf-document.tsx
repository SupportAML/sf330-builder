"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { SF330Doc } from "@/lib/types";

// Register fonts (use built-in Helvetica to avoid network calls)
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    color: "#000",
  },
  coverTitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  coverH1: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  coverSub: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  coverOmb: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#666",
    marginBottom: 4,
  },
  sectionBand: {
    backgroundColor: "#1e293b",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 14,
    marginBottom: 6,
    flexDirection: "row",
    gap: 8,
  },
  sectionBandLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#fff",
  },
  sectionBandTitle: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#555",
    width: 110,
    flexShrink: 0,
  },
  value: {
    fontSize: 9,
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #d1d5db",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #e5e7eb",
  },
  tableCell: {
    padding: "3 4",
    fontSize: 8,
    flex: 1,
  },
  tableCellBold: {
    padding: "3 4",
    fontSize: 8,
    flex: 1,
    fontFamily: "Helvetica-Bold",
  },
  divider: {
    borderBottom: "0.5px solid #d1d5db",
    marginVertical: 6,
  },
  personName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 2,
  },
  personRole: {
    fontSize: 8,
    color: "#555",
    marginBottom: 4,
  },
  sectionBodyText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
    color: "#888",
  },
  mono: {
    fontFamily: "Courier",
    fontSize: 8,
  },
});

function SBand({ letter, title }: { letter: string; title: string }) {
  return (
    <View style={styles.sectionBand} wrap={false}>
      <Text style={styles.sectionBandLabel}>Section {letter}</Text>
      <Text style={styles.sectionBandTitle}>— {title}</Text>
    </View>
  );
}

function FieldRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (!value && value !== 0) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

export function SF330PdfDocument({ doc }: { doc: SF330Doc }) {
  return (
    <Document
      title={doc.name}
      author="SF 330 Builder"
      subject="SF 330 Part I — Contract-Specific Qualifications"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Cover */}
        <View style={styles.coverTitle}>
          <Text style={styles.coverOmb}>OMB No. 9000-0157</Text>
          <Text style={styles.coverH1}>Architect-Engineer Qualifications</Text>
          <Text style={styles.coverSub}>
            Standard Form 330 — Part I: Contract-Specific Qualifications
          </Text>
        </View>

        {/* Section A */}
        <SBand letter="A" title="Contract Information" />
        <FieldRow label="1. Title" value={doc.sectionA.title} />
        <FieldRow label="2. Contract No." value={doc.sectionA.contractNumber} />
        <FieldRow
          label="3. Solicitation No."
          value={doc.sectionA.solicitationNumber}
        />
        <FieldRow label="4. Date Prepared" value={doc.sectionA.date} />

        {/* Section B */}
        <SBand letter="B" title="A-E Point of Contact" />
        <FieldRow label="5. Name" value={doc.sectionB.name} />
        <FieldRow label="6. Title" value={doc.sectionB.title} />
        <FieldRow label="7. Firm" value={doc.sectionB.firm} />
        <FieldRow label="8. Address" value={doc.sectionB.address} />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <FieldRow label="9. Phone" value={doc.sectionB.phone} />
          </View>
          <View style={{ flex: 1 }}>
            <FieldRow label="10. Fax" value={doc.sectionB.fax} />
          </View>
        </View>
        <FieldRow label="11. Email" value={doc.sectionB.email} />

        {/* Section C */}
        <SBand letter="C" title="Proposed Team" />
        {doc.sectionC.firms.length === 0 ? (
          <Text style={styles.italic}>No firms listed.</Text>
        ) : (
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellBold, { flex: 0.3 }]}>#</Text>
              <Text style={[styles.tableCellBold, { flex: 0.8 }]}>Role</Text>
              <Text style={[styles.tableCellBold, { flex: 1.5 }]}>Firm</Text>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>Address</Text>
              <Text style={[styles.tableCellBold, { flex: 0.6 }]}>Branch?</Text>
            </View>
            {doc.sectionC.firms.map((firm, i) => (
              <View key={firm.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.3 }]}>C-{i + 1}</Text>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>{firm.role}</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>{firm.name}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{firm.address}</Text>
                <Text style={[styles.tableCell, { flex: 0.6 }]}>
                  {firm.checkIfBranch ? "Yes" : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Section D */}
        <SBand letter="D" title="Organizational Chart" />
        {doc.sectionD.textDescription ? (
          <Text style={styles.mono}>{doc.sectionD.textDescription}</Text>
        ) : (
          <Text style={styles.italic}>
            {doc.sectionD.imageDataUrl
              ? "[Org chart image — see HTML preview for image]"
              : "No org chart provided."}
          </Text>
        )}

        {/* Section E */}
        <SBand letter="E" title="Resumes of Key Personnel" />
        {doc.sectionE.personnel.length === 0 ? (
          <Text style={styles.italic}>No personnel listed.</Text>
        ) : (
          doc.sectionE.personnel.map((person, pi) => (
            <View key={person.id} wrap={false}>
              {pi > 0 && <View style={styles.divider} />}
              <Text style={styles.personName}>{person.name}</Text>
              <Text style={styles.personRole}>{person.role}</Text>
              <View style={{ flexDirection: "row", gap: 24, marginBottom: 4 }}>
                <FieldRow label="Firm" value={person.firm} />
                <FieldRow label="Years Total" value={String(person.yearsTotal)} />
                <FieldRow label="Years w/ Firm" value={String(person.yearsFirm)} />
              </View>
              {person.education && (
                <FieldRow label="Education" value={person.education} />
              )}
              {person.registration && (
                <FieldRow label="Registrations" value={person.registration} />
              )}
              {person.otherQualifications && (
                <FieldRow
                  label="Other Quals."
                  value={person.otherQualifications}
                />
              )}
              {person.relevantProjects.length > 0 && (
                <View style={{ marginTop: 4 }}>
                  <Text
                    style={[
                      styles.label,
                      { marginBottom: 2, width: "auto" },
                    ]}
                  >
                    Relevant Projects:
                  </Text>
                  <View style={styles.tableHeader}>
                    {["Title", "Loc.", "Yr(D)", "Yr(C)", "Cost", "Fee", "Role"].map(
                      (h) => (
                        <Text key={h} style={styles.tableCellBold}>
                          {h}
                        </Text>
                      )
                    )}
                  </View>
                  {person.relevantProjects.map((proj) => (
                    <View key={proj.id} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{proj.title}</Text>
                      <Text style={styles.tableCell}>{proj.location}</Text>
                      <Text style={styles.tableCell}>{proj.yearCompleted}</Text>
                      <Text style={styles.tableCell}>{proj.yearConstruction}</Text>
                      <Text style={styles.tableCell}>{proj.cost}</Text>
                      <Text style={styles.tableCell}>{proj.fee}</Text>
                      <Text style={styles.tableCell}>{proj.role}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        )}

        {/* Section F */}
        <SBand letter="F" title="Example Projects" />
        {doc.sectionF.projects.length === 0 ? (
          <Text style={styles.italic}>No projects listed.</Text>
        ) : (
          doc.sectionF.projects.map((proj, pi) => (
            <View key={proj.id} wrap={false}>
              {pi > 0 && <View style={styles.divider} />}
              <Text style={styles.personName}>
                F-{pi + 1}. {proj.title}
              </Text>
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 3 }}>
                <FieldRow label="Location" value={proj.location} />
                <FieldRow label="Owner" value={proj.projectOwner} />
              </View>
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 3 }}>
                <FieldRow label="Yr (Design)" value={proj.yearCompleted} />
                <FieldRow
                  label="Yr (Construction)"
                  value={proj.yearConstructionCompleted}
                />
              </View>
              <FieldRow label="POC" value={proj.pointOfContact} />
              <FieldRow label="POC Phone" value={proj.pointOfContactPhone} />
              {proj.briefDescription && (
                <FieldRow label="Description" value={proj.briefDescription} />
              )}
            </View>
          ))
        )}

        {/* Section G */}
        <SBand letter="G" title="Key Personnel Participation Matrix" />
        {doc.sectionE.personnel.length === 0 ||
        doc.sectionF.projects.length === 0 ? (
          <Text style={styles.italic}>
            Matrix not available (add personnel and projects).
          </Text>
        ) : (
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>Personnel</Text>
              {doc.sectionF.projects.map((proj, i) => (
                <Text key={proj.id} style={styles.tableCellBold}>
                  F-{i + 1}
                </Text>
              ))}
            </View>
            {doc.sectionE.personnel.map((person) => (
              <View key={person.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {person.name}
                </Text>
                {doc.sectionF.projects.map((proj) => (
                  <Text key={proj.id} style={styles.tableCell}>
                    {doc.sectionG.matrix[person.id]?.[proj.id] ? "✓" : ""}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Section H */}
        <SBand letter="H" title="Additional Information" />
        {doc.sectionH.additionalInfo ? (
          <Text style={styles.sectionBodyText}>
            {doc.sectionH.additionalInfo}
          </Text>
        ) : (
          <Text style={styles.italic}>None provided.</Text>
        )}
      </Page>
    </Document>
  );
}
