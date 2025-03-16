import mongoose from "mongoose";
import "dotenv/config";

let isConnected; 

async function connectDB() {
    if (isConnected) { 
        console.log("Using existing database connection");
        return;
    }

    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not defined in environment variables');
    }

    console.log("MongoDB URI:", process.env.MONGO_URL); 

    try {
        mongoose.set("strictQuery", false); 
        mongoose.set('debug', true); // Set to true for verbose logging
        const db = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 20000, // Adjust timeout as needed
            maxPoolSize: 10, // Optional: Connection pooling
        });
        isConnected = mongoose.connection.readyState;
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection error:", error); // Log the entire error
        throw error; // Re-throw the error to handle it upstream if necessary
    }
}

export default connectDB;
