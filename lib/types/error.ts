/**
 * Custom error types for the application
 * Provides better type safety and error context
 */

export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, unknown>;
  isAppError?: true;
}

/**
 * Type guard to check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof Error && 'isAppError' in error;
}

/**
 * Create a new AppError with context
 */
export function createAppError(
  message: string,
  options?: {
    code?: string;
    statusCode?: number;
    context?: Record<string, unknown>;
  }
): AppError {
  const error = new Error(message) as AppError;
  error.code = options?.code;
  error.statusCode = options?.statusCode;
  error.context = options?.context;
  error.isAppError = true;
  return error;
}

/**
 * Handle any error safely, converting it to AppError if needed
 */
export function handleError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return createAppError(error.message, {
      context: {
        originalError: error.toString(),
      },
    });
  }

  return createAppError(String(error));
}
