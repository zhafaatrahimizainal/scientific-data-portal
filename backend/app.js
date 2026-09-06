import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { verifyAuth } from "./middleware/auth.middleware.js";
import datasetRoutes from "./routes/datasetRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Scientific Datasets API Routes
app.use("/api/datasets", datasetRoutes);

// Protected test endpoint
app.get("/api/protected-data", verifyAuth, (req, res) => {
  res.json({
    message: "Authenticated access granted",
    user: req.user,
  });
});

export default app;