/**
 * Comprehensive Button Styling System
 * Ensures consistent button styling, sizing, colors, and states across all dialogs
 */

/**
 * Button Variants - Primary Colors and Styles
 */
export const BUTTON_VARIANTS = {
  // Primary Action Button - Main call-to-action (Submit, Save, Login, Create)
  PRIMARY: {
    base: "bg-amber-700 text-white font-bold uppercase tracking-widest",
    hover: "hover:bg-amber-800",
    active: "active:scale-95",
    focus: "focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:ring-offset-0",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    transition: "transition-all duration-200",
    full: "bg-amber-700 text-white font-bold uppercase tracking-widest hover:bg-amber-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
  },

  // Secondary Action Button - Alternative action (Cancel, Skip, Reset)
  SECONDARY: {
    base: "border border-stone-300 text-stone-900 font-medium",
    hover: "hover:bg-stone-50",
    active: "active:scale-95",
    focus: "focus:outline-none focus:ring-2 focus:ring-stone-400/50",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    transition: "transition-colors duration-200",
    full: "border border-stone-300 text-stone-900 font-medium hover:bg-stone-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",
  },

  // Destructive Button - Dangerous actions (Delete, Logout, Remove)
  DESTRUCTIVE: {
    base: "bg-red-600 text-white font-bold uppercase tracking-widest",
    hover: "hover:bg-red-700",
    active: "active:scale-95",
    focus: "focus:outline-none focus:ring-2 focus:ring-red-600/50",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    transition: "transition-all duration-200",
    full: "bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
  },

  // Outline Button - Secondary choice with border
  OUTLINE: {
    base: "border border-amber-700 text-amber-700 font-medium",
    hover: "hover:bg-amber-50",
    active: "active:scale-95",
    focus: "focus:outline-none focus:ring-2 focus:ring-amber-700/50",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    transition: "transition-all duration-200",
    full: "border border-amber-700 text-amber-700 font-medium hover:bg-amber-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
  },

  // Ghost Button - Minimal styling, hover effect
  GHOST: {
    base: "text-stone-700 font-medium",
    hover: "hover:bg-stone-100",
    active: "active:scale-95",
    focus: "focus:outline-none focus:ring-2 focus:ring-stone-400/50",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    transition: "transition-all duration-200",
    full: "text-stone-700 font-medium hover:bg-stone-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
  },

  // Text Link Button - For links that look like buttons
  TEXT: {
    base: "text-amber-700 font-medium underline-offset-4",
    hover: "hover:underline",
    active: "active:opacity-75",
    focus: "focus:outline-none focus:ring-2 focus:ring-amber-700/50",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    transition: "transition-all duration-200",
    full: "text-amber-700 font-medium underline-offset-4 hover:underline active:opacity-75 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
  },
};

/**
 * Button Sizes - Padding and spacing
 */
export const BUTTON_SIZES = {
  // Extra Small - For compact spaces
  XS: "px-3 py-1 text-xs h-6",

  // Small - For secondary actions or compact dialogs
  SM: "px-4 py-2 text-sm h-8",

  // Default - Standard size for most buttons
  DEFAULT: "px-6 py-3 text-sm h-10",

  // Medium - Larger default (most common in dialogs)
  MD: "px-6 py-2.5 text-sm h-10",

  // Large - For prominent actions
  LG: "px-8 py-3 text-base h-12",

  // Full Width
  FULL: "w-full px-6 py-3 text-sm h-10",
};

/**
 * Dialog Button Groups - Common button combinations
 */
export const DIALOG_BUTTONS = {
  // Cancel + Primary Action (Create, Save, Submit, Login)
  CANCEL_PRIMARY: {
    cancel: `px-6 py-2 border border-stone-300 text-stone-900 font-medium rounded-lg hover:bg-stone-50 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
    primary: `px-6 py-2 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
  },

  // Cancel + Destructive (Delete, Remove)
  CANCEL_DESTRUCTIVE: {
    cancel: `px-6 py-2 border border-stone-300 text-stone-900 font-medium rounded-lg hover:bg-stone-50 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
    destructive: `px-6 py-2 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
  },

  // Cancel + Logout (Special logout button)
  CANCEL_LOGOUT: {
    cancel: `px-6 py-2 border border-stone-300 text-stone-900 font-medium rounded-lg hover:bg-stone-50 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
    logout: `px-6 py-2 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
  },
};

/**
 * Loading and Disabled States
 */
export const BUTTON_STATES = {
  // Loading state - show loading text, disable interaction
  LOADING: {
    disabled: true,
    opacity: "opacity-75",
    cursor: "cursor-not-allowed",
    pointerEvents: "pointer-events-none",
  },

  // Disabled state - visual feedback
  DISABLED: {
    disabled: true,
    opacity: "opacity-50",
    cursor: "cursor-not-allowed",
  },

  // Active/Pressed state
  ACTIVE: "active:scale-95 active:shadow-md",

  // Focus state for keyboard navigation
  FOCUS: "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-amber-700/50",
};

/**
 * Transitions and Animations
 */
export const BUTTON_TRANSITIONS = {
  FAST: "transition-all duration-150",
  NORMAL: "transition-all duration-200",
  SMOOTH: "transition-all duration-300",
  BACKGROUND: "transition-colors duration-200",
  TRANSFORM: "transition-transform duration-200",
};

/**
 * Shadow Effects
 */
export const BUTTON_SHADOWS = {
  NONE: "",
  SUBTLE: "shadow-sm",
  MEDIUM: "shadow-md",
  LARGE: "shadow-lg",
};

/**
 * Rounded Corners
 */
export const BUTTON_ROUNDED = {
  NONE: "rounded-none",
  SM: "rounded-md",
  DEFAULT: "rounded-lg",
  LG: "rounded-xl",
  FULL: "rounded-full",
};

/**
 * Complete Button Classes - Ready to use
 */
export const BUTTON_CLASSES = {
  // Primary buttons (CTA, Submit, Login, Create)
  primaryButton: `px-6 py-3 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`,

  primaryButtonSmall: `px-4 py-2 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm`,

  primaryButtonLarge: `px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base`,

  // Secondary buttons (Cancel, Skip)
  secondaryButton: `px-6 py-2 border border-stone-300 text-stone-900 font-medium rounded-lg hover:bg-stone-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`,

  secondaryButtonSmall: `px-4 py-2 border border-stone-300 text-stone-900 font-medium rounded-lg hover:bg-stone-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm`,

  // Destructive buttons (Delete, Logout, Remove)
  destructiveButton: `px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`,

  destructiveButtonSmall: `px-4 py-2 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm`,

  // Full width buttons (Dialog submit, main CTA)
  primaryButtonFullWidth: `w-full px-6 py-3 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`,

  // Ghost buttons (Minimal style)
  ghostButton: `px-6 py-2 text-stone-700 font-medium rounded-lg hover:bg-stone-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`,
};

/**
 * Color Palette Reference
 * Used consistently across all buttons
 */
export const BUTTON_COLORS = {
  // Primary (Amber/Gold theme)
  PRIMARY_BASE: "bg-amber-700",
  PRIMARY_HOVER: "hover:bg-amber-800",
  PRIMARY_TEXT: "text-white",
  PRIMARY_RING: "focus:ring-amber-700/50",

  // Secondary (Stone/Gray theme)
  SECONDARY_BASE: "bg-stone-100",
  SECONDARY_HOVER: "hover:bg-stone-200",
  SECONDARY_BORDER: "border border-stone-300",
  SECONDARY_TEXT: "text-stone-900",
  SECONDARY_RING: "focus:ring-stone-400/50",

  // Destructive (Red theme)
  DESTRUCTIVE_BASE: "bg-red-600",
  DESTRUCTIVE_HOVER: "hover:bg-red-700",
  DESTRUCTIVE_TEXT: "text-white",
  DESTRUCTIVE_RING: "focus:ring-red-600/50",

  // Disabled (Gray)
  DISABLED_OPACITY: "disabled:opacity-50",
  DISABLED_CURSOR: "disabled:cursor-not-allowed",

  // Text Colors
  TEXT_DARK: "text-stone-900",
  TEXT_LIGHT: "text-white",
  TEXT_MUTED: "text-stone-600",
};

/**
 * Button Group Spacing
 */
export const BUTTON_GROUP_SPACING = {
  TIGHT: "gap-2",
  NORMAL: "gap-3",
  LOOSE: "gap-4",
  LARGE: "gap-6",
};

/**
 * Flex Container for Button Groups
 */
export const BUTTON_GROUP_LAYOUT = {
  HORIZONTAL: "flex justify-end gap-3",
  HORIZONTAL_SPACE_BETWEEN: "flex justify-between gap-3",
  HORIZONTAL_CENTER: "flex justify-center gap-3",
  HORIZONTAL_START: "flex justify-start gap-3",
  VERTICAL: "flex flex-col gap-3",
};
