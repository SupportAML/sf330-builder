"use client";

export function Seal({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 600ms ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as SVGSVGElement).style.transform = "rotate(8deg)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as SVGSVGElement).style.transform = "rotate(0deg)";
      }}
    >
      {/* Outer circle */}
      <circle
        cx="14"
        cy="14"
        r="13"
        stroke="var(--brass)"
        strokeWidth="1"
        fill="none"
      />
      {/* Inner circle */}
      <circle
        cx="14"
        cy="14"
        r="10.5"
        stroke="var(--brass)"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Cardinal diamonds */}
      <text
        x="14"
        y="3.2"
        textAnchor="middle"
        fontSize="3"
        fill="var(--brass)"
        fontFamily="serif"
      >
        ◆
      </text>
      <text
        x="14"
        y="26.2"
        textAnchor="middle"
        fontSize="3"
        fill="var(--brass)"
        fontFamily="serif"
      >
        ◆
      </text>
      <text
        x="1.8"
        y="15"
        textAnchor="middle"
        fontSize="3"
        fill="var(--brass)"
        fontFamily="serif"
      >
        ◆
      </text>
      <text
        x="26.2"
        y="15"
        textAnchor="middle"
        fontSize="3"
        fill="var(--brass)"
        fontFamily="serif"
      >
        ◆
      </text>
      {/* "SF" text */}
      <text
        x="14"
        y="12.5"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="500"
        fontStyle="italic"
        fill="var(--brass-ink)"
        fontFamily="var(--font-serif), Georgia, serif"
      >
        SF
      </text>
      {/* "330" text */}
      <text
        x="14"
        y="18.5"
        textAnchor="middle"
        fontSize="4.5"
        fontWeight="500"
        fontStyle="italic"
        fill="var(--brass-ink)"
        fontFamily="var(--font-serif), Georgia, serif"
      >
        330
      </text>
    </svg>
  );
}
