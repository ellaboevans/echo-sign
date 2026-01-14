"use client";

import { useState, useEffect } from "react";
import { store } from "@/store/store";
import SignatureMural from "@/components/signature-mural";
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
      {/* Header Section */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 md:py-14 lg:px-8 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4 flex-1">
              <Link
                href="/"
                className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors inline-block">
                ← Browse Spaces
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-stone-900 text-balance">
                {space.name}
              </h1>
              {space.description && (
                <p className="text-base md:text-lg text-stone-600 leading-relaxed italic text-pretty">
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
        </div>
      </div>

      {/* Mural Section */}
      {entries.length > 0 ? (
        <SignatureMural entries={entries} spaceName={space.name} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="mb-6 text-6xl">✍️</div>
            <p className="text-stone-400 font-serif italic text-xl mb-2">
              This wall is waiting for its first signature.
            </p>
            <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">
              Be the first to leave your mark
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
