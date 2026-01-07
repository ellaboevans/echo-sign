import SignatureCard from "@/components/signature-card";
import { SignatureEntry } from "@/types/types";
import Link from "next/link";
import React from "react";

export default function LifeFeed({ entries }: { entries: SignatureEntry[] }) {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-stone-200 pb-4">
        <div>
          <h3 className="text-2xl font-serifs font-bold text-stone-900">
            Live Feed
          </h3>
          <p className="text-sm text-stone-500">
            Recent contributions from around the world
          </p>
        </div>
        <Link
          href="/spaces"
          className="text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800">
          View All Spaces →
        </Link>
      </div>

      {entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {entries.slice(0, 8).map((entry) => (
            <SignatureCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 rounded-lg border-2 border-dashed border-stone-200">
          <p className="text-stone-400 font-serifs italic">
            No signatures yet. Be the first to leave your mark.
          </p>
        </div>
      )}
    </section>
  );
}
