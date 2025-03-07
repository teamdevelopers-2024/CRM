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
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173", "https://crm.codeandclick.in","http://192.168.137.1:5173","https://crm-two-rho.vercel.app"];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url, 'from origin:', req.get('Origin'));
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
