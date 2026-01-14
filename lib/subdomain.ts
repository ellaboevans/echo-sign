/**
 * Utility functions for subdomain detection
 * Handles both production (subdomain-based) and development (path-based) routing
 */

/**
 * Extracts subdomain from hostname
 * @param hostname - The hostname to parse (defaults to window.location.hostname)
 * @returns The subdomain string or null if no subdomain detected
 */
export function getSubdomainFromHost(hostname?: string): string | null {
  if (typeof window === "undefined") return null;
  
  const host = hostname || window.location.hostname;
  
  // Development/localhost cases
  if (host === "localhost" || host === "127.0.0.1" || host.startsWith("127.")) {
    return null;
  }
  
  if (host === "lvh.me") {
    return null;
  }
  
  if (host.endsWith(".lvh.me")) {
    return host.replace(".lvh.me", "");
  }
  
  // Production subdomain detection
  if (host.includes(".")) {
    const parts = host.split(".");
    // subdomain.domain.tld -> parts.length > 2
    if (parts.length > 2) {
      return parts[0];
    }
    // domain.tld (no subdomain) -> parts.length === 2
    if (parts.length === 2 && parts[0] !== "www") {
      return null;
    }
  }
  
  return null;
}

/**
 * Gets the current subdomain from the browser
 * @returns The subdomain or null
 */
export function getCurrentSubdomain(): string | null {
  return getSubdomainFromHost();
}
