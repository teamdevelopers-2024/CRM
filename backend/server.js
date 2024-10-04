import express from "express";
import cors from 'cors'; // Importing cors
import 'dotenv/config'; // Loads environment variables
import router from "./router/adminRouter.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', router);


// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
