"use client";

import { useState, useEffect } from "react";
import { store } from "@/store/store";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [subdomain, setSubdomain] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Pre-fill subdomain from query params if provided
    const subdomainParam = searchParams.get("subdomain");
    if (subdomainParam) {
      setSubdomain(subdomainParam);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Find tenant by subdomain
      const tenant = store.getTenantBySubdomain(subdomain.trim().toLowerCase());

      if (!tenant) {
        setError("Account not found. Please check your subdomain.");
        setIsLoading(false);
        return;
      }

      // Get the owner user for this tenant
      const owner = store.getUserById(tenant.ownerId);



      if (!owner) {
        setError("Account data corrupted. Please sign up again.");
        setIsLoading(false);
        return;
      }

      // Clear any corrupted localStorage first
      if (typeof window !== "undefined") {
        localStorage.removeItem("sig_dir_current_user");
        localStorage.removeItem("sig_dir_current_tenant");
      }

      // Set current user and tenant
      store.setCurrentUser(owner);
      store.setCurrentTenant(tenant);

      // Redirect to subdomain-based dashboard
      const protocol = window.location.protocol;
      const port = window.location.port ? `:${window.location.port}` : "";
      const host = window.location.hostname;
      let dashboardUrl = "/dashboard";
      
      if (host.endsWith(".lvh.me") || host === "lvh.me") {
        // lvh.me environment: redirect to subdomain.lvh.me
        dashboardUrl = `${protocol}//${tenant.subdomain}.lvh.me${port}/dashboard`;
      } else if (host.includes("echosign.io") || host === "echosign.io") {
        // Production environment
        dashboardUrl = `${protocol}//${tenant.subdomain}.echosign.io/dashboard`;
      } else {
        // Local environment - fallback
        dashboardUrl = `${protocol}//${tenant.subdomain}.lvh.me${port}/dashboard`;
      }
      
      window.location.href = dashboardUrl;
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-stone-900">
            Echo Sign
          </h1>
          <h2 className="text-2xl font-bold text-stone-900">Welcome Back</h2>
          <p className="text-stone-600">
            Log in to your account to manage your signature walls.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Subdomain Input */}
          <div className="space-y-2">
            <label htmlFor="subdomain" className="block text-sm font-semibold text-stone-900">
              Your Subdomain
            </label>
            <div className="flex items-center">
              <input
                id="subdomain"
                type="text"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder="myevent"
                className="flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                disabled={isLoading}
                required
              />
              <span className="ml-3 text-sm text-stone-500">.lvh.me</span>
            </div>
            <p className="text-xs text-stone-500">
              Enter the subdomain you created when you signed up (e.g., "myevent")
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-stone-500">or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center space-y-3">
          <p className="text-stone-600">Don't have an account?</p>
          <Link
            href="/onboarding"
            className="inline-block bg-stone-200 text-stone-900 font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-stone-300 transition-all">
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link href="/" className="text-sm text-amber-700 hover:text-amber-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
