import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/test", (req, res) => {
  res.json({
    ok: true,
    message: "Server is working!",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

// Error handler
app.use(errorHandler);

// Connect MongoDB
connectDB();

// IMPORTANT: Do NOT use app.listen() on Vercel

export default app;