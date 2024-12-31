const mongoose = require('mongoose');

const bpReadingSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true,
  },
  systolic: {
    type: Number,
    required: true,
    min: 70,
    max: 200
  },
  diastolic: {
    type: Number,
    required: true,
    min: 40,
    max: 130
  },
  pulse: {
    type: Number,
    min: 40,
    max: 200
  },
  notes: String,
  measuredAt: {
    type: Date,
    default: Date.now
  }
});

const BPReading =  mongoose.model('BPReading', bpReadingSchema);

module.exports = BPReading;