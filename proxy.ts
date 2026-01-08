import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Extract subdomain from host
  // localhost:3000 → null (path-based: /tenant/cs)
  // cs.lvh.me:3000 → "cs" (subdomain-based, like production!)
  // cs.echosign.io → "cs" (production)
  let subdomain: string | null = null;

  const parts = host.split(".");
  
  // Check if this has a subdomain
  // lvh.me always resolves *.lvh.me to 127.0.0.1, so we can test subdomains locally
  if (parts.length >= 2) {
    const potentialSubdomain = parts[0];
    
    // Skip reserved names
    if (
      potentialSubdomain !== "www" &&
      potentialSubdomain !== "localhost" &&
      potentialSubdomain !== "127" &&
      potentialSubdomain !== "localhost.localdomain" &&
      !potentialSubdomain.startsWith("127")
    ) {
      // It's a subdomain
      subdomain = potentialSubdomain;
    }
  }

  // Add subdomain to headers (used by tenant layout)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-subdomain", subdomain || "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
