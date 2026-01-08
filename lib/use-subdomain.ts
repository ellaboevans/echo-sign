import { useHeaders } from "next/headers";

export function useSubdomain(): string | null {
  try {
    const headersList = useHeaders();
    const subdomain = headersList.get("x-subdomain");
    return subdomain || null;
  } catch {
    // useHeaders() is only available in RSC, not client components
    return null;
  }
}

export function getSubdomainFromPath(): string | null {
  if (typeof window === "undefined") return null;
  
  const host = window.location.host;
  const parts = host.split(".");
  
  if (parts.length > 1 && parts[0] !== "www" && parts[0] !== "localhost") {
    return parts[0];
  }
  
  return null;
}
