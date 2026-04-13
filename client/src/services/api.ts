/**
 * API client for weather endpoints
 */

import type { Weather, WeatherError } from "../types/weather.js";

/**
 * Fetch weather for a location
 */
export async function fetchWeather(location: string): Promise<Weather> {
  const url = new URL('/api/weather', window.location.origin);
  url.searchParams.set('location', location);

  const response = await fetch(url.toString());
  const data = await response.json() as Weather | WeatherError;

  if (!response.ok) {
    const error = data as WeatherError;
    const message = error.message || response.statusText;
    throw new Error(message);
  }

  return data as Weather;
}

/**
 * Check if backend is reachable
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(new URL('/api/health', window.location.origin).toString());
    return response.ok;
  } catch {
    return false;
  }
}


