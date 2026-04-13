/**
 * Weather type definitions - shared contract between frontend and backend
 */

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
  state: string; // State/province (e.g., "New South Wales")
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
 * NOTE: OpenWeatherMap API uses OpenWeatherMap weather codes (e.g., 800, 500)
 * NOT WMO codes. Weather code descriptions are handled on the frontend.
 * This file is kept as a type-definition contract between backend and frontend.
 */
