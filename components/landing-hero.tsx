import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingHero() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = window.location.hostname;
    const parts = host.split(".");

    if (host.endsWith(".lvh.me")) {
      const sub = host.replace(".lvh.me", "");
      setSubdomain(sub);
    } else if (host.includes(".") && !host.startsWith("localhost")) {
      const parts = host.split(".");
      if (parts.length > 2) {
        setSubdomain(parts[0]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl text-center space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-stone-900">
            Echo Sign
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 font-serif italic">
            Create your digital legacy wall. Let others leave their mark in your space.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="space-y-3">
            <div className="text-3xl">✍️</div>
            <h3 className="font-bold text-stone-900">Collect Signatures</h3>
            <p className="text-sm text-stone-600">
              Let visitors sign your wall with their digital mark and memories.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-3xl">📍</div>
            <h3 className="font-bold text-stone-900">Your Domain</h3>
            <p className="text-sm text-stone-600">
              Get your own space with a custom subdomain. Completely yours.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-3xl">🎨</div>
            <h3 className="font-bold text-stone-900">Manage Spaces</h3>
            <p className="text-sm text-stone-600">
              Create multiple walls for different events, communities, or moments.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/onboarding"
              className="bg-amber-700 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 duration-300 ease-in-out active:scale-95">
              Get Started
            </Link>
            <Link
              href={subdomain ? `/login?subdomain=${subdomain}` : "/login"}
              className="bg-stone-200 text-stone-900 font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-stone-300 transition-all shadow-xl shadow-stone-200 duration-300 ease-in-out active:scale-95">
              Login
            </Link>
          </div>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Free to start. No credit card required. Create your first wall in seconds.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-12 border-t border-stone-200 text-center text-xs text-stone-500">
        <p>Made with care for memories that matter.</p>
      </div>
    </div>
  );
}
