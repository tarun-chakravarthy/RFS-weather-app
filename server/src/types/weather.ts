/**
 * Weather type definitions - shared contract between frontend and backend
 */

/**
 * Location data from geocoding API
 */
export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

/**
 * Current weather data
 */
export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weatherCode: number;
  windSpeedKph: number;
  precipitation: number;
}

/**
 * Location details
 */
export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

/**
 * Response from GET /api/weather
 */
export interface Weather {
  location: Location;
  current: CurrentWeather;
  lastUpdated: string;
}

/**
 * Error response from weather API
 */
export interface WeatherError {
  error: string;
  message: string;
  statusCode: number;
}

/**
 * WMO weather codes mapped to human-readable descriptions
 */
export const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Foggy',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
};

/**
 * Get human-readable weather description from WMO code
 */
export function getWeatherDescription(code: number): string {
  return WEATHER_CODE_MAP[code] || 'Unknown';
}
