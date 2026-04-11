/**
 * Weather display component with loading and error states
 */

import type { Weather } from "../types/weather.js";
import { getWeatherDescription } from "../types/weather.js";

interface WeatherDisplayProps {
  weather: Weather | null;
  isLoading: boolean;
  error: string | null;
}

export function WeatherDisplay({ weather, isLoading, error }: WeatherDisplayProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-text-secondary">
          <div className="text-lg">Loading weather data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-accent-danger/10 border border-accent-danger rounded-lg p-4 max-w-md mx-auto">
          <div className="text-accent-danger font-medium">Error</div>
          <div className="text-text-secondary text-sm mt-1">{error}</div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center py-12">
        <div className="text-text-muted">
          <div className="text-lg">Search for a location to see weather</div>
        </div>
      </div>
    );
  }

  // Success state - display weather
  const temp = Math.round(weather.current.temperature);
  const feelsLike = Math.round(weather.current.apparentTemperature);
  const description = getWeatherDescription(weather.current.weatherCode);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-bg-card border border-border rounded-lg p-6 shadow-sm">
        {/* Location Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary">
            {weather.location.name}
          </h2>
          <p className="text-text-secondary text-sm">
            {weather.location.country}
          </p>
          <p className="text-text-muted text-xs mt-1">
            Updated: {new Date(weather.lastUpdated).toLocaleTimeString()}
          </p>
        </div>

        {/* Main Temperature Card */}
        <div className="mb-6 p-4 bg-bg-app rounded-lg text-center">
          <div className="text-5xl font-bold text-accent-primary mb-2">
            {temp}°
          </div>
          <div className="text-lg text-text-primary font-medium mb-1">
            {description}
          </div>
          <div className="text-text-secondary text-sm">
            Feels like {feelsLike}°
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Humidity */}
          <div className="p-3 bg-bg-app rounded-lg">
            <div className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
              Humidity
            </div>
            <div className="text-xl font-bold text-text-primary">
              {weather.current.humidity}%
            </div>
          </div>

          {/* Wind Speed */}
          <div className="p-3 bg-bg-app rounded-lg">
            <div className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
              Wind
            </div>
            <div className="text-xl font-bold text-text-primary">
              {Math.round(weather.current.windSpeedKph)} km/h
            </div>
          </div>

          {/* Precipitation */}
          <div className="p-3 bg-bg-app rounded-lg">
            <div className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
              Precipitation
            </div>
            <div className="text-xl font-bold text-text-primary">
              {weather.current.precipitation.toFixed(1)} mm
            </div>
          </div>

          {/* Coordinates */}
          <div className="p-3 bg-bg-app rounded-lg">
            <div className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
              Location
            </div>
            <div className="text-xs text-text-primary font-mono">
              {weather.location.latitude.toFixed(2)},
              <br />
              {weather.location.longitude.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
