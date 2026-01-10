export function getSubdomainFromHost(): string | null {
  if (typeof globalThis === "undefined") return null;

  const host = globalThis.location?.host;
  if (!host) return null;

  const parts = host.split(".");

  if (
    parts.length > 1 &&
    parts[0] !== "www" &&
    parts[0] !== "localhost" &&
    !parts[0].startsWith("127.")
  ) {
    return parts[0];
  }

  return null;
}
