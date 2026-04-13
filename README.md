# RFS Weather App

A full-stack weather application that displays current weather conditions for any location in Australia. Search for any Australian city and instantly view temperature, "feels like" temperature, humidity, wind speed, and precipitation data with a clean, modern interface.

## Features

- **Location Search**: Search for any city in Australia and get current weather conditions
- **Real-time Weather Data**: Temperature, "feels like" temperature, humidity, wind speed, and precipitation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Clear error messages for invalid locations or API issues

## Tech Stack

**Frontend:**
- React 19.2.4 with TypeScript
- Vite 8.0.4 (build tool)
- Tailwind CSS 4.2.2 (styling)
- lucide-react (icons)

**Backend:**
- Express.js with TypeScript
- Node.js runtime

**API:**
- [OpenWeatherMap API](https://openweathermap.org/api) - Real-time weather data (requires free API key)

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- pnpm (or npm/yarn)
- **OpenWeatherMap API Key** (free tier available at https://openweathermap.org/api)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd RFS-weather-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up your OpenWeatherMap API Key:**
   
   Configure the `.env` file in the `server` directory with your API key:
   ```bash
   # server/.env
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```
   
   Get your free API key at: https://openweathermap.org/api
   
   A template file `server/.env.example` is provided as reference.

### Running the Application

**Development Mode:**
```bash
# From project root, starts both client and server concurrently
pnpm dev
```

Or run them separately:
```bash
# Terminal 1 - Backend server (runs on http://localhost:3001)
cd server
pnpm dev

# Terminal 2 - Frontend dev server (runs on http://localhost:5173)
cd client
pnpm dev
```

The frontend is configured to proxy API requests to the backend via Vite's dev server, so CORS is automatically handled.

**Production Build:**
```bash
# Build both client and server
pnpm build

# Run production server (from server directory)
cd server
export OPENWEATHER_API_KEY=your_api_key && node dist/index.js
```

## How It Works

The app uses OpenWeatherMap's **weather and reverse-geocoding APIs** to:
1. Find the location coordinates for your search
2. Get real-time weather data
3. Determine the state/province using latitude and longitude

This means state information is always accurate and updates automatically—no hardcoding needed.

## API Endpoints


### GET `/api/weather`

Fetch current weather data for a specified Australian city.

**Query Parameters:**
- `location` (string, required): Australian city name
  - Example: `?location=Sydney`
  - Example: `?location=Melbourne`


**Response:**
```json
{
  "location": {
    "name": "Sydney",
    "country": "AU",
    "state": "New South Wales",
    "latitude": -33.8688,
    "longitude": 151.2093
  },
  "current": {
    "temperature": 22.1,
    "apparentTemperature": 21.5,
    "humidity": 60,
    "weatherCode": 0,
    "windSpeedKph": 15.2,
    "precipitation": 0
  },
  "lastUpdated": "2024-04-11T15:30:00.000Z"
}
```


**Error Response (Location Not Found):**
```json
{
  "error": "Location not found",
  "message": "Location not found: \"InvalidCity\" (only Australian cities are supported)",
  "statusCode": 404
}
```


**Error Response (Missing Parameters):**
```json
{
  "error": "Missing location",
  "message": "location query parameter is required",
  "statusCode": 400
}
```

## Project Structure

```
RFS-weather-app/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── constants/        # Application constants (cities, mappings)
│   │   ├── services/         # API integration
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx           # Root component
│   │   └── main.tsx          # Entry point
│   └── package.json
├── server/                    # Backend Express application
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic (OpenWeatherMap integration)
│   │   ├── types/            # TypeScript interfaces
│   │   └── index.ts          # Server entry point
│   └── package.json
├── pnpm-workspace.yaml        # pnpm workspace configuration
└── README.md
```

## Components

**Frontend Components:**
- `App.tsx` - Main application component with state management
- `Header.tsx` - App header with branding and live indicator
- `SearchBar.tsx` - Location search input with quick-access bushfire city buttons
- `WeatherDisplay.tsx` - Current weather information display with location, temperature, and details
- `LoadingState.tsx` - Loading skeleton animation
- `ErrorState.tsx` - Error message display
- `EmptyState.tsx` - Initial state prompt

**Server Services:**
- `openweather.ts` - OpenWeatherMap API integration and location validation
- `weather.ts` (routes) - GET `/api/weather` endpoint handler

## Weather Code Reference

The application displays weather information from OpenWeatherMap. For weather code details, visit: https://openweathermap.org/weather-conditions


## Assumptions

- **Country Restriction**: Only Australian cities are supported. Searches for cities outside Australia will return an error.
- **City Name Input**: Users must enter valid Australian city names. No fuzzy matching or suggestions are provided.
- **Weather Data**: Only current weather conditions are shown (no forecast or historical data).
- **Weather Codes**: The app uses a simplified mapping for weather codes and may not show all possible OpenWeatherMap conditions.
- **Bushfire-Prone Cities**: The quick-access buttons under the search bar are based on commonly recognized bushfire-prone cities in NSW.
- **API Source**: All weather data is fetched from the free OpenWeatherMap API via the backend.

## Limitations

- **Australia Only**: Only Australian cities are supported for weather data
- **No Forecast Data**: Currently displays only current weather conditions
- **City Name Only**: Searches must use city names; coordinates-based lookups are not supported
- **Rate Limiting**: OpenWeatherMap API has rate limits; free tier allows 60 calls/minute
- **Disambiguation**: Ambiguous city names (e.g., "Springfield") may return results for the most common Australian location
- **Location Accuracy**: Weather is tied to the official coordinates of the requested city

## Development Notes
- **Design System**: Uses CSS custom properties for consistent theming across light and dark modes
- **Component Architecture**: Follows component-driven development with clear separation of concerns
- **API Security**: All weather API calls are made from the backend to avoid CORS issues and protect the API key
- **Australia-Only**: Backend validates that all city searches return Australian locations only

## Troubleshooting

**Build Issues:**
- Ensure you're using Node.js v18 or higher
- Clear `node_modules` and pnpm cache: `pnpm install --force`

**API Not Responding:**
- Verify the `OPENWEATHER_API_KEY` environment variable is set
- Check that your API key is valid (sign up at https://openweathermap.org/api if needed)
- Verify the server is running on port 3001
- Check browser console for CORS errors
- Verify internet connectivity

**"Location not found" Errors:**
- Try searching with a major Australian city name (e.g., "Sydney", "Melbourne", "Brisbane")
- Note that OpenWeatherMap is case-insensitive
- Only Australian cities are supported; searches for non-Australian locations will be rejected
- Some very small towns may not be in the OpenWeatherMap database

**API Rate Limiting:**
- Free tier: max 60 calls/minute per API key
- If you hit the limit, wait a minute and try again
- Consider upgrading to a paid tier for higher limits

## Author

RFS Weather App - Assignment Project
