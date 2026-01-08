"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { store } from "@/store/store";
import { useTenant } from "@/store/tenant-context";
import { Tenant, User, UserRole } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateUUID } from "@/lib/uuid";

export default function SignupForm() {
  const router = useRouter();
  const { setTenant, setUser } = useTenant();

  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    subdomainName: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(
    null
  );

  const checkSubdomainAvailability = (subdomain: string) => {
    if (!subdomain) {
      setSubdomainAvailable(null);
      return;
    }

    const normalized = subdomain.toLowerCase().replaceAll(/[^a-z0-9-]/g, "");

    if (normalized.length < 3) {
      setSubdomainAvailable(false);
      return;
    }

    const existingTenant = store.getTenantBySubdomain(normalized);
    setSubdomainAvailable(!existingTenant);
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, subdomainName: value }));
    checkSubdomainAvailability(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { ownerName, ownerEmail, subdomainName } = formData;

      // Validate inputs
      if (!ownerName.trim()) {
        throw new Error("Owner name is required");
      }

      const subdomain = subdomainName
        .toLowerCase()
        .replaceAll(/[^a-z0-9-]/g, "");

      if (subdomain.length < 3) {
        throw new Error("Subdomain must be at least 3 characters");
      }

      if (subdomainAvailable === false) {
        throw new Error("Subdomain is already taken");
      }

      // Create owner user
      const userId = generateUUID();
      const user: User = {
        id: userId,
        tenantId: generateUUID(), // Will be updated after tenant creation
        name: ownerName,
        email: ownerEmail || undefined,
        role: UserRole.OWNER,
        createdAt: Date.now(),
      };

      // Create tenant
      const tenantId = user.tenantId;
      const tenant: Tenant = {
        id: tenantId,
        subdomain,
        displayName: ownerName,
        ownerId: userId,
        createdAt: Date.now(),
      };

      // Update user with correct tenantId
      user.tenantId = tenantId;

      // Save to store
      store.saveTenant(tenant);
      store.saveUser(user);

      // Set context
      setTenant(tenant);
      setUser(user);

      // Track event
      store.track(tenantId, "tenant_created", {
        subdomain,
      });

      // Redirect to tenant dashboard (not the public wall)
      let dashboardUrl: string;
      
      if (typeof globalThis.window !== "undefined") {
        const host = globalThis.location.hostname;
        const protocol = globalThis.location.protocol;
        const port = globalThis.location.port;
        
        if (host === "localhost" || host === "127.0.0.1") {
          // Plain localhost: use path-based routing (/tenant/cs/dashboard)
          dashboardUrl = `${protocol}//${host}${port ? `:${port}` : ""}/tenant/${subdomain}/dashboard`;
        } else if (host.includes("lvh.me")) {
          // lvh.me: use subdomain-based routing (cs.lvh.me/dashboard)
          dashboardUrl = `${protocol}//${subdomain}.${host}${port ? `:${port}` : ""}/dashboard`;
        } else {
          // Production or other: use subdomain
          const baseDomain = host.split(".").slice(-2).join(".");
          dashboardUrl = `${protocol}//${subdomain}.${baseDomain}/dashboard`;
        }
      } else {
        dashboardUrl = `https://${subdomain}.echosign.io/dashboard`;
      }

      setTimeout(() => {
        globalThis.location.href = dashboardUrl;
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {/* Owner Name */}
      <div className="space-y-2">
        <label
          htmlFor="ownerName"
          className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
          Your Name
        </label>
        <Input
          id="ownerName"
          type="text"
          value={formData.ownerName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, ownerName: e.target.value }))
          }
          placeholder="e.g., Jane Doe"
          className="w-full"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="ownerEmail"
          className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
          Email (Optional)
        </label>
        <Input
          id="ownerEmail"
          type="email"
          value={formData.ownerEmail}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, ownerEmail: e.target.value }))
          }
          placeholder="your@email.com"
          className="w-full"
        />
      </div>

      {/* Subdomain */}
      <div className="space-y-2">
        <label
          htmlFor="subdomainName"
          className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
          Subdomain
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="subdomainName"
            type="text"
            value={formData.subdomainName}
            onChange={handleSubdomainChange}
            placeholder="e.g., cs"
            className="flex-1"
            required
          />
          <span className="text-sm text-stone-500">.echosign.io</span>
        </div>
        <p className="text-xs text-stone-500">
          Your unique wall URL (3+ characters, alphanumeric + dashes)
        </p>
        {subdomainAvailable === true && (
          <p className="text-xs text-green-600 font-semibold">✓ Available</p>
        )}
        {subdomainAvailable === false && (
          <p className="text-xs text-red-600 font-semibold">✗ Already taken</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || subdomainAvailable === false}
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold uppercase">
        {isLoading ? "Setting up..." : "Get Started"}
      </Button>
    </form>
  );
}
