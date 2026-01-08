// Universal UUID generator for browser and Node.js
export function generateUUID(): string {
  if (typeof window !== "undefined" && globalThis.crypto?.randomUUID) {
    // Browser
    return crypto.randomUUID();
  }

  // Node.js fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
