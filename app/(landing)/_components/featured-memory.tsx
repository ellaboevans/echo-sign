"use client";

import { generateMemoryReflection } from "@/services/ai-service";
import { store } from "@/store/store";
import { SignatureEntry } from "@/types/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import LifeFeed from "./life-feed";

export default function FeaturedMemory() {
  const [entries, setEntries] = useState<SignatureEntry[]>([]);
  const [featuredEntry, setFeaturedEntry] = useState<SignatureEntry | null>(
    null
  );
  const [reflection, setReflection] = useState<string>("");
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(false);

  useEffect(() => {
    const allEntries = store
      .getEntries()
      .filter((e) => e.visibility === "public")
      .sort((a, b) => b.createdAt - a.createdAt);

    const insideTimer = setTimeout(() => {
      setEntries(allEntries);
    }, 0);

    if (allEntries.length > 0) {
      // Pick a random entry for "Featured"
      const randomEntry =
        allEntries[Math.floor(Math.random() * allEntries.length)];
      const timer = setTimeout(() => {
        setFeaturedEntry(randomEntry);

        setIsLoadingFeatured(true);
      }, 0);
      generateMemoryReflection(randomEntry).then((res) => {
        setReflection(res);
        setIsLoadingFeatured(false);
      });
      return () => clearTimeout(timer);
    }

    store.track("view_home");
    return () => {
      clearTimeout(insideTimer);
    };
  }, []);
  return (
    <>
      {featuredEntry && (
        <section className="bg-stone-900 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center text-white space-y-6">
              <div className="inline-block px-3 py-1 bg-amber-600/20 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full w-fit">
                Daily Featured Reflection
              </div>
              <h2 className="text-3xl font-serifs italic text-stone-100 leading-snug">
                &ldquo;
                {featuredEntry.memoryText ?? "A mark of silent presence."}
                &rdquo;
              </h2>
              <div className="space-y-4">
                <p className="text-stone-400 text-sm border-l-2 border-amber-700 pl-4 italic">
                  {isLoadingFeatured
                    ? "Reflecting on this moment..."
                    : reflection}
                </p>
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-widest font-bold text-stone-500">
                    — {featuredEntry.userName}
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
                src={featuredEntry.signatureData}
                alt="Featured Signature"
                className="max-w-full max-h-50 object-contain mix-blend-multiply opacity-90 transition-opacity"
              />
            </div>
          </div>
        </section>
      )}
      <LifeFeed entries={entries} />
    </>
  );
}
