import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
    
const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ message: "Server running" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});