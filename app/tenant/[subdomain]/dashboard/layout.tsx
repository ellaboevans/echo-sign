"use client";

import { useTenant } from "@/store/tenant-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tenant, user, isOwner } = useTenant();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not owner
    if (tenant && !isOwner) {
      router.push("/");
    }
  }, [tenant, isOwner, router]);

  if (!tenant || !isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500">Access denied</p>
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
          <p className="text-sm text-stone-700">{user?.name}</p>
          {user?.email && (
            <p className="text-xs text-stone-500">{user.email}</p>
          )}
          <button
            onClick={() => {
              // logout logic
              window.location.href = "/";
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
