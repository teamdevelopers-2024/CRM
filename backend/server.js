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
  origin: '*', // This allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Include credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});



app.use((req, res, next) => {
  console.log("Incoming request:");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Origin:", req.get("Origin"));
  console.log("Headers:", req.headers);
  next();
});


app.get("/confirmation",(req,res)=>{
  const response = req.query.response
  res.send(response,'this is the response')
})


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});




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
