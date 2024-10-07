import mongoose from "mongoose";

// Create a schema for employeeDb
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  Designation: {
    type: String,
    required: true
  },
  JoiningDate: {
    type: Date,
    default: Date.now
  },
  Password: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    unique: true
  },
  leads: [{
    type: mongoose.Schema.Types.Mixed, // Flexible schema to accept any structure
    default: {}
  }]
});

// Pre-save hook to generate employeeId automatically
employeeSchema.pre('save', async function (next) {
  const employee = this;

  const lastEmployee = await mongoose.model('Employee').findOne().sort({ employeeId: -1 });

  // Extract the last number and increment it
  let nextIdNumber = 10; // Start from 0010 if no employees exist
  if (lastEmployee && lastEmployee.employeeId) {
    const lastId = lastEmployee.employeeId.replace('#CNC', ''); // Remove '#CNC' prefix
    nextIdNumber = parseInt(lastId, 10) + 1; // Increment by 1
  }

  // Generate new employeeId with #CNC prefix
  employee.employeeId = `#CNC${nextIdNumber.toString().padStart(4, '0')}`;

  next();
});

// Create a model for employeeDb
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
