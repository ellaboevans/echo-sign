"use client";
import CreateSpaceDialog from "@/components/create-space-dialog";
import { store } from "@/store/store";
import { Space } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SpaceConfiguration() {
  const [spaces, setSpaces] = useState<Space[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpaces(store.getSpaces().filter((s) => s.visibility === "public"));
      store.track("view_spaces");
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {spaces.map((space) => (
        <Link
          key={space.id}
          href={`/space/${space.id}`}
          className="group block bg-white p-8 rounded-xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-50 px-2 py-1 rounded">
                {space.id === "global-legacy" ? "Primary" : "Community"}
              </span>
            </div>
            <h2 className="text-2xl font-serifs font-bold text-stone-900 group-hover:text-amber-700 transition-colors mb-2">
              {space.name}
            </h2>
            <p className="text-stone-500 text-sm mb-6 grow">
              {space.description ||
                "A community curated space for signatures and shared memories."}
            </p>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <span>
                {
                  store.getEntries().filter((e) => e.spaceId === space.id)
                    .length
                }{" "}
                Signatures
              </span>
              <span className="group-hover:text-amber-700 transition-colors">
                Enter Space →
              </span>
            </div>
          </div>
        </Link>
      ))}

      <CreateSpaceDialog triggerClassName="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors group">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-stone-200 mb-4 group-hover:scale-110 transition-transform">
          <span className="text-2xl text-stone-400">+</span>
        </div>
        <span className="text-sm font-bold uppercase tracking-widest text-stone-500 group-hover:text-stone-900">
          Create Your Own Wall
        </span>
      </CreateSpaceDialog>
    </div>
  );
}
