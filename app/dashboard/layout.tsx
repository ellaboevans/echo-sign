"use client";

import { store } from "@/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tenant, setTenant] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = window.location.hostname;
    let subdomain: string | null = null;

    // Detect subdomain (same logic as root page)
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
    let foundTenant: any = null;
    let foundUser: any = null;

    if (subdomain) {
      foundTenant = store.getTenantBySubdomain(subdomain);
    } else {
      // Fallback: try to get from localStorage
      foundTenant = store.getCurrentTenant();
    }

    // Get user from localStorage
    foundUser = store.getCurrentUser();

    // Verify user is owner of this tenant
    if (foundTenant && foundUser && foundUser.id === foundTenant.ownerId) {
      setTenant(foundTenant);
      setUser(foundUser);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!tenant || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Access denied or not logged in</p>
          <Link href="/onboarding" className="text-amber-700">
            ← Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-stone-200 p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-stone-900">
            {tenant.displayName}
          </h2>
          <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">
            Dashboard
          </p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-stone-900 hover:bg-amber-50 transition-colors">
            Overview
          </Link>
          <Link
            href="/dashboard/spaces"
            className="block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-stone-600 hover:bg-amber-50 transition-colors">
            Spaces
          </Link>
          <Link
            href="/dashboard/entries"
            className="block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-stone-600 hover:bg-amber-50 transition-colors">
            Entries
          </Link>
          <Link
            href="/dashboard/analytics"
            className="block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-stone-600 hover:bg-amber-50 transition-colors">
            Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-stone-600 hover:bg-amber-50 transition-colors">
            Settings
          </Link>
        </nav>

        <div className="border-t border-stone-200 pt-6 space-y-3">
          <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
            Account
          </p>
          <p className="text-sm text-stone-700">{user.name}</p>
          {user.email && (
            <p className="text-xs text-stone-500">{user.email}</p>
          )}
          <button
            onClick={() => {
              store.clearCurrentUser();
              // Redirect to root domain landing page
              const protocol = window.location.protocol;
              const port = window.location.port ? `:${window.location.port}` : "";
              window.location.href = `${protocol}//lvh.me${port}/`;
            }}
            className="w-full mt-4 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-red-50 transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
