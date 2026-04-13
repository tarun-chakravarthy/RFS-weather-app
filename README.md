# RFS Weather App

A full-stack weather application that displays current weather conditions for any location in Australia. Built as a technical assignment for the NSW Rural Fire Service Junior Full Stack Developer role.

## Live Demo

**[https://rfs-weather-app-client.vercel.app](https://rfs-weather-app-client.vercel.app)**

> Note: The API server is hosted on Render's free tier and may take 20–30 seconds to respond on the first request after a period of inactivity. Subsequent requests are fast.

## Features

- **Location Search**: Search for any city in Australia and get current weather conditions
- **Real-time Weather Data**: Temperature, "feels like" temperature, humidity, wind speed, and precipitation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Clear error messages for invalid locations or API issues
- **Australia Only**: Backend validates all searches are within Australia

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Vite (build tool)
- Tailwind CSS 4 (styling)
- lucide-react (icons)

**Backend:**
- Express.js with TypeScript
- Node.js runtime

**API:**
- [OpenWeatherMap API](https://openweathermap.org/api) — Real-time weather data and reverse geocoding

**Tooling:**
- pnpm workspaces (monorepo)
- tsx (TypeScript execution for development)

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- pnpm
- **OpenWeatherMap API Key** — free tier available at https://openweathermap.org/api

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tarun-chakravarthy/RFS-weather-app.git
   cd RFS-weather-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up the API key:**

   Create a `.env` file in the `server` directory:
  ```bash
  OPENWEATHER_API_KEY=your_openweather_api_key_here
  ```

  **Client** (`client/.env`) — optional, local development only:
  ```bash
  # Leave empty to use Vite's dev proxy (recommended for local development)
  # Only set this if running the client without the Vite dev server
  VITE_API_BASE_URL=
  ```

### Running the Application

**Development mode (starts both client and server):**
```bash
pnpm dev
```

Or run them separately:
```bash
# Terminal 1 — Backend (http://localhost:3001)
cd server
pnpm dev

# Terminal 2 — Frontend (http://localhost:5173)
cd client
pnpm dev
```

The frontend proxies API requests to the backend via Vite's dev server — no CORS issues in development.

**Production build:**
```bash
pnpm build

# Run the server
cd server
OPENWEATHER_API_KEY=your_key node dist/index.js
```

## API Endpoints

### GET `/api/weather`

Fetch current weather for an Australian city.

**Query Parameters:**
- `location` (string, required) — Australian city name

**Example:**
```
GET /api/weather?location=Sydney
```

**Success Response:**
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
    "weatherCode": 800,
    "windSpeedKph": 15.2,
    "precipitation": 0
  },
  "lastUpdated": "2024-04-11T15:30:00.000Z"
}
```

**Error — Location not found:**
```json
{
  "error": "Location not found",
  "message": "Location not found: \"InvalidCity\"",
  "statusCode": 404
}
```

**Error — Missing parameter:**
```json
{
  "error": "Missing location",
  "message": "location query parameter is required",
  "statusCode": 400
}
```

### GET `/api/health`

Health check endpoint.

```json
{
  "status": "ok",
  "message": "Server running",
  "timestamp": "2026-04-13T01:30:00.000Z"
}
```

## Project Structure

```
RFS-weather-app/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── constants/         # City lists, location mappings
│   │   ├── services/          # API client
│   │   ├── types/             # TypeScript interfaces
│   │   ├── App.tsx            # Root component with state management
│   │   └── main.tsx           # Entry point
│   ├── tailwind.config.ts
│   └── vite.config.ts
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── weather.ts     # GET /api/weather route handler
│   │   ├── services/
│   │   │   └── openweather.ts # OpenWeatherMap integration
│   │   ├── types/
│   │   │   └── weather.ts     # Shared TypeScript interfaces
│   │   └── index.ts           # Server entry point
│   └── package.json
├── pnpm-workspace.yaml
└── README.md
```


## Assumptions

- **Australia only**: Only Australian cities are supported. Non-Australian searches return a clear error.
- **City name input**: Users must enter a valid city name. No fuzzy matching or autocomplete is provided.
- **Current conditions only**: No forecast or historical data — scope kept to what was required.
- **Weather codes**: The app maps OpenWeatherMap condition IDs to human-readable descriptions covering all major weather conditions.
- **Bushfire city shortcuts**: Quick-access buttons are based on commonly recognised bushfire-prone cities in NSW.

## Limitations

- **Australia only**: International cities are intentionally not supported
- **No forecast**: Current conditions only
- **Render cold start**: Free tier API server may take 20–30 seconds on first load after inactivity
- **Rate limiting**: OpenWeatherMap free tier allows 60 calls/minute
- **City names only**: Coordinate-based lookup not supported

## Troubleshooting

**"Location not found" errors:**
- Use a major city name (e.g. Sydney, Melbourne, Brisbane)
- Only Australian cities are supported
- Very small towns may not be in the OpenWeatherMap database

**API not responding:**
- Confirm `OPENWEATHER_API_KEY` is set in `server/.env`
- Verify the server is running on port 3001
- Check browser console for errors

**Build issues:**
- Ensure Node.js v18 or higher
- Run `pnpm install --force` to clear cache

## Author

Tarun Chakravarthy — Junior Full Stack Developer Assignment, NSW Rural Fire Service 2026