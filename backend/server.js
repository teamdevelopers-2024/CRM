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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [
  "https://crm-two-rho.vercel.app", // Add your allowed origin
  // Add more origins as needed
];

// Example to remove a header
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');  // Remove a specific header
  next();  // Pass the request to the next middleware
});


app.use((req, res, next) => {
  const origin = req.get("Origin");
  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    res.header("Access-Control-Allow-Origin", origin);  // Set the allowed origin header dynamically
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");  // Allow credentials (cookies, auth headers)
  }
  next();
});

// Request logging middleware (for debugging purposes)
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
