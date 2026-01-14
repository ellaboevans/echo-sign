"use client";

import { SignatureEntry } from "@/types/types";
import { AnimatePresence, motion, useInView, TargetAndTransition } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  entries: SignatureEntry[];
  cycleDuration?: number;
};

const getRandomPan = (): TargetAndTransition => ({
  x: Math.random() * 40 - 20,
  y: Math.random() * 40 - 20,
  scale: 1.1 + Math.random() * 0.1,
  transition: {
    duration: 15 + Math.random() * 10,
  },
});

export default function DigitalTvDisplayCinema({
  entries,
  cycleDuration = 8000,
}: Readonly<Props>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const shouldAnimate = isInView && !prefersReducedMotion;

  useEffect(() => {
    if (shouldAnimate && entries.length > 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % entries.length);
      }, cycleDuration);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, entries.length, cycleDuration, shouldAnimate]);

  if (!entries || entries.length === 0) {
    return (
      <div className="w-screen h-dvh bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-heritage-champagne text-balance">
            Your story starts here.
          </h1>
          <p className="text-white/50 mt-2 text-pretty">
            Signatures will appear here as they are collected.
          </p>
        </div>
      </div>
    );
  }
  
  const currentEntry = entries[prefersReducedMotion ? 0 : currentIndex];
  const { userName, memoryText, signatureData } = currentEntry;

  return (
    <div ref={ref} className="w-screen h-dvh bg-background flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldAnimate ? 1 : 0, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center"
        >
          <motion.div
            className="w-[70vw] h-[35vw] max-w-[800px] max-h-[400px] relative overflow-hidden rounded-lg shadow-signature-lg"
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={shouldAnimate ? getRandomPan() : {}}
          >
            <Image
              fill
              src={signatureData}
              alt={`Signature of ${userName}`}
              className="object-contain filter invert brightness-150 drop-shadow-[0_4px_15px_rgba(212,175,55,0.6)]"
              sizes="(max-width: 1024px) 70vw, 800px"
            />
          </motion.div>

          <div className="mt-12">
            {memoryText && (
              <p className="font-serif text-3xl md:text-4xl text-white/90 leading-tight mb-4 text-pretty">
                &ldquo;{memoryText}&rdquo;
              </p>
            )}
            <h2 className="font-display text-4xl md:text-5xl text-heritage-champagne text-balance">
              {userName}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}