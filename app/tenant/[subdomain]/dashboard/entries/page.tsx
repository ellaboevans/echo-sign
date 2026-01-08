"use client";

import { store } from "@/store/store";
import { useTenant } from "@/store/tenant-context";
import SignatureCard from "@/components/signature-card";
import { useEffect, useState } from "react";

export default function EntriesPage() {
  const { tenant } = useTenant();
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tenant) {
      const allEntries = store
        .getEntriesByTenant(tenant.id)
        .filter((e) => !e.deletedAt)
        .sort((a, b) => b.createdAt - a.createdAt);
      setEntries(allEntries);
      setIsLoading(false);
    }
  }, [tenant]);

  const handleDelete = (entryId: string) => {
    if (confirm("Remove this signature from your wall?")) {
      store.deleteEntry(entryId);
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      store.track(tenant!.id, "delete_entry", { entryId });
    }
  };

  if (isLoading) {
    return <div>Loading entries...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-stone-900">Entries</h1>
        <p className="text-stone-600 mt-2">
          Manage all signatures on your wall ({entries.length} total)
        </p>
      </div>

      {/* Entries Grid */}
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <SignatureCard
              key={entry.id}
              entry={entry}
              isOwner={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 bg-white border border-stone-200 rounded-lg text-center">
          <p className="text-stone-500">No signatures yet</p>
        </div>
      )}
    </div>
  );
}
