/**
 * Accessibility-related constants and utilities
 * Ensures consistent ARIA labels and keyboard navigation across the app
 */

/**
 * ARIA labels for form inputs and interactive elements
 */
export const ARIA_LABELS = {
  // Auth form
  AUTH: {
    SUBDOMAIN: "Your subdomain for accessing your account",
  },

  // Sign dialog
  SIGNATURE: {
    NAME: "Your name or alias for the signature",
    EMAIL: "Your email address (optional, used for recovery)",
    MEMORY: "Optional personal memory or message",
    CANVAS: "Signature drawing area - use mouse or finger to sign",
  },

  // Create space
  SPACE: {
    NAME: "Name of the signature wall/space",
    DESCRIPTION: "Description or purpose of the wall",
    VISIBILITY: "Who can see this wall (public, unlisted, or private)",
  },

  // Generic
  BUTTON: {
    SUBMIT: "Submit the form",
    CANCEL: "Cancel and close the dialog",
    CLOSE: "Close the dialog",
    SAVE: "Save changes",
    DELETE: "Delete this item",
  },
};

/**
 * ARIA descriptions for form fields
 */
export const ARIA_DESCRIPTIONS = {
  AUTH: {
    SUBDOMAIN_ERROR: "subdomain-error",
  },
  SIGNUP: {
    NAME_ERROR: "owner-name-error",
    EMAIL_ERROR: "owner-email-error",
    SUBDOMAIN_ERROR: "subdomain-name-error",
  },
};

/**
 * Keyboard shortcuts for navigation
 */
export const KEYBOARD_SHORTCUTS = {
  ESCAPE: "Escape",
  ENTER: "Enter",
  TAB: "Tab",
  SHIFT_TAB: "Shift+Tab",
};

/**
 * Focus management utilities
 */
export const FOCUS_MANAGEMENT = {
  // Default focus selectors
  DIALOG_TITLE: "[role='dialog'] h2, [role='dialog'] [id*='title']",
  FIRST_INPUT: "input, textarea, select, button",
};
