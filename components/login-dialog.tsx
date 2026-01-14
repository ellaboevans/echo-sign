"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { store } from "@/store/store";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
  loginSchema,
  getFieldError,
  hasFieldError,
} from "@/lib/validations";
import { z } from "zod";
import { ARIA_LABELS, ARIA_DESCRIPTIONS } from "@/lib/accessibility";
import { DialogFullWidthButton } from "@/components/ui/dialog-buttons";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  children: ReactNode;
};

export function LoginDialog({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setError(null);
    
      setIsLoading(false);
    }
  }, [open]);

  useEffect(() => {
    // Pre-fill from query params, useful if redirected to login
    const subdomainParam = searchParams.get("subdomain");
    if (subdomainParam) {
      setSubdomain(subdomainParam);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    

    // Validate with Zod
    const result = loginSchema.safeParse({ subdomain: subdomain.trim() });

    if (!result.success) {
      setIsLoading(false);
      const firstError = result.error.errors[0];
      setError(firstError.message);
      return;
    }

    // Simulate network delay
    setTimeout(() => {
      try {
        const normalizedSubdomain = result.data.subdomain.toLowerCase();
        const tenant = store.getTenantBySubdomain(normalizedSubdomain);
        if (!tenant) {
          setError("Account not found. Please check your subdomain.");
          setIsLoading(false);
          return;
        }
        const owner = store.getUserById(tenant.ownerId);
        if (!owner) {
          setError("Account data corrupted. Please sign up again.");
          setIsLoading(false);
          return;
        }

        store.setCurrentUser(owner);
        store.setCurrentTenant(tenant);

        showToast.success(`Welcome back, ${owner.name}! Redirecting...`);

        if (typeof window !== "undefined") {
          setTimeout(() => {
            const host = window.location.host;
            const protocol = window.location.protocol;
            window.location.href = `${protocol}//${tenant.subdomain}.${host}/dashboard`;
          }, 1000);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-stone-900 text-balance">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-pretty">
            Log in to your account to manage your signature walls.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="subdomain-dialog"
                className="block text-sm font-semibold text-stone-900"
              >
                Your Subdomain
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="subdomain-dialog"
                  type="text"
                  value={subdomain}
                  onChange={(e) => {
                    setSubdomain(e.target.value);
                    setError(null);
                  }}
                  placeholder="myevent"
                  disabled={isLoading}
                  required
                  aria-invalid={!!error || hasFieldError(null, "subdomain")}
                  aria-describedby="subdomain-error"
                  aria-label={ARIA_LABELS.AUTH.SUBDOMAIN}
                  aria-required="true"
                  className={error || hasFieldError(null, "subdomain") ? "border-red-500" : ""}
                />
                <span className="text-sm text-stone-500 whitespace-nowrap">.echosign.io</span>
              </div>
              {(error || hasFieldError(null, "subdomain")) && (
                <p id="subdomain-error" className="text-sm text-red-600 font-medium">
                  {getFieldError(null, "subdomain") || error}
                </p>
              )}
            </div>
            <DialogFullWidthButton
              disabled={isLoading}
              isLoading={isLoading}
              type="submit"
            >
              Login
            </DialogFullWidthButton>
          </form>
        </div>
        <div className="text-center text-sm text-stone-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/onboarding"
            className="font-bold text-amber-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            Create one now
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
