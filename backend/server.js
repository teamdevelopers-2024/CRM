import express from "express";
import cors from 'cors'; // Importing cors
import 'dotenv/config'; // Loads environment variables
import router from "./Router.js"; // Assuming you have a router defined in this file

const app = express();

// Define a port to listen on. Use environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Use CORS
app.use(cors()); // Add this middleware before your routes

// Use your defined routes
app.use('/api', router);

// Sample POST route to handle form submission
app.post('/submit-form', (req, res) => {
    try {
      const formData = req.body;
      console.log("Form data received:", formData);
      res.send('Form submitted successfully');
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error processing form");
    }
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
