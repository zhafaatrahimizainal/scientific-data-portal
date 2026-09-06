import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { verifyAuth } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Protected test endpoint
app.get("/api/protected-data", verifyAuth, (req, res) => {
  res.json({
    message: "Authenticated access granted",
    user: req.user,
  });
});

export default app;