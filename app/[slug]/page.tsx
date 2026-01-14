"use client";

import { useState, useEffect } from "react";
import { store } from "@/store/store";
import SignatureCard from "@/components/signature-card";
import SignWallDialog from "@/components/sign-wall-dialog";
import Link from "next/link";
import { Tenant, Space, SignatureEntry } from "@/types/types";
import { getCurrentSubdomain } from "@/lib/subdomain";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function SpaceSigningPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [space, setSpace] = useState<Space | null>(null);
  const [entries, setEntries] = useState<SignatureEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
    });
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const subdomain = getCurrentSubdomain();
    
    // Load tenant from subdomain
    const foundTenant = subdomain
      ? store.getTenantBySubdomain(subdomain)
      : store.getCurrentTenant();

    if (!foundTenant) {
      setIsLoading(false);
      return;
    }

    setTenant(foundTenant);

    // Load space by slug
    const foundSpace = store.getSpaceBySlug(foundTenant.id, slug);
    if (foundSpace) {
      setSpace(foundSpace);
      store.track(foundTenant.id, "view_space", { spaceId: foundSpace.id });
      
      const publicEntries = store.getPublicEntriesBySpace(foundSpace.id);
      setEntries(publicEntries);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!space || !tenant) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Space not found</p>
          <Link href="/" className="text-amber-700 hover:text-amber-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-10 mb-12">
          <div className="max-w-2xl space-y-4">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
              ← Browse Spaces
            </Link>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-stone-900">
              {space.name}
            </h1>
            {space.description && (
              <p className="text-stone-600 leading-relaxed italic">
                {space.description}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <SignWallDialog
              tenant={tenant}
              space={space}
              onSigned={() => {
                const publicEntries = store.getPublicEntriesBySpace(space.id);
                setEntries(publicEntries);
              }}
            />
          </div>
        </div>

        {/* Signature Grid */}
        {entries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {entries.map((entry) => (
              <SignatureCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="col-span-full py-20 bg-stone-50 rounded-lg border-2 border-dashed border-stone-200 text-center">
            <p className="text-stone-400 font-serif italic text-lg">
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
