import express from "express";
import cors from 'cors'; // Importing cors
import 'dotenv/config'; // Loads environment variables
import router from "./router/adminRouter.js";
import connectDB from "./database/connection.js";
import {findAndDeleteLeads } from "./database/getLead.js";
import empRouter from "./router/employeeRouter.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();


const corsOptions = {
  origin: ['https://crm-two-rho.vercel.app','http://localhost:5173'], // Specify the allowed origin
  methods: ['GET', 'POST','PUT','DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies or authorization headers
};

app.use(cors(corsOptions)); 
app.use(express.json()); // Parse incoming JSON requests


// Error-handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    message: "everything is fine"
  });
});


app.use('/api', router);
app.use('/api', empRouter);

// Start the server
app.listen(PORT,"0.0.0.0", (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
