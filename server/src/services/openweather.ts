/**
 * OpenWeatherMap service - handles weather API calls
 * Requires OPENWEATHER_API_KEY environment variable
 */

import type { CurrentWeather, Location, Weather } from '../types/weather.js';

const OPENWEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';
const OPENWEATHER_GEO_API = 'https://api.openweathermap.org/geo/1.0/reverse';

/**
 * Get state/province name using reverse geocoding
 */
async function getStateForLocation(lat: number, lon: number, apiKey: string): Promise<string> {
  try {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      limit: '1',
      appid: apiKey,
    });

    const response = await fetch(`${OPENWEATHER_GEO_API}?${params}`);
    const data = await response.json() as Array<{
      state?: string;
    }>;

    // Return state if available, otherwise empty string
    return data[0]?.state || '';
  } catch (error) {
    // If reverse geocoding fails, just return empty string (state won't be displayed)
    return '';
  }
}

/**
 * Fetch weather data for a location by city name
 */
export async function getWeatherForLocation(locationName: string): Promise<Weather> {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeather API key not configured. Set OPENWEATHER_API_KEY environment variable.');
    }

    const params = new URLSearchParams({
      q: locationName,
      appid: apiKey,
      units: 'metric', // Use Celsius
    });

    const response = await fetch(`${OPENWEATHER_API}?${params}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Location not found: "${locationName}"`);
      }
      throw new Error(`OpenWeather API error: ${response.statusText}`);
    }

    const data = await response.json() as {
      name: string;
      sys: {
        country: string;
      };
      coord: {
        lat: number;
        lon: number;
      };
      main: {
        temp: number;
        feels_like: number;
        humidity: number;
      };
      weather: Array<{
        id: number;
        main: string;
        description: string;
      }>;
      wind: {
        speed: number;
      };
      rain?: {
        '1h'?: number;
      };
    };

    // Restrict to Australia only
    if (data.sys.country !== 'AU') {
      throw new Error(`Only Australian locations are supported. You searched for: "${locationName}" (${data.name}, ${data.sys.country})`);
    }

    // Get state from reverse geocoding
    const state = await getStateForLocation(data.coord.lat, data.coord.lon, apiKey);

    const currentWeather: CurrentWeather = {
      temperature: data.main.temp,
      apparentTemperature: data.main.feels_like,
      humidity: data.main.humidity,
      weatherCode: data.weather[0]?.id || 0, // Use actual OpenWeatherMap weather ID
      windSpeedKph: data.wind.speed * 3.6, // Convert m/s to km/h
      precipitation: data.rain?.['1h'] || 0,
    };

    const weather: Weather = {
      location: {
        name: data.name,
        country: data.sys.country,
        state: state,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      },
      current: currentWeather,
      lastUpdated: new Date().toISOString(),
    };

    return weather;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}
