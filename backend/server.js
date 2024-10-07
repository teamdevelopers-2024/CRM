import express from "express";
import cors from 'cors'; // Importing cors
import 'dotenv/config'; // Loads environment variables
import router from "./router/adminRouter.js";
import connectDB from "./database/connection.js";
import {findAndDeleteLeads } from "./database/getLead.js";
import empRouter from "./router/employeeRouter.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());   

connectDB()
// findAndDeleteLeads()

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:5173', "https://callcenter.codeandclick.in"], // Ensure mobile IP is included
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    message: "everything is fine"
  });
});

app.use('/api', router);
app.use('/api', empRouter);

// Start the server
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
