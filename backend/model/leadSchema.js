import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({}, { strict: false }); // Allow dynamic fields
const Lead = mongoose.model('Lead', leadSchema);

export default Lead;