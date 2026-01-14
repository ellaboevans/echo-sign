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
import { getCurrentSubdomain } from "@/lib/subdomain";

export default function RootPage() {
  const [isReady, setIsReady] = useState(false);
  const [hasSubdomain, setHasSubdomain] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const subdomain = getCurrentSubdomain();
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
  return (
    <div className="relative min-h-dvh bg-surface-50">
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
