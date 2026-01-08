"use client";

import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { useTenant } from "@/store/tenant-context";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTenant } = useTenant();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = window.location.hostname;
    let subdomain: string | null = null;

    // Detect subdomain
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

    // Load tenant from subdomain if present
    if (subdomain) {
      const tenant = store.getTenantBySubdomain(subdomain);
      if (tenant) {
        setTenant(tenant);
        store.track(tenant.id, "view_wall");
      }
    }

    setIsReady(true);
  }, [setTenant]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
