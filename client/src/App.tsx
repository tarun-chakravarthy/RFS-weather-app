/**
 * Main application component - manages state and orchestrates weather search
 */

import { useState } from "react";
import { fetchWeather } from "./services/api.js";
import type { Weather } from "./types/weather.js";
import { Header } from "./components/Header.js";
import { SearchBar } from "./components/SearchBar.js";
import { QuickSearchButtons } from "./components/QuickSearchButtons.js";
import { WeatherDisplay } from "./components/WeatherDisplay.js";
import { LoadingState } from "./components/LoadingState.js";
import { ErrorState } from "./components/ErrorState.js";
import { EmptyState } from "./components/EmptyState.js";
import "./App.css";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (location: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await fetchWeather(location);
      setWeather(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather";
      setError(errorMessage);
      setWeather(null);
      console.error("Search failed:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-app text-text-primary border-border">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Search Bar & Quick Search */}
        <section className="mb-8 sm:mb-12 flex flex-col gap-4">
          <SearchBar onSearch={handleSearch} disabled={isLoading} />
          <QuickSearchButtons onSearch={handleSearch} disabled={isLoading} />
        </section>

        {/* Weather Display */}
        <section>
          {isLoading && <LoadingState />}
          {error && <ErrorState city={weather?.location.name} message={error} />}
          {!isLoading && !error && weather && <WeatherDisplay weather={weather} />}
          {!isLoading && !error && !weather && <EmptyState />}
        </section>
      </main>

      <footer className="bg-bg-header text-text-secondary text-center py-6 sm:py-8 mt-8 sm:mt-12 border-t border-border px-4">
        <p className="text-xs sm:text-sm opacity-70">
          Powered by OpenWeatherMap | NSW Rural Fire Service
        </p>
      </footer>
    </div>
  );
}

export default App;
