"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { store } from "@/store/store";
import { useTenant } from "@/store/tenant-context";
import Link from "next/link";
import FeaturedMemory from "@/components/featured-memory";
import { SignatureEntry, Space, Tenant } from "@/types/types";
import FolderWithDocuments from "@/components/folder-with-documents";

interface TenantWallViewProps {
  tenantParam?: string; // For path-based routing
}

export default function TenantWallView({
  tenantParam,
}: Readonly<TenantWallViewProps>) {
  const { tenant: contextTenant } = useTenant();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [featuredMemory, setFeaturedMemory] = useState<SignatureEntry | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Priority: context tenant (from subdomain-based routing)
    let timer: NodeJS.Timeout;
    if (contextTenant) {
      timer = setTimeout(() => {
        setTenant(contextTenant);
      }, 0);

      const tenantSpaces = store.getSpacesByTenant(contextTenant.id);
      const spacesWithStats = tenantSpaces.map((space) => {
        const stats = store.getSpaceStats(space.id);
        return {
          ...space,
          ...stats,
        };
      });
      // Show only public spaces
      timer = setTimeout(() => {
        setSpaces(spacesWithStats.filter((s) => s.visibility === "public"));
      }, 0);

      // Load featured memory
      const featured = store.getFeaturedMemory(contextTenant.id);
      timer = setTimeout(() => {
        setFeaturedMemory(featured);
        setIsLoading(false);
      }, 0);

      return () => clearTimeout(timer);
    }

    // Fallback: load from param (path-based routing)
    if (tenantParam) {
      const foundTenant = store.getTenantBySubdomain(tenantParam);
      if (foundTenant) {
        timer = setTimeout(() => {
          setTenant(foundTenant);
        }, 0);
        store.track(foundTenant.id, "view_tenant_home");
        const tenantSpaces = store.getSpacesByTenant(foundTenant.id);
        const spacesWithStats = tenantSpaces.map((space) => {
          const stats = store.getSpaceStats(space.id);
          return {
            ...space,
            ...stats,
          };
        });
        // Show only public spaces
        timer = setTimeout(() => {
          setSpaces(spacesWithStats.filter((s) => s.visibility === "public"));
        }, 0);

        // Load featured memory
        const featured = store.getFeaturedMemory(foundTenant.id);
        timer = setTimeout(() => {
          setFeaturedMemory(featured);
          setIsLoading(false);
        }, 0);
      }
    }
  }, [contextTenant, tenantParam]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Account not found</p>
          <Link
            href="/onboarding"
            className="text-amber-700 hover:text-amber-800">
            ← Create Your Account
          </Link>
        </div>
      </div>
    );
  }

  // Use tenant branding colors if available
  const branding = tenant.branding || {};
  const primaryColor = branding.primaryColor || "#B45309";
  const secondaryColor = branding.secondaryColor || "#92400E";
  const textColor = branding.textColor || "#1C1917";
  const bgColor =
    typeof globalThis === "undefined"
      ? "#FAFAF9"
      : globalThis
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--background");

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      {/* Cover Image */}
      {branding.coverImage && (
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src={branding.coverImage}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
        {/* Header with Logo */}
        <div className="space-y-4 border-b border-stone-200 pb-10 mb-12">
          <div className="flex items-start gap-4">
            {branding.logoImage && (
              <div className="shrink-0">
                <Image
                  src={branding.logoImage}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance"
                style={{ color: textColor }}>
                {tenant.displayName}
              </h1>
              {branding.tagline && (
                <p
                  className="text-sm md:text-base font-semibold mt-2 tracking-wide"
                  style={{ color: secondaryColor }}>
                  {branding.tagline}
                </p>
              )}
            </div>
          </div>

          {tenant.description && (
            <p
              className="text-base md:text-lg leading-relaxed italic max-w-2xl text-pretty"
              style={{ color: textColor }}>
              {tenant.description}
            </p>
          )}
          <p className="text-xs md:text-sm font-medium uppercase tracking-widest" style={{ color: secondaryColor }}>
            {spaces.length}{" "}
            {spaces.length === 1 ? "signature wall" : "signature walls"}
          </p>
        </div>

        {/* Featured Memory */}
        {featuredMemory && (
          <div className="my-12">
            <FeaturedMemory entry={featuredMemory} />
          </div>
        )}

        {/* Spaces Grid - Folders with Documents */}
        {spaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {spaces.map((space) => (
              <FolderWithDocuments
                key={space.id}
                space={space}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textColor={textColor}
                signatureCount={space.signatureCount || 0}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 bg-stone-50 rounded-none border-2 border-dashed border-stone-300 text-center">
            <p className="text-stone-400 font-serif italic text-lg">
              No signature walls created yet.
            </p>
            <p className="text-xs uppercase tracking-widest text-stone-400 mt-3 font-bold">
              Check back soon
            </p>
          </div>
        )}

        {/* Footer */}
        {branding.footerText && (
          <footer
            className="mt-16 pt-8 border-t border-stone-200 text-center"
            style={{ color: textColor }}>
            <p className="text-xs md:text-sm leading-relaxed">{branding.footerText}</p>
          </footer>
        )}
      </div>
    </div>
  );
}
