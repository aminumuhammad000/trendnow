/**
 * Standardized error handler for Supabase data operations.
 * Formats errors for application consumption without exposing sensitive database internals.
 */
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', originalError = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
  }
}

export function handleSupabaseError(error, context = 'Database operation') {
  if (!error) return null;

  // Log in development for debugging
  if (import.meta.env.DEV) {
    console.error(`[${context}] Supabase Error:`, error);
  }

  // Handle common postgrest / RLS error codes
  if (error.code === 'PGRST116') {
    return new AppError('The requested record was not found.', 'NOT_FOUND', error);
  }

  if (error.code === '42501' || error.message?.includes('permission denied')) {
    return new AppError(
      'Access restricted by row-level security policy.',
      'PERMISSION_DENIED',
      error
    );
  }

  return new AppError(
    error.message || `An error occurred during ${context.toLowerCase()}.`,
    error.code || 'DATABASE_ERROR',
    error
  );
}
