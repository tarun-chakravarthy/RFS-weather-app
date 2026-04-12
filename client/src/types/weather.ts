/**
 * Weather type definitions (must match server types)
 */

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weatherCode: number;
  windSpeedKph: number;
  precipitation: number;
}

export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Weather {
  location: Location;
  current: CurrentWeather;
  lastUpdated: string;
}

export interface WeatherError {
  error: string;
  message: string;
  statusCode: number;
}

// Weather code descriptions
export const WEATHER_CODE_MAP: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Foggy",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

export function getWeatherDescription(code: number): string {
  return WEATHER_CODE_MAP[code] || "Unknown";
}
