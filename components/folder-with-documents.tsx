"use client";

import Link from "next/link";
import { Space } from "@/types/types";

type Props = {
  space: Space;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  signatureCount?: number;
};

export default function FolderWithDocuments({
  space,
  primaryColor,
  secondaryColor,
  textColor,
  signatureCount = 0,
}: Readonly<Props>) {
  // Generate stacked documents based on signature count (max 4 visible)
  const documentCount = Math.min(signatureCount, 4);

  return (
    <Link
      href={`/${space.slug}`}
      className="group relative block h-full transition-all duration-300 hover:translate-y-[-8px]">
      {/* Main Container */}
      <div className="flex flex-col h-full">
        {/* Folder Visualization */}
        <div className="flex-1 flex items-center justify-center perspective mb-6 relative">
          {/* Folder Container */}
          <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-300"
          style={{ perspective: "1000px" }}>
          
          {/* Stacked Documents Inside Folder - Behind folder outline */}
          {documentCount > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Create stacked paper effect inside folder */}
              {[...Array(documentCount)].map((_, idx) => {
                const offset = idx * 2;
                const rotation = (idx - Math.floor(documentCount / 2)) * 1;
                const opacity = 0.9 - idx * 0.1;
                const yPos = idx * 2;

                return (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      width: "20px",
                      height: "28px",
                      backgroundColor: "#FFFFFF",
                      border: "0.5px solid rgba(0,0,0,0.12)",
                      borderRadius: "0px",
                      transform: `translateY(${8 + yPos}px) translateX(${-2 + offset}px) rotate(${rotation}deg)`,
                      opacity: opacity,
                      zIndex: documentCount - idx,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}>
                    {/* Document lines to suggest content */}
                    <div className="p-1 h-full flex flex-col justify-start gap-0.5">
                      <div className="h-0.5 w-2/3 bg-gray-300" />
                      <div className="h-0.5 w-full bg-gray-200" />
                      <div className="h-0.5 w-5/6 bg-gray-200" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Folder SVG - Apple-Style with Gradient and Depth */}
          <svg
            className="w-full h-full relative z-10"
            viewBox="0 0 100 100"
            style={{
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))",
            }}>
            <defs>
              {/* Gradient: lighter at top, darker at bottom */}
              <linearGradient
                id={`folderGrad-${space.id}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%">
                <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
              </linearGradient>

              {/* Softer gradient for tab */}
              <linearGradient
                id={`tabGrad-${space.id}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%">
                <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 0.95 }} />
                <stop offset="100%" style={{ stopColor: primaryColor, stopOpacity: 0.85 }} />
              </linearGradient>

              {/* Inner shadow for depth */}
              <filter id={`innerShadow-${space.id}`}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                <feOffset dx="0" dy="2" />
                <feFlood floodColor="rgba(0,0,0,0.1)" />
                <feComposite in2="SourceGraphic" operator="in" />
              </filter>
            </defs>

            {/* Folder body - Solid color */}
            <path
              d="M 12 42 
                 L 35 42 
                 L 40 28 
                 L 88 28 
                 L 92 42
                 L 92 86 Q 92 92 86 92 
                 L 12 92 
                 Q 8 92 8 86 
                 L 8 48 
                 Q 8 42 12 42 Z"
              fill={primaryColor}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="0.5"
            />

            {/* Tab - Folder flap at top-left */}
            <path
              d="M 12 42 
                 L 35 42 
                 L 38 33 
                 Q 38 28 43 28 
                 L 52 28 
                 Q 56 28 56 33 
                 L 52 42 
                 L 12 42 Z"
              fill={primaryColor}
              opacity="0.9"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="0.5"
            />

            {/* Highlight edge - Top of folder body */}
            <line
              x1="12"
              y1="42"
              x2="92"
              y2="42"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />

            {/* Inner shadow at bottom for thickness */}
            <path
              d="M 8 86 Q 8 92 12 92 L 86 92 Q 92 92 92 86 L 92 85 Q 92 91 86 91 L 12 91 Q 8 91 8 86 Z"
              fill="rgba(0,0,0,0.08)"
            />

            {/* Tab shadow - subtle shadow cast by tab onto body */}
            <path
              d="M 12 42 
                 L 52 42 
                 L 52 45
                 Q 32 48 12 48
                 Z"
              fill="rgba(0,0,0,0.06)"
            />
          </svg>

          {/* No documents indicator */}
          {documentCount === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-stone-400 font-semibold z-20">
              Empty
            </div>
          )}
          </div>
          </div>

        {/* Info Section */}
        <div className="space-y-3 text-center">
          {/* Space Name */}
          <div>
            <h2
              className="text-xl font-display font-bold text-balance"
              style={{ color: textColor }}>
              {space.name}
            </h2>
            {space.description && (
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                {space.description}
              </p>
            )}
          </div>

          {/* Stats - Minimal */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-display font-bold" style={{ color: primaryColor }}>
                {signatureCount}
              </div>
              <p className="text-xs text-stone-600">
                {signatureCount === 1 ? "signature" : "signatures"}
              </p>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div className="text-center">
              <div className="text-lg font-display font-bold" style={{ color: secondaryColor }}>
                {new Date(space.createdAt).toLocaleDateString("en-US", { month: "short" })}
              </div>
              <p className="text-xs text-stone-600">created</p>
            </div>
          </div>

          {/* Open indicator */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-200 group-hover:translate-x-1"
            style={{ color: primaryColor }}>
            <span>Open</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
