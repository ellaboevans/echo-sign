/**
 * Dialog Button Components
 * Standardized button components for consistent dialogs across the app
 */

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

/**
 * Primary Dialog Button (Submit, Save, Login, Create)
 * - Blue/Amber color
 * - Bold, uppercase text
 * - Hover and active states
 * - Loading state support
 */
interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function DialogPrimaryButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  type = "submit",
  className = "",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-6 py-2.5 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

/**
 * Secondary Dialog Button (Cancel, Skip)
 * - Gray/Stone color
 * - Border style
 * - Regular text weight
 */
interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function DialogSecondaryButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 border border-stone-300 text-stone-900 font-medium rounded-lg hover:bg-stone-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Destructive Dialog Button (Delete, Logout, Remove)
 * - Red color
 * - Bold, uppercase text
 * - Warning visual state
 */
interface DestructiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function DialogDestructiveButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  type = "button",
  className = "",
}: DestructiveButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-6 py-2.5 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
}

/**
 * Dialog Button Group
 * Flex container with proper spacing and alignment
 */
interface DialogButtonGroupProps {
  children: ReactNode;
  justify?: "start" | "center" | "end" | "between";
  gap?: "tight" | "normal" | "loose";
  className?: string;
}

export function DialogButtonGroup({
  children,
  justify = "end",
  gap = "normal",
  className = "",
}: DialogButtonGroupProps) {
  const justifyClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  }[justify];

  const gapClass = {
    tight: "gap-2",
    normal: "gap-3",
    loose: "gap-4",
  }[gap];

  return (
    <div className={`flex ${justifyClass} ${gapClass} pt-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Ghost Dialog Button (Minimal, secondary action)
 * - No background
 * - Text only
 * - Subtle hover effect
 */
interface GhostButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function DialogGhostButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: GhostButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 text-stone-700 font-medium rounded-lg hover:bg-stone-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Outline Dialog Button (Alternative action)
 * - Border with accent color
 * - Text matches border color
 */
interface OutlineButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function DialogOutlineButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: OutlineButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 border border-amber-700 text-amber-700 font-medium rounded-lg hover:bg-amber-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Full Width Primary Button (Main CTA in dialogs)
 * - Takes full width of container
 * - Amber/primary color
 * - Largest size
 */
interface FullWidthButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function DialogFullWidthButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  type = "submit",
  className = "",
}: FullWidthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full px-6 py-3 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

/**
 * Small Dialog Button (Compact spaces)
 * - Reduced padding
 * - Smaller text
 */
interface SmallButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "destructive";
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function DialogSmallButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  className = "",
}: SmallButtonProps) {
  const baseClasses = "px-4 py-1.5 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs";

  const variantClasses = {
    primary: "bg-amber-700 text-white font-bold hover:bg-amber-800 focus:ring-amber-700/50 active:scale-95",
    secondary: "border border-stone-300 text-stone-900 font-medium hover:bg-stone-50 focus:ring-stone-400/50 active:scale-95",
    destructive: "bg-red-600 text-white font-bold hover:bg-red-700 focus:ring-red-600/50 active:scale-95",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
