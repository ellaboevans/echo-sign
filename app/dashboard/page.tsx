"use client";

import { store } from "@/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Tenant } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, LayoutGrid, PenTool, Eye, Loader2 } from "lucide-react";

interface Stats {
  totalSpaces: number;
  totalSignatures: number;
  totalViews: number;
}

export default function DashboardPage() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTenant = store.getCurrentTenant();
    timer = setTimeout(() => {
      setTenant(currentTenant);
    }, 0);

    if (currentTenant) {
      const spaces = store.getSpacesByTenant(currentTenant.id);
      const entries = store
        .getEntriesByTenant(currentTenant.id)
        .filter((e) => !e.deletedAt);
      const analytics = store.getAnalyticsByTenant(currentTenant.id);

      timer = setTimeout(() => {
        setStats({
          totalSpaces: spaces.length,
          totalSignatures: entries.length,
          totalViews: analytics.filter((a) => a.type === "view_wall").length,
        });
      }, 0);
    }
    return () => clearTimeout(timer);
  }, []);

  if (!tenant || !stats) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Spaces",
      value: stats.totalSpaces,
      description: "Walls you've created",
      icon: LayoutGrid,
      trend: "+12% from last month",
      trendUp: true,
    },
    {
      title: "Total Signatures",
      value: stats.totalSignatures,
      description: "People who've signed",
      icon: PenTool,
      trend: "+19% from last month",
      trendUp: true,
    },
    {
      title: "Wall Views",
      value: stats.totalViews,
      description: "Times walls were visited",
      icon: Eye,
      trend: "+8% from last month",
      trendUp: true,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {tenant.displayName}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index + 1}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Your wall performance at a glance</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Active Spaces
                  </p>
                  <p className="text-sm text-muted-foreground">
                    All your walls are currently active and collecting
                    signatures
                  </p>
                </div>
                <div className="ml-auto font-medium">{stats.totalSpaces}</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Recent Activity
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stats.totalSignatures} signatures collected across all
                    spaces
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {stats.totalSignatures}
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Engagement</p>
                  <p className="text-sm text-muted-foreground">
                    Total wall views from visitors
                  </p>
                </div>
                <div className="ml-auto font-medium">{stats.totalViews}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your walls and signatures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/spaces" className="block">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  Manage Spaces
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/entries" className="block">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  View Signatures
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/analytics" className="block">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Analytics
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
