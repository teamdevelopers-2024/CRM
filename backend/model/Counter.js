import mongoose from "mongoose";

// Define the counter schema
const counterSchema = new mongoose.Schema({
    count: {
        type: Number, // Corrected typo
        default: -1   // Start with -1 if no lead is assigned yet
    }
});

// Create a Counter model from the schema
const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
