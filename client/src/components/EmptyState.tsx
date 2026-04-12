/**
 * Empty State Component
 */

import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex justify-center py-12">
      <div className="bg-bg-card border border-border rounded-lg p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Search className="w-12 h-12 text-text-muted" />
        </div>
        <h3 className="font-condensed font-bold text-lg text-text-primary mb-2">
          No Weather Data
        </h3>
        <p className="text-text-secondary text-sm">
          Enter a city name above to get started
        </p>
      </div>
    </div>
  );
}
