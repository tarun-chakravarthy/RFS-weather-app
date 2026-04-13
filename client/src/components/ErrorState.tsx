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
    <div className="flex justify-center py-8 sm:py-12 px-4">
      <div className="bg-accent-danger/10 border-2 border-accent-danger rounded-lg p-6 sm:p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-accent-danger" />
        </div>
        <h3 className="font-condensed font-bold text-lg text-accent-danger mb-2">
          {message || 'Error'}
        </h3>
        {city && (
          <p className="text-text-secondary text-sm">
            Could not find weather for <span className="font-semibold">{city}</span>
          </p>
        )}
      </div>
    </div>
  );
}
