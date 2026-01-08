"use client";

import React, { useState, useEffect } from "react";
import TenantWallView from "@/components/tenant-wall-view";

export default function TenantWallPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => {
      setSubdomain(p.subdomain);
    });
  }, [params]);

  if (!subdomain) return null;

  return <TenantWallView tenantParam={subdomain} />;
}
