const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
    min: 0,
  },
  image: { type: String, required: true },  // Added image field
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
