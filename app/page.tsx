"use client";

import LandingHero from "@/components/landing-hero";
import TenantWallView from "@/components/tenant-wall-view";
import { useEffect, useState } from "react";

export default function RootPage() {
  const [isReady, setIsReady] = useState(false);
  const [hasSubdomain, setHasSubdomain] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = window.location.hostname;
    const parts = host.split(".");
    let subdomain: string | null = null;

    // Detect if this is a subdomain
    // lvh.me → no subdomain
    // example.lvh.me → subdomain = "example"
    // example.echosign.io → subdomain = "example"
    // localhost → no subdomain
    // cs.localhost → no subdomain
    
    if (host === "localhost" || host === "127.0.0.1" || host.startsWith("127.")) {
      // Plain localhost/127.0.0.1
      subdomain = null;
    } else if (host === "lvh.me") {
      // Just the base domain
      subdomain = null;
    } else if (host.endsWith(".lvh.me")) {
      // Subdomain on lvh.me: example.lvh.me → "example"
      subdomain = host.replace(".lvh.me", "");
    } else if (host.includes(".")) {
      // Other domains: check if it's a subdomain
      const parts = host.split(".");
      if (parts.length > 2) {
        // Has subdomain: cs.echosign.io → "cs"
        subdomain = parts[0];
      } else if (parts.length === 2 && parts[0] !== "www") {
        // Could be subdomain on 2-letter TLD, but assume it's just base domain
        subdomain = null;
      }
    }

    setHasSubdomain(!!subdomain);
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  // If on subdomain, show tenant wall
  if (hasSubdomain) {
    return <TenantWallView />;
  }

  // Otherwise, show landing page
  return <LandingHero />;
}
