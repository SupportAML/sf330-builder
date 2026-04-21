"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { SF330Doc, SectionG } from "@/lib/types";

type Props = {
  doc: SF330Doc;
  onChange: (val: SectionG) => void;
};

export function ParticipationMatrix({ doc, onChange }: Props) {
  const personnel = doc.sectionE.personnel;
  const projects = doc.sectionF.projects;
  const matrix = doc.sectionG.matrix;

  if (personnel.length === 0 || projects.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Add personnel in Section E and projects in Section F to build the
          participation matrix.
        </p>
      </div>
    );
  }

  const toggle = (personId: string, projectId: string) => {
    const current = matrix[personId]?.[projectId] ?? false;
    const newMatrix = {
      ...matrix,
      [personId]: {
        ...matrix[personId],
        [projectId]: !current,
      },
    };
    onChange({ matrix: newMatrix });
  };

  const isChecked = (personId: string, projectId: string) =>
    matrix[personId]?.[projectId] ?? false;

  const showRotated = projects.length > 4;

  return (
    <div className="bg-white rounded-lg border overflow-x-auto">
      <table className="w-full border-collapse min-w-max">
        <thead>
          <tr>
            <th className="sticky left-0 bg-white border-b border-r px-4 py-2 text-left text-sm font-semibold min-w-[160px] z-10">
              Personnel
            </th>
            {projects.map((proj, i) => (
              <th
                key={proj.id}
                className="border-b px-2 py-2 text-center text-xs font-medium text-muted-foreground"
                style={{ minWidth: showRotated ? "48px" : "120px" }}
              >
                {showRotated ? (
                  <div
                    className="flex items-end justify-center"
                    style={{ height: "80px" }}
                  >
                    <div
                      style={{
                        transform: "rotate(-60deg)",
                        transformOrigin: "bottom center",
                        whiteSpace: "nowrap",
                        maxWidth: "90px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={proj.title || `F-${i + 1}`}
                    >
                      {proj.title || `F-${i + 1}`}
                    </div>
                  </div>
                ) : (
                  <span
                    className="truncate block max-w-[110px] mx-auto"
                    title={proj.title || `F-${i + 1}`}
                  >
                    {proj.title || `F-${i + 1}`}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {personnel.map((person, pi) => (
            <tr key={person.id} className={pi % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="sticky left-0 border-r px-4 py-2 text-sm font-medium bg-inherit z-10">
                <div>{person.name || `Person ${pi + 1}`}</div>
                {person.role && (
                  <div className="text-xs text-muted-foreground">
                    {person.role}
                  </div>
                )}
              </td>
              {projects.map((proj) => (
                <td
                  key={proj.id}
                  className="border-b px-2 py-2 text-center"
                >
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={isChecked(person.id, proj.id)}
                      onCheckedChange={() => toggle(person.id, proj.id)}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
