import mongoose from "mongoose";

// Create the schema for closeDb
const closeSchema = new mongoose.Schema({
  paymentScreenshot: {
    type: String,
    required: true, // Ensure a screenshot is uploaded
  },
  reference: {
    type: String,
    unique: true, // Ensure each reference is unique
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true,
  },
  clientPhone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
  leadName: {
    type:String 
  },
  employeeName:{
    type : String 
  }
});

// Create a model for closeDb
const Close = mongoose.model('Close', closeSchema);

export default Close;
