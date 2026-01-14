/**
 * Logger utility that only logs in development mode
 * In production, these calls are no-ops
 */

const isDev = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  
  error: (...args: unknown[]) => {
    // Always log errors, but could be enhanced with error tracking service
    if (isDev) {
      console.error(...args);
    }
    // In production, you might want to send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  },
  
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
};
