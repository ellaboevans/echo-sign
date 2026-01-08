"use client";

import { SignatureEntry } from "@/types/types";
import Image from "next/image";
import { useState, useEffect } from "react";

interface FeaturedMemoryProps {
  entry: SignatureEntry | null;
}

export default function FeaturedMemory({ entry }: FeaturedMemoryProps) {
  const [reflection, setReflection] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!entry?.memoryText) {
      setReflection("A mark of silent presence.");
      setIsLoading(false);
      return;
    }

    const fetchReflection = async () => {
      try {
        const res = await fetch("/api/reflect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ memoryText: entry.memoryText }),
        });
        const data = await res.json();
        setReflection(data.reflection || "A profound moment captured for posterity.");
      } catch (error) {
        console.error("Error fetching reflection:", error);
        setReflection("A shared fragment of a unique journey.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReflection();
  }, [entry]);

  if (!entry) {
    return null;
  }

  return (
    <section className="bg-stone-900 rounded-2xl overflow-hidden shadow-sm">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 md:p-12 flex flex-col justify-center text-white space-y-6">
          <div className="inline-block px-3 py-1 bg-amber-600/20 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full w-fit">
            Daily Featured Memory
          </div>
          <h2 className="text-3xl font-serifs italic text-stone-100 leading-snug">
            &ldquo;
            {isLoading ? "Reflecting..." : reflection}
            &rdquo;
          </h2>
          <div className="space-y-4">
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest font-bold text-stone-500">
                — {entry.userName}
              </span>
              <span className="text-xs text-stone-600 block mt-1">
                {new Date(entry.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 md:p-16 flex items-center justify-center border-l border-stone-800">
          <Image
            width={2000}
            height={2000}
            decoding="async"
            loading="eager"
            src={entry.signatureData}
            alt="Featured Signature"
            className="max-w-full max-h-50 object-contain mix-blend-multiply opacity-90 transition-opacity"
          />
        </div>
      </div>
    </section>
  );
}
