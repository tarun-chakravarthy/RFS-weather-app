/**
 * Simple SearchBar Component
 */

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export function SearchBar({ onSearch, disabled = false }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center gap-2">
        <div className="absolute left-4 flex items-center justify-center pointer-events-none">
          <Search className="w-5 h-5 text-text-muted" />
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Enter city name..."
          className="
            flex-1 pl-12 pr-4 py-3
            bg-bg-card border border-border
            text-text-primary placeholder-text-muted
            rounded-lg
            focus:outline-none focus:ring-2 focus:ring-accent-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
          "
        />

        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="
            px-6 py-3
            bg-accent-primary dark:bg-blue-500
            text-white
            font-condensed font-bold uppercase text-sm
            rounded-lg
            hover:opacity-90 active:opacity-80
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
            shrink-0
          "
        >
          Search
        </button>
      </div>
    </form>
  );
}
