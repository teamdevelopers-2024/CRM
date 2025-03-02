import express from "express";
import cors from 'cors'; // Importing cors
import 'dotenv/config'; // Loads environment variables
import router from "./router/adminRouter.js";
import connectDB from "./database/connection.js";
import { findAndDeleteLeads } from "./database/getLead.js";
import empRouter from "./router/employeeRouter.js";

const app = express();

// Configure port
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();
// findAndDeleteLeads() // Uncomment if you want to run this on app startup

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [
  "https://crm-two-rho.vercel.app" // Keep only the new allowed origin
  // Add any future allowed origins here
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  console.log("Incoming request:");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Origin:", req.get("Origin"));
  console.log("Headers:", req.headers);
  next();
});

// Example confirmation route
app.get("/confirmation", (req, res) => {
  const response = req.query.response;
  res.send(`${response}, this is the response`); // Fixed the response structure
});

// Error-handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "everything is fine"
  });
});

// Use your routers
app.use('/api', router);
app.use('/api', empRouter);

// Start the server
app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
