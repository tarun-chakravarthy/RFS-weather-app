/**
 * Error State Component
 */

import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  city?: string;
  message?: string;
}

export function ErrorState({ city, message }: ErrorStateProps) {
  return (
    <div className="flex justify-center py-12">
      <div className="bg-red-50 dark:bg-red-900/40 border-2 border-red-500 dark:border-red-400 rounded-lg p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-300" />
        </div>
        <h3 className="font-condensed font-bold text-lg text-red-700 dark:text-red-200 mb-2">
          {message || 'Error'}
        </h3>
        {city && (
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Could not find weather for <span className="font-semibold">{city}</span>
          </p>
        )}
      </div>
    </div>
  );
}
