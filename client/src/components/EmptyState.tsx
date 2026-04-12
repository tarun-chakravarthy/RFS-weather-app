/**
 * Empty State Component
 */

import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex justify-center py-12">
      <div className="bg-bg-card dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Search className="w-12 h-12 text-slate-400 dark:text-slate-300" />
        </div>
        <h3 className="font-condensed font-bold text-lg text-slate-900 dark:text-white mb-2">
          No Weather Data
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Enter a city name above to get started
        </p>
      </div>
    </div>
  );
}
