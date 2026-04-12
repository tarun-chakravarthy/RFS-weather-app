/**
 * Weather API routes
 */

import { Router, type Request, type Response, type Express } from 'express';
import { getWeatherForLocation } from '../services/openweather.js';
import type { Weather, WeatherError } from '../types/weather.js';

const router: ReturnType<typeof Router> = Router();

/**
 * GET /api/weather
 * Query: location (required) - City name
 * Returns: Weather data with temperature, humidity, conditions, etc.
 */
router.get('/weather', async (req: Request, res: Response): Promise<void> => {
  try {
    const { location } = req.query;

    if (!location || typeof location !== 'string') {
      const error: WeatherError = {
        error: 'Missing location',
        message: 'location query parameter is required',
        statusCode: 400,
      };
      res.status(400).json(error);
      return;
    }

    const trimmedLocation = location.trim();

    if (trimmedLocation.length === 0) {
      const error: WeatherError = {
        error: 'Invalid location',
        message: 'location cannot be empty',
        statusCode: 400,
      };
      res.status(400).json(error);
      return;
    }

    console.log(`Weather request for: "${trimmedLocation}"`);

    const weather = await getWeatherForLocation(trimmedLocation);
    res.json(weather);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = errorMessage.includes('not found') ? 404 : 500;

    const errorResponse: WeatherError = {
      error: statusCode === 404 ? 'Location not found' : 'Server error',
      message: errorMessage,
      statusCode,
    };

    console.error(`Error in /api/weather: ${errorMessage}`);
    res.status(statusCode).json(errorResponse);
  }
});

export default router;
