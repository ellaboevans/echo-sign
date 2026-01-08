"use client";

import { store } from "@/store/store";
import { SignatureEntry } from "@/types/types";
import { useState, useEffect } from "react";

interface EntryWithSpace extends SignatureEntry {
  spaceName: string;
  spaceSlug: string;
}

export default function EntriesPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [entries, setEntries] = useState<EntryWithSpace[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<EntryWithSpace[]>([]);
  const [filterSpace, setFilterSpace] = useState<string>("all");
  const [filterVisibility, setFilterVisibility] = useState<string>("all");
  const [spaces, setSpaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentTenant = store.getCurrentTenant();
    setTenant(currentTenant);

    if (currentTenant) {
      const tenantSpaces = store.getSpacesByTenant(currentTenant.id);
      setSpaces(tenantSpaces);

      const tenantEntries = store.getEntriesByTenant(currentTenant.id);
      const entriesWithSpace = tenantEntries.map((entry) => {
        const space = tenantSpaces.find((s) => s.id === entry.spaceId);
        return {
          ...entry,
          spaceName: space?.name || "Unknown Space",
          spaceSlug: space?.slug || "",
        };
      });
      setEntries(entriesWithSpace);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let filtered = entries;

    if (filterSpace !== "all") {
      filtered = filtered.filter((e) => e.spaceId === filterSpace);
    }

    if (filterVisibility !== "all") {
      filtered = filtered.filter((e) => e.visibility === filterVisibility);
    }

    setFilteredEntries(filtered);
  }, [entries, filterSpace, filterVisibility]);

  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Delete this signature? This action cannot be undone.")) {
      store.deleteEntry(entryId);
      setEntries(entries.filter((e) => e.id !== entryId));
    }
  };

  if (isLoading || !tenant) {
    return <div>Loading...</div>;
  }

  const activeEntries = filteredEntries.filter((e) => !e.deletedAt);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-stone-900">Signatures</h1>
        <p className="text-stone-600 mt-2">
          View and manage all signatures across your spaces
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="text-3xl font-bold text-blue-700">
            {activeEntries.length}
          </div>
          <p className="text-sm text-stone-600 mt-1">Total Signatures</p>
          <p className="text-xs text-stone-500 mt-2">Active entries</p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="text-3xl font-bold text-green-700">
            {activeEntries.filter((e) => e.visibility === "public").length}
          </div>
          <p className="text-sm text-stone-600 mt-1">Public Signatures</p>
          <p className="text-xs text-stone-500 mt-2">Visible to everyone</p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="text-3xl font-bold text-amber-700">
            {activeEntries.filter((e) => e.visibility === "private").length}
          </div>
          <p className="text-sm text-stone-600 mt-1">Private Signatures</p>
          <p className="text-xs text-stone-500 mt-2">Owner only</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
              Space
            </label>
            <select
              value={filterSpace}
              onChange={(e) => setFilterSpace(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700">
              <option value="all">All Spaces</option>
              {spaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
              Visibility
            </label>
            <select
              value={filterVisibility}
              onChange={(e) => setFilterVisibility(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700">
              <option value="all">All Visibility Levels</option>
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      {/* Entries List */}
      {activeEntries.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900">
            {activeEntries.length} Signature{activeEntries.length !== 1 ? "s" : ""}
          </h2>
          <div className="space-y-3">
            {activeEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900">{entry.userName}</h3>
                    <p className="text-sm text-stone-600 mt-1">
                      Signed: <strong>{entry.spaceName}</strong>
                    </p>
                    {entry.userEmail && (
                      <p className="text-xs text-stone-500 mt-1">{entry.userEmail}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded ${
                      entry.visibility === "public"
                        ? "bg-green-100 text-green-700"
                        : entry.visibility === "private"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {entry.visibility}
                    </span>
                  </div>
                </div>

                {/* Memory */}
                {entry.memoryText && (
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                    <p className="text-sm text-stone-700 italic">
                      "{entry.memoryText}"
                    </p>
                  </div>
                )}

                {/* Metadata & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-500">
                    {new Date(entry.createdAt).toLocaleDateString()} at{" "}
                    {new Date(entry.createdAt).toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="px-4 py-2 bg-red-50 text-red-700 text-sm font-bold rounded hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 bg-stone-50 border-2 border-dashed border-stone-200 rounded-lg text-center">
          <p className="text-stone-500 mb-2">
            {entries.length === 0
              ? "No signatures yet"
              : "No signatures match your filters"}
          </p>
          <p className="text-xs text-stone-400">
            {entries.length === 0
              ? "Once guests sign your spaces, they'll appear here"
              : "Try adjusting your filters"}
          </p>
        </div>
      )}
    </div>
  );
}
