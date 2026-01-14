"use client";

import { Input } from "@/components/ui/input";
import { DialogFullWidthButton } from "@/components/ui/dialog-buttons";
import { store } from "@/store/store";
import { Tenant, User, UserRole } from "@/types/types";
import { useState } from "react";
import { generateUUID } from "@/lib/uuid";
import { showToast } from "@/lib/toast";
import {
  signupSchema,
  type SignupFormData,
  getFieldError,
  hasFieldError,
} from "@/lib/validations";
import { z } from "zod";
import { ARIA_LABELS, ARIA_DESCRIPTIONS } from "@/lib/accessibility";

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    ownerName: "",
    ownerEmail: "",
    subdomainName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodError | null>(null);
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
    // Clear errors when user types
    if (errors) {
      setErrors(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    try {
      // Validate with Zod
      const result = signupSchema.safeParse(formData);

      if (!result.success) {
        setErrors(result.error);
        setIsLoading(false);
        // Show first error message
        const firstError = result.error.errors[0];
        showToast.error(firstError.message);
        return;
      }

      const { ownerName, ownerEmail, subdomainName } = result.data;

      // Normalize subdomain
      const subdomain = subdomainName
        .toLowerCase()
        .replaceAll(/[^a-z0-9-]/g, "");

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

      // Track event
      store.track(tenantId, "tenant_created", {
        subdomain,
      });

      showToast.success(`Welcome, ${ownerName}! Your wall is ready.`);

      // Redirect to tenant dashboard (not the public wall)
      let dashboardUrl: string;

      if (typeof globalThis !== "undefined" && globalThis.window) {
        const host = globalThis.location?.hostname || "echosign.io";
        const protocol = globalThis.location?.protocol || "https:";
        const port = globalThis.location?.port || "";

        if (host === "localhost" || host === "127.0.0.1") {
          // Plain localhost: use path-based routing (/tenant/cs/dashboard)
          dashboardUrl = `${protocol}//${host}${
            port ? `:${port}` : ""
          }/tenant/${subdomain}/dashboard`;
        } else if (host.includes("lvh.me")) {
          // lvh.me: use subdomain-based routing (cs.lvh.me/dashboard)
          dashboardUrl = `${protocol}//${subdomain}.${host}${
            port ? `:${port}` : ""
          }/dashboard`;
        } else {
          // Production or other: use subdomain
          const baseDomain = host.split(".").slice(-2).join(".");
          dashboardUrl = `${protocol}//${subdomain}.${baseDomain}/dashboard`;
        }
      } else {
        dashboardUrl = `https://${subdomain}.echosign.io/dashboard`;
      }

      globalThis.location.href = dashboardUrl;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      showToast.error(msg);
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
           onChange={(e) => {
             setFormData((prev) => ({ ...prev, ownerName: e.target.value }));
             if (errors) setErrors(null);
           }}
           placeholder="e.g., Jane Doe"
           className={`w-full ${
             hasFieldError(errors, "ownerName")
               ? "border-red-500 focus:border-red-500 focus:ring-red-500"
               : ""
           }`}
           required
           aria-label={ARIA_LABELS.SIGNATURE.NAME}
           aria-required="true"
           aria-invalid={hasFieldError(errors, "ownerName")}
           aria-describedby={hasFieldError(errors, "ownerName") ? ARIA_DESCRIPTIONS.SIGNUP.NAME_ERROR : undefined}
         />
        {hasFieldError(errors, "ownerName") && (
          <p className="text-xs text-red-600 font-medium">
            {getFieldError(errors, "ownerName")}
          </p>
        )}
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
           value={formData.ownerEmail || ""}
           onChange={(e) => {
             setFormData((prev) => ({ ...prev, ownerEmail: e.target.value }));
             if (errors) setErrors(null);
           }}
           placeholder="your@email.com"
           className={`w-full ${
             hasFieldError(errors, "ownerEmail")
               ? "border-red-500 focus:border-red-500 focus:ring-red-500"
               : ""
           }`}
           aria-label={ARIA_LABELS.SIGNATURE.EMAIL}
           aria-invalid={hasFieldError(errors, "ownerEmail")}
           aria-describedby={hasFieldError(errors, "ownerEmail") ? ARIA_DESCRIPTIONS.SIGNUP.EMAIL_ERROR : undefined}
         />
        {hasFieldError(errors, "ownerEmail") && (
          <p className="text-xs text-red-600 font-medium">
            {getFieldError(errors, "ownerEmail")}
          </p>
        )}
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
             className={`flex-1 ${
               hasFieldError(errors, "subdomainName") ||
               subdomainAvailable === false
                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                 : ""
             }`}
             required
             aria-label={ARIA_LABELS.SPACE.NAME}
             aria-required="true"
             aria-invalid={hasFieldError(errors, "subdomainName") || subdomainAvailable === false}
             aria-describedby={hasFieldError(errors, "subdomainName") ? ARIA_DESCRIPTIONS.SIGNUP.SUBDOMAIN_ERROR : undefined}
           />
          <span className="text-xs text-stone-500 whitespace-nowrap">.echosign.io</span>
        </div>
        <p className="text-xs text-stone-500">
          Your unique wall URL (3-30 characters, lowercase letters, numbers, and dashes)
        </p>
        {subdomainAvailable === true && (
          <p className="text-xs text-green-600 font-semibold">✓ Available</p>
        )}
        {(subdomainAvailable === false || hasFieldError(errors, "subdomainName")) && (
          <p className="text-xs text-red-600 font-semibold">
            {getFieldError(errors, "subdomainName") || "✗ Already taken"}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <DialogFullWidthButton
        type="submit"
        disabled={isLoading || subdomainAvailable === false || !!errors}
        isLoading={isLoading}
      >
        {isLoading ? "Setting up..." : "Get Started"}
      </DialogFullWidthButton>
    </form>
  );
}
