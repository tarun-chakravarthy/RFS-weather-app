/**
 * OpenWeatherMap service - handles weather API calls
 * Requires OPENWEATHER_API_KEY environment variable
 */

import type { CurrentWeather, Location, Weather } from '../types/weather.js';

const OPENWEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch weather data for a location by city name
 */
export async function getWeatherForLocation(locationName: string): Promise<Weather> {
  try {
    console.log(`Fetching weather for: "${locationName}"`);

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

    const currentWeather: CurrentWeather = {
      temperature: data.main.temp,
      apparentTemperature: data.main.feels_like,
      humidity: data.main.humidity,
      weatherCode: 0, // OpenWeather uses different codes, we'll use 0 as placeholder
      windSpeedKph: data.wind.speed * 3.6, // Convert m/s to km/h
      precipitation: data.rain?.['1h'] || 0,
    };

    const weather: Weather = {
      location: {
        name: data.name,
        country: data.sys.country,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      },
      current: currentWeather,
      lastUpdated: new Date().toISOString(),
    };

    console.log(`Weather data retrieved for ${data.name}, ${data.sys.country}`);
    return weather;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}
