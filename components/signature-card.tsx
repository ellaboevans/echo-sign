"use client";

import { SignatureEntry } from "@/types/types";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  entry: SignatureEntry;
  className?: string;
};

// Framer Motion variants for the card animations
const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 60px rgba(212, 175, 55, 0.25)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const overlayVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
};

export default function SignatureCard({ entry, className }: Readonly<Props>) {
  const { userName, createdAt, signatureData, memoryText } = entry;
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      className={cn(
        "group relative flex h-full flex-col rounded-lg bg-surface-900 border border-white/10 overflow-hidden",
        className
      )}
    >
      {/* Layer 1: Signature and Author Info */}
      <div className="flex flex-col h-full p-6">
        <div className="mb-4 flex-grow aspect-[2/1] flex items-center justify-center overflow-hidden rounded-md bg-black/20">
          <Image
            width={400}
            height={200}
            src={signatureData}
            alt={`Signature of ${userName}`}
            className="w-full h-full object-contain filter invert brightness-150 drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_4px_15px_rgba(212,175,55,0.7)]"
          />
        </div>
        <div className="mt-auto text-center">
          <h3 className="font-display text-xl text-heritage-champagne text-balance">
            {userName}
          </h3>
          <p className="text-xs text-white/40">{date}</p>
        </div>
      </div>

      {/* Layer 2: Memory Text Overlay (Appears on hover) */}
      {memoryText && (
        <motion.div
          variants={overlayVariants}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="absolute inset-0 w-full h-full p-6 flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <p className="text-center font-serif text-lg text-white/90 leading-relaxed text-pretty">
            &ldquo;{memoryText}&rdquo;
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}