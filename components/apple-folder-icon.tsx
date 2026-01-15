"use client";

type Props = {
  primaryColor: string;
  secondaryColor: string;
  spaceId: string;
  className?: string;
};

export default function AppleFolderIcon({
  primaryColor,
  secondaryColor,
  spaceId,
  className = "w-20 h-20",
}: Readonly<Props>) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}>
      <defs>
        <linearGradient
          id={`folderGrad-${spaceId}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%">
          <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Folder body (trapezoid with perspective) */}
      <path
        d="M 12 40 L 35 40 L 40 30 L 88 30 L 88 85 Q 88 90 83 90 L 12 90 Q 7 90 7 85 L 7 45 Q 7 40 12 40 Z"
        fill={`url(#folderGrad-${spaceId})`}
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.5"
      />

      {/* Tab (folder flap) */}
      <path
        d="M 12 40 L 35 40 L 38 32 Q 38 28 42 28 L 52 28 Q 56 28 56 32 L 52 40 Z"
        fill={primaryColor}
        opacity="0.9"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.5"
      />

      {/* Highlight edge on folder body */}
      <line
        x1="12"
        y1="40"
        x2="88"
        y2="40"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />

      {/* Subtle inner shadow for depth */}
      <path
        d="M 12 40 L 35 40 L 40 30 L 88 30 L 88 85 Q 88 90 83 90 L 12 90 Q 7 90 7 85 L 7 45 Q 7 40 12 40 Z"
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
    </svg>
  );
}
