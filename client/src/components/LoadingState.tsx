/**
 * Loading State Component
 */

export function LoadingState() {
  return (
    <div className="flex justify-center py-8 sm:py-12 px-4">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="bg-bg-card border border-border rounded-lg p-4 sm:p-8">
          <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-slate-300 dark:bg-slate-600 rounded w-3/4" />
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/2" />
            <div className="h-20 bg-slate-300 dark:bg-slate-600 rounded mt-6" />
            <div className="flex flex-wrap gap-4 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="grid-item-half h-20 bg-slate-300 dark:bg-slate-600 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
