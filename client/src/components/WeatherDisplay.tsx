/**
 * Weather display component with loading and error states
 */

import type { Weather } from "../types/weather.js";
import { getWeatherDescription } from "../types/weather.js";
import { Droplets, Wind, CloudRain, MapPin } from "lucide-react";
import { COUNTRY_NAMES } from "../constants/locationMaps";

interface WeatherDisplayProps {
  weather: Weather;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  // Display weather
  const temp = Math.round(weather.current.temperature);
  const feelsLike = Math.round(weather.current.apparentTemperature);
  const description = getWeatherDescription(weather.current.weatherCode);

  // Get full country name if available
  const countryFull = COUNTRY_NAMES[weather.location.country] || weather.location.country;

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <div className="bg-bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
        {/* Location Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary">
            {weather.location.name}
          </h2>
          <p className="text-text-secondary text-sm">
            {weather.location.state && <span>{weather.location.state}, </span>}{countryFull}
          </p>
          <p className="text-text-muted text-xs mt-1">
            Updated: {new Date(weather.lastUpdated).toLocaleTimeString()}
          </p>
        </div>

        {/* Main Temperature Card */}
        <div className="mb-6 p-4 bg-bg-app rounded-lg text-center">
          <div className="text-4xl sm:text-5xl font-bold text-accent-primary mb-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Humidity */}
          <div className="p-4 bg-bg-app rounded-lg flex items-center gap-3">
            <div className="shrink-0">
              <Droplets className="text-accent-primary dark:text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
                Humidity
              </div>
              <div className="text-xl font-bold text-text-primary">
                {weather.current.humidity}%
              </div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="p-4 bg-bg-app rounded-lg flex items-center gap-3">
            <div className="shrink-0">
              <Wind className="text-accent-primary dark:text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
                Wind
              </div>
              <div className="text-xl font-bold text-text-primary">
                {Math.round(weather.current.windSpeedKph)} km/h
              </div>
            </div>
          </div>

          {/* Precipitation */}
          <div className="p-4 bg-bg-app rounded-lg flex items-center gap-3">
            <div className="shrink-0">
              <CloudRain className="text-accent-primary dark:text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
                Precipitation
              </div>
              <div className="text-xl font-bold text-text-primary">
                {weather.current.precipitation.toFixed(1)} mm
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="p-4 bg-bg-app rounded-lg flex items-center gap-3">
            <div className="shrink-0">
              <MapPin className="text-accent-primary dark:text-blue-400" size={20} />
            </div>
            <div className="flex-1">
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
    </div>
  );
}
