"use client";

import { store } from "@/store/store";
import { useState, useEffect } from "react";

interface SpaceAnalytics {
  spaceId: string;
  spaceName: string;
  signatureCount: number;
  publicCount: number;
  views: number;
  signs: number;
  lastSigned?: number;
}

export default function AnalyticsPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [spaceAnalytics, setSpaceAnalytics] = useState<SpaceAnalytics[]>([]);
  const [totalStats, setTotalStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentTenant = store.getCurrentTenant();
    setTenant(currentTenant);

    if (currentTenant) {
      // Get all spaces for this tenant
      const spaces = store.getSpacesByTenant(currentTenant.id);
      const entries = store.getEntriesByTenant(currentTenant.id);
      const analytics = store.getAnalyticsByTenant(currentTenant.id);

      // Calculate per-space analytics
      const analytics_data = spaces.map((space) => {
        const spaceEntries = entries.filter(
          (e) => e.spaceId === space.id && !e.deletedAt
        );
        const spaceViews = analytics.filter(
          (a) => a.type === "view_space" && a.metadata?.spaceId === space.id
        ).length;
        const spaceSigns = analytics.filter(
          (a) => a.type === "sign_space" && a.metadata?.spaceId === space.id
        ).length;
        const lastEntry = spaceEntries.sort(
          (a, b) => b.createdAt - a.createdAt
        )[0];

        return {
          spaceId: space.id,
          spaceName: space.name,
          signatureCount: spaceEntries.length,
          publicCount: spaceEntries.filter((e) => e.visibility === "public")
            .length,
          views: spaceViews,
          signs: spaceSigns,
          lastSigned: lastEntry?.createdAt,
        };
      });

      setSpaceAnalytics(analytics_data);

      // Calculate total stats
      setTotalStats({
        totalSpaces: spaces.length,
        totalSignatures: entries.filter((e) => !e.deletedAt).length,
        totalViews: analytics.filter((a) => a.type === "view_space").length,
        totalSigns: analytics.filter((a) => a.type === "sign_space").length,
        avgSignaturesPerSpace:
          spaces.length > 0
            ? (entries.filter((e) => !e.deletedAt).length / spaces.length).toFixed(
                1
              )
            : 0,
      });
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !tenant || !totalStats) {
    return <div>Loading...</div>;
  }

  const sortedSpaces = [...spaceAnalytics].sort(
    (a, b) => b.signatureCount - a.signatureCount
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-stone-900">Analytics</h1>
        <p className="text-stone-600 mt-2">
          Overview of your spaces and visitor activity
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="text-3xl font-bold text-amber-700">
            {totalStats.totalSpaces}
          </div>
          <p className="text-sm text-stone-600 mt-1">Total Spaces</p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="text-3xl font-bold text-blue-700">
            {totalStats.totalSignatures}
          </div>
          <p className="text-sm text-stone-600 mt-1">Total Signatures</p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="text-3xl font-bold text-green-700">
            {totalStats.totalViews}
          </div>
          <p className="text-sm text-stone-600 mt-1">Total Views</p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="text-3xl font-bold text-purple-700">
            {totalStats.avgSignaturesPerSpace}
          </div>
          <p className="text-sm text-stone-600 mt-1">Avg per Space</p>
        </div>
      </div>

      {/* Per-Space Analytics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Per-Space Breakdown</h2>
        
        {sortedSpaces.length > 0 ? (
          <div className="space-y-3">
            {sortedSpaces.map((space) => (
              <div
                key={space.spaceId}
                className="bg-white border border-stone-200 rounded-lg p-6">
                {/* Space Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {space.spaceName}
                    </h3>
                    {space.lastSigned && (
                      <p className="text-xs text-stone-500 mt-1">
                        Last signed:{" "}
                        {new Date(space.lastSigned).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700">
                      {space.signatureCount}
                    </div>
                    <p className="text-xs text-stone-600 mt-1">Signatures</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-700">
                      {space.publicCount}
                    </div>
                    <p className="text-xs text-stone-600 mt-1">Public</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-700">
                      {space.views}
                    </div>
                    <p className="text-xs text-stone-600 mt-1">Views</p>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-amber-700">
                      {space.signs}
                    </div>
                    <p className="text-xs text-stone-600 mt-1">Signups</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {space.views > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-600">Conversion Rate</span>
                      <span className="font-bold text-stone-700">
                        {space.signs > 0
                          ? ((space.signs / space.views) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-amber-700 h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            space.signs > 0
                              ? (space.signs / space.views) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-stone-50 border-2 border-dashed border-stone-200 rounded-lg text-center">
            <p className="text-stone-500">No spaces created yet</p>
            <p className="text-xs text-stone-400 mt-1">
              Create a space to start tracking analytics
            </p>
          </div>
        )}
      </div>

      {/* Insights */}
      {spaceAnalytics.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
          <h3 className="font-bold text-blue-900">Insights</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {sortedSpaces[0]?.signatureCount === 0 && (
              <li>
                • Your most popular space,{" "}
                <strong>{sortedSpaces[0]?.spaceName}</strong>, hasn't received
                any signatures yet. Consider sharing it with more people!
              </li>
            )}
            {sortedSpaces[0]?.signatureCount > 0 && (
              <li>
                • Your most popular space,{" "}
                <strong>{sortedSpaces[0]?.spaceName}</strong>, has{" "}
                {sortedSpaces[0]?.signatureCount} signature
                {sortedSpaces[0]?.signatureCount !== 1 ? "s" : ""}.
              </li>
            )}
            {totalStats.totalViews > totalStats.totalSigns && (
              <li>
                • Your spaces have {totalStats.totalViews} views but only{" "}
                {totalStats.totalSigns} signatures. Share your links to increase
                conversions!
              </li>
            )}
            {totalStats.totalSpaces > 1 && (
              <li>
                • You have {totalStats.totalSpaces} spaces. Try creating a
                unique experience for each one!
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
