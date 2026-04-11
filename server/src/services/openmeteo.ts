/**
 * Open-Meteo service - handles geocoding and weather API calls
 */

import type { CurrentWeather, GeocodingResult, Location, Weather } from '../types/weather.js';

// Open-Meteo API endpoints (no auth needed)
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

/**
 * Geocode location name to coordinates
 */
async function geocodeLocation(locationName: string): Promise<GeocodingResult> {
  console.log(`Geocoding: "${locationName}"`);

  const params = new URLSearchParams({
    name: locationName,
    count: '1',
    language: 'en',
  });

  const response = await fetch(`${GEOCODING_API}?${params}`);
  
  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.statusText}`);
  }

  const data = await response.json() as { results?: { name: string; latitude: number; longitude: number; country: string }[] };

  if (!data.results || data.results.length === 0) {
    throw new Error(`Location not found: "${locationName}"`);
  }

  const result = data.results[0];
  console.log(`Found: ${result.name}, ${result.country} (${result.latitude}, ${result.longitude})`);

  return result;
}

/**
 * Fetch weather data for coordinates
 */
async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<CurrentWeather> {
  console.log(`Fetching weather for (${latitude}, ${longitude})`);

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'weather_code',
      'wind_speed_10m',
      'precipitation',
    ].join(','),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    timezone: 'auto', // Use local timezone
  });

  const response = await fetch(`${WEATHER_API}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data = await response.json() as {
    current?: {
      temperature_2m: number;
      apparent_temperature: number;
      relative_humidity_2m: number;
      weather_code: number;
      wind_speed_10m: number;
      precipitation: number;
    };
  };

  if (!data.current) {
    throw new Error('No weather data in response');
  }

  return {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    weatherCode: data.current.weather_code,
    windSpeedKph: data.current.wind_speed_10m,
    precipitation: data.current.precipitation,
  };
}

/**
 * Get weather for coordinates - reverse geocodes and fetches weather
 */
export async function getWeatherForCoordinates(
  latitude: number,
  longitude: number
): Promise<Weather> {
  try {
    console.log(`Getting weather for coordinates: ${latitude}, ${longitude}`);
    
    const current = await fetchWeatherData(latitude, longitude);

    const reverseGeocoding = await reverseGeocodeCoordinates(latitude, longitude);

    const weather: Weather = {
      location: {
        name: reverseGeocoding.name,
        country: reverseGeocoding.country,
        latitude,
        longitude,
      },
      current,
      lastUpdated: new Date().toISOString(),
    };

    console.log('Weather data ready');
    return weather;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

/**
 * Reverse geocode coordinates to location name
 */
async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number
): Promise<GeocodingResult> {
  console.log(`Reverse geocoding: (${latitude}, ${longitude})`);

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    language: 'en',
  });

  const response = await fetch(`${GEOCODING_API}?${params}`);
  
  if (!response.ok) {
    throw new Error(`Reverse geocoding API error: ${response.statusText}`);
  }

  const data = await response.json() as { results?: { name: string; latitude: number; longitude: number; country: string }[] };

  if (!data.results || data.results.length === 0) {
    throw new Error('Could not find location for coordinates');
  }

  const result = data.results[0];
  console.log(`Found: ${result.name}, ${result.country}`);

  return result;
}

/**
 * Get weather for a location - orchestrates geocoding and fetch
 */
export async function getWeatherForLocation(locationName: string): Promise<Weather> {
  try {
    const geocoding = await geocodeLocation(locationName);
    const current = await fetchWeatherData(geocoding.latitude, geocoding.longitude);

    const weather: Weather = {
      location: {
        name: geocoding.name,
        country: geocoding.country,
        latitude: geocoding.latitude,
        longitude: geocoding.longitude,
      },
      current,
      lastUpdated: new Date().toISOString(),
    };

    console.log('Weather data ready');
    return weather;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}
