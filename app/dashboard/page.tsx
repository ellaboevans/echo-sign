"use client";

import { store } from "@/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalSpaces: number;
  totalSignatures: number;
  totalViews: number;
}

export default function DashboardPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const currentTenant = store.getCurrentTenant();
    setTenant(currentTenant);

    if (currentTenant) {
      const spaces = store.getSpacesByTenant(currentTenant.id);
      const entries = store.getEntriesByTenant(currentTenant.id).filter(e => !e.deletedAt);
      const analytics = store.getAnalyticsByTenant(currentTenant.id);

      setStats({
        totalSpaces: spaces.length,
        totalSignatures: entries.length,
        totalViews: analytics.filter(a => a.type === "view_wall").length,
      });
    }
  }, []);

  if (!tenant || !stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-600 mt-2">
          Welcome back, {tenant.displayName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
          <div className="text-4xl font-bold text-amber-700">
            {stats.totalSpaces}
          </div>
          <p className="text-sm text-stone-600 mt-1">Total Spaces</p>
          <p className="text-xs text-stone-500 mt-3">Walls you've created</p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
          <div className="text-4xl font-bold text-blue-700">
            {stats.totalSignatures}
          </div>
          <p className="text-sm text-stone-600 mt-1">Total Signatures</p>
          <p className="text-xs text-stone-500 mt-3">People who've signed</p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
          <div className="text-4xl font-bold text-green-700">
            {stats.totalViews}
          </div>
          <p className="text-sm text-stone-600 mt-1">Wall Views</p>
          <p className="text-xs text-stone-500 mt-3">Times walls were visited</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/spaces"
            className="p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-700 transition-colors">
            <p className="font-semibold text-stone-900">Manage Spaces</p>
            <p className="text-sm text-stone-600">Create or edit walls</p>
          </Link>
          <Link
            href="/dashboard/entries"
            className="p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-700 transition-colors">
            <p className="font-semibold text-stone-900">View Signatures</p>
            <p className="text-sm text-stone-600">Moderate or delete entries</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
