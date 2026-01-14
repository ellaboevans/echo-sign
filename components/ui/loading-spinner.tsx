/**
 * Reusable loading spinner components for consistent UI
 */

export function LoadingSpinner() {
  return (
    <div className="w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full animate-spin" />
  );
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-black/10 backdrop-blur-xs rounded-xl flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export function LoadingDots() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}
