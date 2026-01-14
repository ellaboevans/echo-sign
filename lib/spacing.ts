/**
 * Comprehensive Spacing & Padding System
 * Ensures consistent spacing, padding, margins, and gaps throughout the application
 */

/**
 * Base Spacing Scale
 * All spacing values are derived from Tailwind's 0.25rem (4px) base unit
 */
export const SPACING = {
  // Micro (2px - 4px)
  xs: "0.5",     // 2px
  sm: "1",       // 4px

  // Small (8px - 12px)
  md: "2",       // 8px
  lg: "3",       // 12px

  // Medium (16px - 20px)
  xl: "4",       // 16px
  "2xl": "5",    // 20px

  // Large (24px - 28px)
  "3xl": "6",    // 24px
  "4xl": "7",    // 28px

  // Extra Large (32px+)
  "5xl": "8",    // 32px
  "6xl": "10",   // 40px
  "7xl": "12",   // 48px
  "8xl": "16",   // 64px
};

/**
 * Dialog Spacing Standards
 * Consistent padding and spacing for all dialog components
 */
export const DIALOG_SPACING = {
  // Dialog container padding
  CONTAINER: "p-6",           // 24px padding on all sides

  // Dialog content sections
  CONTENT: "space-y-6",       // 24px gap between major sections
  SECTION: "space-y-4",       // 16px gap within sections
  SUBSECTION: "space-y-2",    // 8px gap within subsections

  // Form fields spacing
  FORM_GROUP: "space-y-6",    // 24px between form groups
  FORM_FIELD: "space-y-2",    // 8px between label and input
  FORM_INPUT: "px-4 py-3",    // 16px horizontal, 12px vertical padding

  // Dialog header spacing
  HEADER_SPACING: "space-y-2", // 8px between title and description

  // Dialog footer spacing
  FOOTER_SPACING: "gap-3",     // 12px between footer buttons
  FOOTER_CONTAINER: "flex justify-end gap-3 pt-6", // 24px top padding, 12px gap

  // Grid spacing
  GRID_GAP_NORMAL: "gap-6",    // 24px gap in grids
  GRID_GAP_TIGHT: "gap-4",     // 16px gap in compact grids
  GRID_GAP_LOOSE: "gap-8",     // 32px gap in spacious grids

  // Button group spacing
  BUTTON_GROUP_GAP: "gap-3",   // 12px between buttons
};

/**
 * Card/Content Spacing Standards
 * Consistent padding for cards, sections, and content areas
 */
export const CARD_SPACING = {
  // Card padding
  PADDING_DEFAULT: "p-6",      // 24px padding on all sides
  PADDING_COMPACT: "p-4",      // 16px padding (for smaller cards)
  PADDING_SPACIOUS: "p-8",     // 32px padding (for featured cards)

  // Card sections
  CONTENT_SPACING: "space-y-4", // 16px between card sections

  // Card header/footer
  HEADER_PADDING: "px-6 py-4",  // 24px h, 16px v
  FOOTER_PADDING: "px-6 py-4",  // 24px h, 16px v
};

/**
 * Form Input Spacing Standards
 * Consistent padding for all form inputs
 */
export const INPUT_SPACING = {
  // Standard input padding
  DEFAULT: "px-4 py-3",         // 16px h, 12px v
  SMALL: "px-3 py-2",           // 12px h, 8px v
  LARGE: "px-6 py-4",           // 24px h, 16px v

  // Text area padding
  TEXTAREA_DEFAULT: "px-4 py-3", // 16px h, 12px v
  TEXTAREA_LARGE: "px-5 py-4",   // 20px h, 16px v

  // Input wrapper spacing
  WRAPPER_GAP: "gap-2",          // 8px between label and input
  WRAPPER_SPACING: "space-y-2",  // 8px total spacing
};

/**
 * Section & Layout Spacing
 * Spacing for major sections and layout components
 */
export const SECTION_SPACING = {
  // Section padding
  DEFAULT: "px-4 py-6",          // 16px h, 24px v
  LARGE: "px-4 py-12",           // 16px h, 48px v
  COMPACT: "px-4 py-4",          // 16px h, 16px v

  // Between sections
  VERTICAL_GAP: "space-y-8",      // 32px gap between sections
  HORIZONTAL_GAP: "gap-6",        // 24px gap between columns

  // Landing page sections
  LANDING_SECTION: "py-24 px-4",  // 96px v, 16px h
};

/**
 * Component Spacing Standards
 * Spacing for specific components
 */
export const COMPONENT_SPACING = {
  // List items
  LIST_ITEM_PADDING: "px-4 py-3",   // 16px h, 12px v
  LIST_ITEM_GAP: "space-y-2",        // 8px between items

  // Menu items
  MENU_ITEM_PADDING: "px-3 py-2",    // 12px h, 8px v
  MENU_ITEM_GAP: "gap-2",             // 8px gap

  // Navigation
  NAV_ITEM_PADDING: "px-4 py-2",     // 16px h, 8px v
  NAV_ITEM_GAP: "gap-3",              // 12px gap

  // Modal/Overlay
  MODAL_PADDING: "p-6",               // 24px on all sides
  MODAL_CONTENT_GAP: "gap-4",         // 16px gap

  // Buttons
  BUTTON_PADDING_SMALL: "px-3 py-1",  // 12px h, 4px v
  BUTTON_PADDING_DEFAULT: "px-6 py-2.5", // 24px h, 10px v
  BUTTON_PADDING_LARGE: "px-8 py-3",  // 32px h, 12px v
};

/**
 * Responsive Spacing
 * Mobile-first spacing with breakpoint overrides
 */
export const RESPONSIVE_SPACING = {
  // Standard responsive padding
  CONTAINER_MOBILE: "px-4",      // 16px on mobile
  CONTAINER_TABLET: "sm:px-6",   // 24px on tablet
  CONTAINER_DESKTOP: "lg:px-8",  // 32px on desktop

  // Responsive gaps
  GAP_MOBILE: "gap-4",           // 16px on mobile
  GAP_TABLET: "sm:gap-6",        // 24px on tablet
  GAP_DESKTOP: "lg:gap-8",       // 32px on desktop

  // Responsive sections
  SECTION_MOBILE: "py-6",        // 24px on mobile
  SECTION_TABLET: "sm:py-12",    // 48px on tablet
  SECTION_DESKTOP: "lg:py-16",   // 64px on desktop
};

/**
 * Gap/Spacing Classes
 * Direct gap and space-y/space-x classes
 */
export const GAP = {
  // Gap between flex/grid items
  TIGHT: "gap-2",        // 8px
  NORMAL: "gap-3",       // 12px
  COMFORTABLE: "gap-4",  // 16px
  SPACIOUS: "gap-6",     // 24px
  LARGE: "gap-8",        // 32px

  // Space-y (vertical)
  VERTICAL_TIGHT: "space-y-2",      // 8px
  VERTICAL_NORMAL: "space-y-3",     // 12px
  VERTICAL_COMFORTABLE: "space-y-4", // 16px
  VERTICAL_SPACIOUS: "space-y-6",   // 24px
  VERTICAL_LARGE: "space-y-8",      // 32px

  // Space-x (horizontal)
  HORIZONTAL_TIGHT: "space-x-2",      // 8px
  HORIZONTAL_NORMAL: "space-x-3",     // 12px
  HORIZONTAL_COMFORTABLE: "space-x-4", // 16px
  HORIZONTAL_SPACIOUS: "space-x-6",   // 24px
};

/**
 * Complete Dialog Layout Classes
 * Pre-composed classes for consistent dialog structure
 */
export const DIALOG_LAYOUT = {
  // Dialog container
  CONTAINER: "bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg",

  // Content wrapper
  CONTENT_WRAPPER: "p-6 space-y-6",

  // Header section
  HEADER: "space-y-2",

  // Form sections
  FORM_WRAPPER: "space-y-6 py-4",
  FORM_SECTION: "space-y-2",
  FORM_GRID: "grid grid-cols-1 md:grid-cols-2 gap-6",

  // Input styling
  INPUT_BASE: "px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm",
  INPUT_LARGE: "px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-700/5 focus:border-amber-700 transition-all text-lg font-medium h-auto",

  // Button container
  BUTTON_CONTAINER: "flex justify-end gap-3 pt-6",

  // Full layout
  FULL: "space-y-6 p-6",
};

/**
 * Consistency Checklist
 * Use this as reference when building dialogs
 */
export const CONSISTENCY_CHECKLIST = {
  DIALOG_PADDING: {
    rule: "All dialogs should have p-6 (24px) padding on main container",
    applies_to: ["DialogContent", "Card containers"],
  },
  SECTION_SPACING: {
    rule: "Major sections use space-y-6 (24px) for vertical spacing",
    applies_to: ["Form groups", "Content sections"],
  },
  FORM_FIELD_SPACING: {
    rule: "Label + Input pairs use space-y-2 (8px) vertical spacing",
    applies_to: ["Form fields", "Input groups"],
  },
  INPUT_PADDING: {
    rule: "Standard inputs use px-4 py-3 (16px h, 12px v)",
    applies_to: ["Text inputs", "Textarea elements"],
  },
  BUTTON_GROUP_SPACING: {
    rule: "Button groups use gap-3 (12px) with flex justify-end",
    applies_to: ["Dialog footers", "Action buttons"],
  },
  GRID_SPACING: {
    rule: "Grid items default to gap-6 (24px), tight grids use gap-4 (16px)",
    applies_to: ["Form grids", "Layout grids"],
  },
  RESPONSIVE: {
    rule: "Mobile-first: 16px (px-4), tablet: 24px (px-6), desktop: 32px (px-8)",
    applies_to: ["Container padding", "Section spacing"],
  },
};

/**
 * Padding by Component Type
 */
export const PADDING_BY_COMPONENT = {
  Dialog: "p-6",              // 24px
  Card: "p-6",                // 24px
  CompactCard: "p-4",         // 16px
  FeaturedCard: "p-8",        // 32px
  Button: "px-6 py-2.5",      // 24px h, 10px v
  SmallButton: "px-4 py-2",   // 16px h, 8px v
  Input: "px-4 py-3",         // 16px h, 12px v
  TextArea: "px-4 py-3",      // 16px h, 12px v
  ListItem: "px-4 py-3",      // 16px h, 12px v
  MenuItem: "px-3 py-2",      // 12px h, 8px v
  LandingSection: "px-4 py-24", // 16px h, 96px v
};

/**
 * Heights by Component
 * Standardized heights for input elements and controls
 */
export const HEIGHTS = {
  Button: "h-10",             // 40px
  ButtonSmall: "h-8",         // 32px
  ButtonLarge: "h-12",        // 48px
  Input: "h-10",              // 40px
  InputSmall: "h-8",          // 32px
  InputLarge: "h-12",         // 48px
  MinTouchTarget: "h-11",     // 44px (minimum touch target)
};

/**
 * Border Radius Standards
 */
export const BORDER_RADIUS = {
  NONE: "rounded-none",
  SM: "rounded-sm",
  DEFAULT: "rounded-md",
  LG: "rounded-lg",
  XL: "rounded-xl",
  FULL: "rounded-full",
};

/**
 * Shadow Standards
 */
export const SHADOWS = {
  NONE: "",
  SUBTLE: "shadow-sm",
  DEFAULT: "shadow-md",
  MEDIUM: "shadow-lg",
  LARGE: "shadow-xl",
  EXTRA: "shadow-2xl",
};
