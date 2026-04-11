import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.js";

/**
 * Backend API server for RFS weather application
 */

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ 
    status: "ok",
    message: "Server running",
    timestamp: new Date().toISOString()
  });
});

// Weather API routes
app.use("/api", weatherRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.path} not found`,
    statusCode: 404,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`  Health check: http://localhost:${PORT}/api/health`);
  console.log(`  Weather API: http://localhost:${PORT}/api/weather?location=Sydney`);
});