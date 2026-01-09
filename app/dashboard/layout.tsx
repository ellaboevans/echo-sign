"use client";

import { store } from "@/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  LayoutGrid,
  FileText,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tenant, User } from "@/types/types";

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof globalThis === "undefined") return;

    const host = globalThis.location.hostname;
    let subdomain: string | null = null;

    // Detect subdomain (same logic as root page)
    if (host.endsWith(".lvh.me")) {
      subdomain = host.replace(".lvh.me", "");
    } else if (
      host !== "localhost" &&
      host !== "127.0.0.1" &&
      !host.startsWith("127.") &&
      host !== "lvh.me" &&
      host.includes(".")
    ) {
      const parts = host.split(".");
      if (parts.length > 2) {
        subdomain = parts[0];
      }
    }

    // Load tenant from subdomain
    let foundTenant: Tenant | null = null;
    let foundUser: User | null = null;

    if (subdomain) {
      foundTenant = store.getTenantBySubdomain(subdomain)!;
    } else {
      // Fallback: try to get from localStorage
      foundTenant = store.getCurrentTenant();
    }

    // Get user from localStorage
    foundUser = store.getCurrentUser();

    const timer = setTimeout(() => {
      // Verify user is owner of this tenant
      if (foundTenant && foundUser && foundUser.id === foundTenant.ownerId) {
        setTenant(foundTenant);
        setUser(foundUser);
      }

      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    store.clearCurrentUser();
    // Redirect to root domain landing page
    const protocol = globalThis.location.protocol;
    const port = globalThis.location.port ? `:${globalThis.location.port}` : "";
    globalThis.location.href = `${protocol}//lvh.me${port}/`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!tenant || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Access denied or not logged in
          </p>
          <Link href="/onboarding">
            <Button variant="link">← Sign Up</Button>
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Spaces",
      href: "/dashboard/spaces",
      icon: LayoutGrid,
    },
    {
      title: "Signatures",
      href: "/dashboard/entries",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-bold tracking-tight">
              {tenant.displayName}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                {user.email && (
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">{children}</div>
    </div>
  );
}
