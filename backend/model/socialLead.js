// Create a schema for leads
import mongoose from "mongoose";



const socialLead = new mongoose.Schema({
    leadReference: {
      type: String,
      unique:false
    },
    status: {
      type: String,
    },
    name: {
      type: String,
      required: false, // Optional field
    },
    college: {
      type: String,
      required: false, // Optional field
    },
    email: {
      type: String,
      required: false, // Optional field
    },
    phone: {
      type: String,
      required: false, // Optional field
    },
    place: {
      type: String,
      required: false, // Optional field
    },
    assignDate: {
      type:Date,
      default:Date.now()
    }
  });


  // Create a model for employeeDb
const Social = mongoose.model('Social', socialLead);

export default Social;
