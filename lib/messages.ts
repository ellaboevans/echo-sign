/**
 * Centralized error and success messages for the application
 * This makes it easy to update messages globally and maintain consistency
 */

export const MESSAGES = {
  // Authentication errors
  AUTH: {
    NOT_FOUND: "Account not found. Please check your subdomain.",
    DATA_CORRUPTED: "Account data corrupted. Please sign up again.",
    ERROR: "An unexpected error occurred. Please try again.",
    SUCCESS: (name: string) => `Welcome back, ${name}! Redirecting...`,
  },

  // Form validation errors
  FORM: {
    NAME_REQUIRED: "A name is required to associate with your signature.",
    WORKSPACE_NOT_FOUND: "Unable to find workspace",
    SIGNATURE_REQUIRED: "Please provide a signature first.",
    VISIBILITY_REQUIRED: "Please select a visibility setting",
  },

  // Signup errors
  SIGNUP: {
    SUCCESS: (name: string) => `Welcome, ${name}! Your wall is ready.`,
  },

  // Generic errors
  GENERIC: {
    ERROR: "An unexpected error occurred. Please try again.",
    TRY_AGAIN: "Please try again",
    CLOSE: "Close",
  },
};
