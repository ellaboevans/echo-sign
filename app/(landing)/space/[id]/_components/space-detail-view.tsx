"use client";
import SignDialog from "@/components/sign-dialog";
import SignatureCard from "@/components/signature-card";
import { store } from "@/store/store";
import { Space, SignatureEntry, User } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};

export default function SpaceDetailView({ id }: Props) {
  const [space, setSpace] = useState<Space | null>(null);
  const [entries, setEntries] = useState<SignatureEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = store.getCurrentUser();
    const timer = setTimeout(() => {
      setCurrentUser(user);
    }, 0);

    if (id) {
      const foundSpace = store.getSpace(id);
      if (foundSpace) {
        const timer = setTimeout(() => {
          setSpace(foundSpace);
          const allEntries = store
            .getEntries()
            .filter(
              (e) =>
                e.spaceId === id &&
                (e.visibility !== "private" || e.userId === user?.id)
            )
            .sort((a, b) => b.createdAt - a.createdAt);
          setEntries(allEntries);
          store.track("view_space", { spaceId: id });
        }, 0);
        return () => clearTimeout(timer);
      }
    }
    return () => clearTimeout(timer);
  }, [id]);

  const handleDelete = (entryId: string) => {
    if (confirm("Are you sure you want to remove this memory from history?")) {
      store.deleteEntry(entryId);
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      store.track("delete_entry", { entryId });
    }
  };

  if (!space) return <div className="text-center py-20">Space not found.</div>;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-10">
        <div className="max-w-2xl space-y-4">
          <Link
            href="/spaces"
            className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
            ← Back to Directory
          </Link>
          <h1 className="text-4xl md:text-5xl font-serifs font-bold text-stone-900">
            {space.name}
          </h1>
          <p className="text-stone-600 leading-relaxed italic">
            {space.description ||
              "A sanctuary for shared memories and digital imprints."}
          </p>
        </div>
        <div className="shrink-0">
          <SignDialog space={space} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {entries.map((entry) => (
          <SignatureCard
            key={entry.id}
            entry={entry}
            isOwner={entry.userId === currentUser?.id}
            onDelete={handleDelete}
          />
        ))}
        {entries.length === 0 && (
          <div className="col-span-full py-20 bg-stone-50 rounded-lg border-2 border-dashed border-stone-200 text-center">
            <p className="text-stone-400 font-serifs italic text-lg">
              This space is waiting for its first resident.
            </p>
            <p className="text-xs uppercase tracking-widest text-stone-400 mt-2 font-bold">
              Will it be you?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
