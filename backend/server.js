import express from "express";
import cors from 'cors'; // Importing cors
import 'dotenv/config'; // Loads environment variables
import router from "./router/adminRouter.js";
import connectDB from "./database/connection.js";
import {findAndDeleteLeads } from "./database/countLeads.js";
import empRouter from "./router/employeeRouter.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());   

connectDB()
// findAndDeleteLeads()

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['https://kinsukicafe.vercel.app',"http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure OPTIONS is included
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.get("/",(req,res)=>{
  res.json({
    message:"everything is fine"
  })
})

app.use(cors(corsOptions));

app.use('/api', router);
app.use('/api', empRouter);


// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
