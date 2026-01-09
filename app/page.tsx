"use client";

import GridBackground from "@/components/grid-background";
import FeaturesSection from "@/components/landing/features-section";
import FinalCtaSection from "@/components/landing/final-cta-section";
import FooterSection from "@/components/landing/footer-section";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import UseCasesSection from "@/components/landing/use-cases-section";
import ValuesSection from "@/components/landing/values-section";
import TenantWallView from "@/components/tenant-wall-view";
import { useEffect, useState } from "react";

export default function RootPage() {
  const [isReady, setIsReady] = useState(false);
  const [hasSubdomain, setHasSubdomain] = useState(false);

  useEffect(() => {
    if (typeof globalThis === "undefined") return;

    const host = globalThis.location.hostname;
    let subdomain: string | null = null;

    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.startsWith("127.")
    ) {
      subdomain = null;
    } else if (host === "lvh.me") {
      subdomain = null;
    } else if (host.endsWith(".lvh.me")) {
      subdomain = host.replace(".lvh.me", "");
    } else if (host.includes(".")) {
      const parts = host.split(".");
      if (parts.length > 2) {
        subdomain = parts[0];
      } else if (parts.length === 2 && parts[0] !== "www") {
        subdomain = null;
      }
    }

    const timer = setTimeout(() => {
      setHasSubdomain(!!subdomain);
      setIsReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null;
  }

  // If on subdomain, show tenant wall
  if (hasSubdomain) {
    return <TenantWallView />;
  }

  // Otherwise, show landing page
  return (
    <div className="relative min-h-screen bg-linear-to-br from-stone-50 via-white to-amber-50">
      <GridBackground />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <ValuesSection />
      <FinalCtaSection />
      <FooterSection />
    </div>
  );
}
