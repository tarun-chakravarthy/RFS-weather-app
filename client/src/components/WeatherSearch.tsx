/**
 * Location search input component
 */

import { useState } from "react";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
  locationStatus: "idle" | "allowed" | "denied";
  onLocationRequest?: () => void;
}

export function WeatherSearch({
  onSearch,
  isLoading,
  locationStatus,
  onLocationRequest,
}: WeatherSearchProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search location (e.g., Sydney)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary placeholder-text-muted bg-bg-card focus:outline-none focus:ring-2 focus:ring-accent-primary disabled:opacity-50"
        />
        <button
          type="button"
          onClick={onLocationRequest}
          disabled={isLoading}
          title={
            locationStatus === "allowed"
              ? "Location allowed"
              : locationStatus === "denied"
                ? "Location denied - click to try again"
                : "Get current location"
          }
          className={`px-4 py-2 rounded-lg font-medium transition ${
            locationStatus === "allowed"
              ? "bg-fire-low text-white hover:opacity-90"
              : locationStatus === "denied"
                ? "bg-accent-danger/20 text-accent-danger hover:opacity-90"
                : "bg-accent-primary text-rfs-white hover:bg-rfs-navy"
          } disabled:opacity-50`}
        >
          {locationStatus === "allowed" ? "✓ Map" : locationStatus === "denied" ? "✗ Map" : "Map"}
        </button>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-2 bg-accent-primary text-rfs-white rounded-lg hover:bg-rfs-navy disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
