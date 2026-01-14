"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

interface LandingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

/**
 * LandingButton Component
 *
 * Purpose: Standardized button for landing page sections
 * - Maintains visual prominence for CTAs
 * - Ensures consistency across all landing sections
 * - Provides proper accessibility features
 *
 * Variants:
 * - primary: Amber background (calls-to-action)
 * - secondary: Stone border (alternative actions)
 *
 * Usage:
 * <LandingButton href="/onboarding" variant="primary">
 *   Get Started Free
 * </LandingButton>
 *
 * <LandingButton onClick={handleClick} variant="secondary">
 *   Sign In
 * </LandingButton>
 */

const baseStyles =
  "px-8 py-3 font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 focus:outline-none focus:ring-2";

const variantStyles = {
  primary:
    "bg-amber-700 text-white hover:bg-amber-800 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "border border-stone-300 text-stone-900 hover:bg-stone-50 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed",
};

export function LandingButton({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: LandingButtonProps) {
  const styles = cn(baseStyles, variantStyles[variant], className);

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}

export default LandingButton;
