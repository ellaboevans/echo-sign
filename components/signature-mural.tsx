"use client";

import { SignatureEntry, TenantBranding } from "@/types/types";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  entries: SignatureEntry[];
  spaceName: string;
  branding?: TenantBranding;
};

interface SignaturePosition {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export default function SignatureMural({ entries, spaceName, branding }: Props) {
  // Get mural background customizations or defaults
  const muralBg = branding?.muralBackground || {};
  const bgColor1 = muralBg.bgColor1 || "#FAF5F0";
  const bgColor2 = muralBg.bgColor2 || "#FEFAF0";
  const bgColor3 = muralBg.bgColor3 || "#FAF5F0";
  const dotOpacity = muralBg.dotOpacity ?? 12;
  const dotSize = muralBg.dotSize ?? 1.5;
  const dotSpacing = muralBg.dotSpacing ?? 40;

  const [selectedEntry, setSelectedEntry] = useState<SignatureEntry | null>(null);
  const [positions, setPositions] = useState<Record<string, SignaturePosition>>(() => {
    // Initialize positions with random layout
    const initialPositions: Record<string, SignaturePosition> = {};
    entries.forEach((entry, idx) => {
      const seed = entry.id.charCodeAt(0) + idx;
      const random = (min: number, max: number) => {
        const x = Math.sin(seed + min) * 10000;
        return min + ((x - Math.floor(x)) * (max - min));
      };

      initialPositions[entry.id] = {
        id: entry.id,
        x: random(100, typeof window !== "undefined" ? window.innerWidth - 300 : 1000),
        y: random(100, typeof window !== "undefined" ? window.innerHeight - 200 : 800),
        rotation: random(-25, 25),
        scale: random(0.8, 1.3),
      };
    });
    return initialPositions;
  });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggedRef = useRef<string | null>(null);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDrag = (entryId: string, newX: number, newY: number) => {
    setPositions((prev) => ({
      ...prev,
      [entryId]: {
        ...prev[entryId],
        x: newX,
        y: newY,
      },
    }));
  };

  const handleDragEnd = (entryId: string, info: any) => {
    // Check if there was actual movement
    const hasMoved = Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5;
    if (hasMoved) {
      draggedRef.current = entryId;
      // Clear the flag after a short delay
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
      dragTimeoutRef.current = setTimeout(() => {
        draggedRef.current = null;
      }, 100);
    }
  };

  const handleClick = (entryId: string) => {
    // Only open modal if this signature wasn't just dragged
    if (draggedRef.current !== entryId) {
      setSelectedEntry(entries.find((e) => e.id === entryId) || null);
    }
    // Reset the drag tracking
    draggedRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-auto">
      {/* Freeform Canvas */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(to bottom right, ${bgColor1}, ${bgColor2}, ${bgColor3})`,
        }}
      >
        {/* Apple Freeform Dot Grid Pattern */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='${dotSpacing}' height='${dotSpacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${dotSpacing / 2}' cy='${dotSpacing / 2}' r='${dotSize}' fill='%23000' opacity='${dotOpacity / 100}'/%3E%3C/svg%3E")`,
            backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
            backgroundPosition: "0 0",
          }}
        />

        {/* Signatures Freely on Canvas */}
        <div className="relative w-full h-full" style={{ minHeight: "100vh" }}>
          <AnimatePresence>
            {entries.map((entry, idx) => {
              const pos = positions[entry.id];
              if (!pos) return null;

              return (
                <motion.button
                  key={entry.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  drag
                  dragElastic={0.15}
                  dragMomentum={false}
                  onDrag={(event, info) => {
                    handleDrag(entry.id, pos.x + info.delta.x, pos.y + info.delta.y);
                  }}
                  onDragEnd={(event, info) => {
                    handleDragEnd(entry.id, info);
                  }}
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleClick(entry.id)}
                  className="absolute cursor-grab active:cursor-grabbing focus:outline-none"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                    zIndex: hoveredId === entry.id ? 1000 : idx,
                  }}
                  aria-label={`Signature by ${entry.userName}`}
                >
                  {/* Selection Ring on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === entry.id ? 1 : 0 }}
                    className="absolute -inset-4 border-2 border-amber-400/40 rounded-lg pointer-events-none"
                  />

                  {/* Signature Image - Raw and Free */}
                  <motion.div
                    whileHover={{
                      filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.25))",
                    }}
                    whileDrag={{
                      filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.3))",
                    }}
                    className="relative w-56 h-32"
                  >
                    <Image
                      width={380}
                      height={180}
                      src={entry.signatureData}
                      alt={`Signature of ${entry.userName}`}
                      className="w-full h-full object-contain  drop-shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
                      priority={idx < 8}
                      draggable={false}
                    />
                  </motion.div>

                  {/* Author Label - Appears Below on Hover */}
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{
                      opacity: hoveredId === entry.id ? 1 : 0,
                      y: hoveredId === entry.id ? 5 : -5,
                    }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center pointer-events-none whitespace-nowrap"
                  >
                    <p className="text-xs font-bold text-stone-900">
                      {entry.userName}
                    </p>
                    <p className="text-xs text-stone-500">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </motion.div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEntry(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10000 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-stone-200 sticky top-0 bg-white rounded-t-lg">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-stone-900">
                    {selectedEntry.userName}
                  </h2>
                  <p className="text-sm text-stone-500 mt-1">
                    Signed{" "}
                    {new Date(selectedEntry.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Large Signature */}
                <div className="flex justify-center p-8 rounded-lg border border-stone-300">
                  <Image
                    width={600}
                    height={300}
                    src={selectedEntry.signatureData}
                    alt={`Signature of ${selectedEntry.userName}`}
                    className="w-full max-w-md h-auto object-contain"
                  />
                </div>

                {/* Memory Text */}
                {selectedEntry.memoryText && (
                  <div className="bg-amber-50 border-l-4 border-amber-700 p-6 rounded-lg">
                    <p className="text-lg italic text-stone-800 font-serif leading-relaxed text-pretty">
                      &ldquo;{selectedEntry.memoryText}&rdquo;
                    </p>
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-stone-500 mb-1">
                      Wall
                    </p>
                    <p className="text-sm text-stone-900">{spaceName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-stone-500 mb-1">
                      Signed
                    </p>
                    <p className="text-sm text-stone-900">
                      {new Date(selectedEntry.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
