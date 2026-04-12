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
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-300" />
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Enter city name..."
          className="
            flex-1 pl-12 pr-4 py-3
            bg-white dark:bg-black
            text-black dark:text-white
            placeholder-slate-400 dark:placeholder-slate-300
            border border-black dark:border-white
            rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
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
            flex-shrink-0
          "
        >
          Search
        </button>
      </div>
    </form>
  );
}
