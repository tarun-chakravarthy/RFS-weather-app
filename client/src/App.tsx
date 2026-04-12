/**
 * Main application component - manages state and orchestrates weather search
 */

import { useState } from "react";
import { fetchWeather } from "./services/api.js";
import type { Weather } from "./types/weather.js";
import { Header } from "./components/Header.js";
import { SearchBar } from "./components/SearchBar.js";
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
      console.log(`Searching for: ${location}`);
      const data = await fetchWeather(location);
      setWeather(data);
      console.log("Weather retrieved");
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
    <div className="min-h-screen bg-bg-app dark:bg-black text-black dark:text-white border-black dark:border-white">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <section className="mb-12 flex flex-col gap-4">
          <SearchBar onSearch={handleSearch} disabled={isLoading} />
        </section>

        {/* Weather Display */}
        <section>
          {isLoading && <LoadingState />}
          {error && <ErrorState city={weather?.location.name} message={error} />}
          {!isLoading && !error && weather && <WeatherDisplay weather={weather} isLoading={false} error={null} />}
          {!isLoading && !error && !weather && <EmptyState />}
        </section>
      </main>

      <footer className="bg-bg-header dark:bg-black text-black dark:text-white text-center py-8 mt-12 border-t border-black dark:border-white">
        <p className="text-sm text-black dark:text-white opacity-70">
          Powered by OpenWeatherMap | NSW Rural Fire Service
        </p>
      </footer>
    </div>
  );
}

export default App;
