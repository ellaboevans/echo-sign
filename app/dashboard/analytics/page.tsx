"use client";

import { store } from "@/store/store";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutGrid,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Loader2,
  Lightbulb,
  Activity,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tenant } from "@/types/types";

interface SpaceAnalytics {
  spaceId: string;
  spaceName: string;
  signatureCount: number;
  publicCount: number;
  views: number;
  signs: number;
  lastSigned?: number;
}

interface TotalStats {
  totalSpaces: number;
  totalSignatures: number;
  totalViews: number;
  totalSigns: number;
  avgSignaturesPerSpace: string | number;
}

export default function AnalyticsPage() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [spaceAnalytics, setSpaceAnalytics] = useState<SpaceAnalytics[]>([]);
  const [totalStats, setTotalStats] = useState<TotalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTenant = store.getCurrentTenant();
    timer = setTimeout(() => {
      setTenant(currentTenant);
    }, 0);

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
        const lastEntry = spaceEntries.toSorted(
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

      timer = setTimeout(() => {
        setSpaceAnalytics(analytics_data);

        setTotalStats({
          totalSpaces: spaces.length,
          totalSignatures: entries.filter((e) => !e.deletedAt).length,
          totalViews: analytics.filter((a) => a.type === "view_space").length,
          totalSigns: analytics.filter((a) => a.type === "sign_space").length,
          avgSignaturesPerSpace:
            spaces.length > 0
              ? (
                  entries.filter((e) => !e.deletedAt).length / spaces.length
                ).toFixed(1)
              : 0,
        });
      }, 0);

      // Calculate total stats
    }
    timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !tenant || !totalStats) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const sortedSpaces = [...spaceAnalytics].sort(
    (a, b) => b.signatureCount - a.signatureCount
  );

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Overview of your spaces and visitor activity
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalSpaces}</div>
            <p className="text-xs text-muted-foreground">
              Active walls created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Signatures
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.totalSignatures}
            </div>
            <p className="text-xs text-muted-foreground">Across all spaces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalViews}</div>
            <p className="text-xs text-muted-foreground">Wall page visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Space</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.avgSignaturesPerSpace}
            </div>
            <p className="text-xs text-muted-foreground">Average signatures</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-Space Analytics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Per-Space Breakdown</h3>
        </div>

        {sortedSpaces.length > 0 ? (
          <div className="grid gap-4">
            {sortedSpaces.map((space) => {
              const conversionRate =
                space.views > 0 && space.signs > 0
                  ? ((space.signs / space.views) * 100).toFixed(1)
                  : 0;

              return (
                <Card key={space.spaceId}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{space.spaceName}</CardTitle>
                        {space.lastSigned && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              Last signed:{" "}
                              {new Date(space.lastSigned).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      {space.signatureCount > 0 && (
                        <Badge variant="secondary">
                          {space.signatureCount} signatures
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Signatures
                        </p>
                        <p className="text-2xl font-bold">
                          {space.signatureCount}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Public</p>
                        <p className="text-2xl font-bold">
                          {space.publicCount}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Views</p>
                        <p className="text-2xl font-bold">{space.views}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Signups</p>
                        <p className="text-2xl font-bold">{space.signs}</p>
                      </div>
                    </div>

                    {/* Conversion Rate */}
                    {space.views > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Conversion Rate
                          </span>
                          <span className="font-medium">{conversionRate}%</span>
                        </div>
                        <Progress
                          value={Number(conversionRate)}
                          className="h-2"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardHeader className="text-center pb-4">
              <CardTitle>No spaces created yet</CardTitle>
              <CardDescription>
                Create a space to start tracking analytics
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>

      {/* Insights */}
      {spaceAnalytics.length > 0 && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900">Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-800">
              {sortedSpaces[0]?.signatureCount === 0 && (
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Your most popular space,{" "}
                    <strong>{sortedSpaces[0]?.spaceName}</strong>, hasn&pos;t
                    received any signatures yet. Consider sharing it with more
                    people!
                  </span>
                </li>
              )}
              {sortedSpaces[0]?.signatureCount > 0 && (
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Your most popular space,{" "}
                    <strong>{sortedSpaces[0]?.spaceName}</strong>, has{" "}
                    {sortedSpaces[0]?.signatureCount} signature
                    {sortedSpaces[0]?.signatureCount === 1 ? "" : "s"}.
                  </span>
                </li>
              )}
              {totalStats.totalViews > totalStats.totalSigns && (
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Your spaces have {totalStats.totalViews} views but only{" "}
                    {totalStats.totalSigns} signature
                    {totalStats.totalSigns === 1 ? "" : "s"}. Share your links
                    to increase conversions!
                  </span>
                </li>
              )}
              {totalStats.totalSpaces > 1 && (
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    You have {totalStats.totalSpaces} spaces. Try creating a
                    unique experience for each one!
                  </span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
