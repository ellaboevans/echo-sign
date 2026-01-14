"use client";

import { store } from "@/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutConfirmationDialog from "@/components/logout-confirmation-dialog";
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
import { getCurrentSubdomain } from "@/lib/subdomain";

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const subdomain = getCurrentSubdomain();

    // Load tenant from subdomain
    const foundTenant = subdomain
      ? store.getTenantBySubdomain(subdomain)
      : store.getCurrentTenant();

    // Get user from localStorage
    const foundUser = store.getCurrentUser();

    // Verify user is owner of this tenant
    if (foundTenant && foundUser && foundUser.id === foundTenant.ownerId) {
      setTenant(foundTenant);
      setUser(foundUser);
    }

    setIsLoading(false);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      store.clearCurrentUser();
      // Redirect to root domain landing page
      const protocol = globalThis.location.protocol;
      const port = globalThis.location.port ? `:${globalThis.location.port}` : "";
      globalThis.location.href = `${protocol}//lvh.me${port}/`;
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!tenant || !user) {
    return (
      <div className="min-h-dvh">
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
    <div className="min-h-dvh bg-background">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 z-40 h-dvh w-64 border-r bg-card">
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
                      ? "bg-amber-700 text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                  <Icon className="size-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="size-9">
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
              onClick={handleLogoutClick}>
              <LogOut className="mr-2 size-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">{children}</div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmationDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </div>
  );
}
