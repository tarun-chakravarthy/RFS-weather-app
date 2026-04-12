/**
 * Loading State Component
 */

export function LoadingState() {
  return (
    <div className="flex justify-center py-12">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="bg-white dark:bg-black rounded-lg p-8 border border-black dark:border-white">
          <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-slate-100 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/2" />
            <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded mt-6" />
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 dark:bg-slate-700 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
