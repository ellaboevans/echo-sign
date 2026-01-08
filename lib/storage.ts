// Cross-domain storage using cookies + localStorage fallback

const COOKIE_DOMAIN = "lvh.me"; // Set to echosign.io in production

export function setItem(key: string, value: string) {
  if (typeof window === "undefined") return;

  // Save to localStorage
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error("localStorage error:", e);
  }

  // Also save to cookie (works across subdomains)
  try {
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; domain=${COOKIE_DOMAIN}; max-age=31536000; SameSite=Lax`;
  } catch (e) {
    console.error("cookie error:", e);
  }
}

export function getItem(key: string): string | null {
  if (typeof window === "undefined") return null;

  // Try localStorage first
  try {
    const value = localStorage.getItem(key);
    if (value) return value;
  } catch (e) {
    console.error("localStorage error:", e);
  }

  // Fall back to cookies
  try {
    const name = key + "=";
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name)) {
        return decodeURIComponent(cookie.substring(name.length));
      }
    }
  } catch (e) {
    console.error("cookie error:", e);
  }

  return null;
}

export function removeItem(key: string) {
  if (typeof window === "undefined") return;

  // Remove from localStorage
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("localStorage error:", e);
  }

  // Remove from cookies
  try {
    document.cookie = `${key}=; path=/; domain=${COOKIE_DOMAIN}; max-age=0; SameSite=Lax`;
  } catch (e) {
    console.error("cookie error:", e);
  }
}
