/**
 * Main application component - manages state and orchestrates weather search
 */

import { useState } from "react";
import { fetchWeather, fetchWeatherByCoordinates } from "./services/api.js";
import { getUserLocation } from "./services/geolocation.js";
import type { Weather } from "./types/weather.js";
import { WeatherSearch } from "./components/WeatherSearch.js";
import { WeatherDisplay } from "./components/WeatherDisplay.js";
import "./App.css";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "allowed" | "denied">("idle");

  const requestGeolocation = async () => {
    setIsLoading(true);
    setError(null);
    const coords = await getUserLocation();

    if (coords) {
      setLocationStatus("allowed");
      try {
        const data = await fetchWeatherByCoordinates(coords.latitude, coords.longitude);
        setWeather(data);
        console.log("Loaded weather from geolocation");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather";
        setError(errorMessage);
        console.error("Geolocation weather fetch failed:", errorMessage);
      }
    } else {
      setLocationStatus("denied");
    }
    setIsLoading(false);
  };

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
    <div className="min-h-screen bg-bg-app text-text-primary">
      <header className="bg-bg-header text-rfs-white shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">RFS Weather</h1>
          <p className="text-blue-100">
            Check weather conditions for fire safety awareness
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="mb-12">
          <WeatherSearch
            onSearch={handleSearch}
            isLoading={isLoading}
            locationStatus={locationStatus}
            onLocationRequest={requestGeolocation}
          />
        </section>

        <section>
          <WeatherDisplay 
            weather={weather}
            isLoading={isLoading}
            error={error}
          />
        </section>
      </main>

      <footer className="bg-bg-header text-blue-100 text-center py-6 mt-12">
        <p className="text-sm">
          Powered by Open-Meteo | NSW Rural Fire Service
        </p>
      </footer>
    </div>
  );
}

export default App;
