/**
 * Centralized style utilities for consistent UI components
 * These are used to ensure all buttons, inputs, labels, etc. have consistent styling
 */

/**
 * Button styles - primary action (submit/save)
 */
export const buttonPrimary =
  "bg-amber-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 duration-300";

/**
 * Button styles - secondary action (cancel)
 */
export const buttonSecondary =
  "border border-stone-300 text-stone-900 font-medium px-6 py-2 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50";

/**
 * Button styles - small variant
 */
export const buttonSmall =
  "text-sm font-medium px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors disabled:opacity-50";

/**
 * Input styles - standard
 */
export const inputBase =
  "w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all";

/**
 * Input styles - with error state
 */
export const inputError =
  "border-red-500 ring-red-500";

/**
 * Input styles - disabled state
 */
export const inputDisabled =
  "disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * Label styles - standard
 */
export const labelBase =
  "text-xs font-bold uppercase tracking-widest text-stone-400 block";

/**
 * Label styles - with margin
 */
export const labelWithMargin =
  "text-xs font-bold uppercase tracking-widest text-stone-400 block mb-2";

/**
 * Dialog content styles
 */
export const dialogContent =
  "bg-white max-h-[90vh] overflow-y-auto";

/**
 * Dialog size constants
 */
export const dialogSizes = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-xl",
} as const;
