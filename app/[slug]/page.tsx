"use client";

import { useState, useEffect } from "react";
import { store } from "@/store/store";
import SignatureCard from "@/components/signature-card";
import SignWallDialog from "@/components/sign-wall-dialog";
import Link from "next/link";

export default function SpaceSigningPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [tenant, setTenant] = useState<any>(null);
  const [space, setSpace] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
    });
  }, [params]);

  useEffect(() => {
    if (!slug || typeof window === "undefined") return;

    const host = window.location.hostname;
    let subdomain: string | null = null;

    // Detect subdomain
    if (host === "localhost" || host === "127.0.0.1" || host.startsWith("127.")) {
      subdomain = null;
    } else if (host === "lvh.me") {
      subdomain = null;
    } else if (host.endsWith(".lvh.me")) {
      subdomain = host.replace(".lvh.me", "");
    } else if (host.includes(".")) {
      const parts = host.split(".");
      if (parts.length > 2) {
        subdomain = parts[0];
      }
    }

    // Load tenant from subdomain
    let foundTenant = null;
    if (subdomain) {
      foundTenant = store.getTenantBySubdomain(subdomain);
    } else {
      foundTenant = store.getCurrentTenant();
    }

    setTenant(foundTenant);

    // Load space by slug
    if (foundTenant) {
      const foundSpace = store.getSpaceBySlug(foundTenant.id, slug);
      if (foundSpace) {
        setSpace(foundSpace);
        store.track(foundTenant.id, "view_space", { spaceId: foundSpace.id });
        
        const publicEntries = store.getPublicEntriesBySpace(foundSpace.id);
        setEntries(publicEntries);
      }
    }

    setIsLoading(false);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-500">Loading...</div>
      </div>
    );
  }

  if (!space || !tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-white">
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
