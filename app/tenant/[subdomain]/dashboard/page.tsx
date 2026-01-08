"use client";

import { store } from "@/store/store";
import { useTenant } from "@/store/tenant-context";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalSignatures: number;
  totalViews: number;
  totalSigns: number;
  lastEntry: any | null;
}

export default function DashboardPage() {
  const { tenant } = useTenant();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (tenant) {
      const stats = store.getTenantStats(tenant.id);
      setStats(stats);
    }
  }, [tenant]);

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
        {/* Total Signatures */}
        <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
          <div className="text-4xl font-bold text-amber-700">
            {stats.totalSignatures}
          </div>
          <p className="text-sm text-stone-600 mt-1">Total Signatures</p>
          <p className="text-xs text-stone-500 mt-3">
            People who have left their mark
          </p>
        </div>

        {/* Wall Views */}
        <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
          <div className="text-4xl font-bold text-blue-700">
            {stats.totalViews}
          </div>
          <p className="text-sm text-stone-600 mt-1">Wall Views</p>
          <p className="text-xs text-stone-500 mt-3">Times your wall was visited</p>
        </div>

        {/* Signatures Today */}
        <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
          <div className="text-4xl font-bold text-green-700">
            {stats.totalSigns}
          </div>
          <p className="text-sm text-stone-600 mt-1">Signature Events</p>
          <p className="text-xs text-stone-500 mt-3">Sign-ups tracked</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Recent Activity</h2>
        {stats.lastEntry ? (
          <div className="space-y-3">
            <div className="flex items-start justify-between p-4 bg-stone-50 rounded-lg">
              <div>
                <p className="font-semibold text-stone-900">
                  {stats.lastEntry.userName}
                </p>
                <p className="text-sm text-stone-600">
                  {stats.lastEntry.memoryText
                    ? `"${stats.lastEntry.memoryText.substring(0, 50)}..."`
                    : "Left a signature"}
                </p>
              </div>
              <p className="text-xs text-stone-500">
                {new Date(stats.lastEntry.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-stone-500">No activity yet</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/"
            className="p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-700 transition-colors">
            <p className="font-semibold text-stone-900">View Your Wall</p>
            <p className="text-sm text-stone-600">See how it looks to visitors</p>
          </Link>
          <Link
            href="/dashboard/entries"
            className="p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-700 transition-colors">
            <p className="font-semibold text-stone-900">Manage Entries</p>
            <p className="text-sm text-stone-600">Moderate or delete signatures</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
