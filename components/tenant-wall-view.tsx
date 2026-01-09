"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { store } from "@/store/store";
import { useTenant } from "@/store/tenant-context";
import Link from "next/link";
import FeaturedMemory from "@/components/featured-memory";
import { SignatureEntry, Space, Tenant } from "@/types/types";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-500">Loading...</div>
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header with Logo */}
        <div className="space-y-4 border-b border-stone-200 pb-10 mb-12">
          <div className="flex items-center gap-4">
            {branding.logoImage && (
              <Image
                src={branding.logoImage}
                alt="Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            )}
            <div>
              <h1
                className="text-5xl md:text-6xl font-display font-bold"
                style={{ color: textColor }}>
                {tenant.displayName}
              </h1>
              {branding.tagline && (
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: secondaryColor }}>
                  {branding.tagline}
                </p>
              )}
            </div>
          </div>

          {tenant.description && (
            <p
              className="text-lg leading-relaxed italic max-w-2xl"
              style={{ color: textColor }}>
              {tenant.description}
            </p>
          )}
          <p className="text-sm" style={{ color: secondaryColor }}>
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

        {/* Spaces Grid */}
        {spaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <Link
                key={space.id}
                href={`/${space.slug}`}
                className="group bg-white border border-stone-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                style={{
                  borderColor: branding.primaryColor
                    ? `${primaryColor}40`
                    : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = branding.primaryColor
                    ? `${primaryColor}40`
                    : "";
                }}>
                {/* Space Header */}
                <div className="mb-4">
                  <h2
                    className="text-2xl font-bold transition-colors"
                    style={{ color: textColor }}>
                    {space.name}
                  </h2>
                  {space.description && (
                    <p className="text-stone-600 text-sm mt-2 line-clamp-2">
                      {space.description}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-700">
                      {space.signatureCount}
                    </div>
                    <p className="text-xs text-stone-600">
                      {space.signatureCount === 1 ? "signature" : "signatures"}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-700">
                      {space.publicCount}
                    </div>
                    <p className="text-xs text-stone-600">public</p>
                  </div>
                </div>

                {/* Meta */}
                <div
                  className="text-xs flex items-center justify-between pt-3 border-t border-stone-100"
                  style={{ color: secondaryColor }}>
                  <span>
                    Created {new Date(space.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className="font-bold group-hover:underline"
                    style={{ color: primaryColor }}>
                    View & Sign →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 bg-stone-50 rounded-lg border-2 border-dashed border-stone-200 text-center">
            <p className="text-stone-400 font-serif italic text-lg">
              No signature walls created yet.
            </p>
            <p className="text-xs uppercase tracking-widest text-stone-400 mt-2 font-bold">
              Check back soon
            </p>
          </div>
        )}

        {/* Footer */}
        {branding.footerText && (
          <footer
            className="mt-16 pt-8 border-t border-stone-200 text-center"
            style={{ color: textColor }}>
            <p className="text-sm">{branding.footerText}</p>
          </footer>
        )}
      </div>
    </div>
  );
}
