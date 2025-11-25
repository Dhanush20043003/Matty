import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import designRoutes from "./routes/designRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

// Validate environment variables
if (!process.env.JWT_SECRET) {
  console.error("❌ FATAL: JWT_SECRET is not defined in .env file!");
  process.exit(1);
}

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request Logger
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/upload", uploadRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ 
    message: "Matty API is running 🎨",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || "Something went wrong!", 
    error: process.env.NODE_ENV === "development" ? err.message : {},
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("=====================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔐 JWT_SECRET: ${process.env.JWT_SECRET ? 'Configured ✅' : 'Missing ❌'}`);
  console.log(`💾 MongoDB: ${process.env.MONGO_URI ? 'Configured ✅' : 'Missing ❌'}`);
  console.log("=====================================");
});