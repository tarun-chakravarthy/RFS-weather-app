/**
 * Weather type definitions (must match server types)
 */

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
  state: string;
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

// Weather code descriptions (supports OpenWeatherMap IDs)
export const WEATHER_CODE_MAP: Record<number, string> = {
  // OpenWeatherMap IDs
  200: "Thunderstorm with light rain",
  201: "Thunderstorm with rain",
  202: "Thunderstorm with heavy rain",
  210: "Light thunderstorm",
  211: "Thunderstorm",
  212: "Heavy thunderstorm",
  221: "Ragged thunderstorm",
  230: "Thunderstorm with light drizzle",
  231: "Thunderstorm with drizzle",
  232: "Thunderstorm with heavy drizzle",
  300: "Light drizzle",
  301: "Drizzle",
  302: "Heavy drizzle",
  310: "Light rain/drizzle",
  311: "Rain/drizzle",
  312: "Heavy rain/drizzle",
  313: "Shower rain/drizzle",
  314: "Heavy shower rain/drizzle",
  321: "Shower drizzle",
  500: "Light rain",
  501: "Moderate rain",
  502: "Heavy rain",
  503: "Very heavy rain",
  504: "Extreme rain",
  511: "Freezing rain",
  520: "Light shower rain",
  521: "Shower rain",
  522: "Heavy shower rain",
  531: "Ragged shower rain",
  600: "Light snow",
  601: "Snow",
  602: "Heavy snow",
  611: "Sleet",
  612: "Light shower sleet",
  613: "Shower sleet",
  615: "Light rain and snow",
  616: "Rain and snow",
  620: "Light shower snow",
  621: "Shower snow",
  622: "Heavy shower snow",
  701: "Mist",
  711: "Smoke",
  721: "Haze",
  731: "Sand/dust",
  741: "Fog",
  751: "Sand",
  761: "Dust",
  762: "Volcanic ash",
  771: "Squalls",
  781: "Tornado",
  800: "Clear sky",
  801: "Few clouds",
  802: "Scattered clouds",
  803: "Broken clouds",
  804: "Overcast clouds",
  // Legacy WMO codes (fallback)
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Foggy",
};

export function getWeatherDescription(code: number): string {
  return WEATHER_CODE_MAP[code] || "Unknown";
}
