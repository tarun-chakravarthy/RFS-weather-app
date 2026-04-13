/**
 * Quick search buttons for commonly searched cities
 */

import { NSW_BUSHFIRE_CITIES } from "../constants/nswRegions";

interface QuickSearchButtonsProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export function QuickSearchButtons({ onSearch, disabled }: QuickSearchButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3>Most commonly searched cities</h3>
      <div className="flex flex-wrap gap-2">
        {NSW_BUSHFIRE_CITIES.map((entry) => (
          <button
            key={entry.city}
            type="button"
            className="px-3 py-2 text-sm sm:text-base sm:px-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            onClick={() => onSearch(entry.city)}
            disabled={disabled}
            aria-label={`Show weather for ${entry.city}`}
          >
            {entry.city}
          </button>
        ))}
      </div>
    </div>
  );
}
