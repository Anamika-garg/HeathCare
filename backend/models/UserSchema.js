const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
  line: {
    type: String,  
    required: true, 
  },
  city: {
    type: String,
    required: true, 
  },
  state: {
    type: String,
    required: true, 
  },
  postalCode: {
    type: String,
    required: true, 
  },
  country: {
    type: String,
    required: true, 
  }
}, { _id: false });


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: [addressSchema],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});


const userFHIRSchema = new mongoose.Schema({
  UserId : {
    type : String,
  },
  FHIR_id : {
    type : String,
  },
  medicalInfo : {
    type : String,
  },
  chronicConditions : {
    type : String,
  },
  allergies : {
    type : String,
  },
  medications : {
    type : String,
  },
  familyHistory : {
    type : String,
  },
})


const User = mongoose.model("User", userSchema);
const UserFHIR = mongoose.model("UserFHIR", userFHIRSchema);

module.exports = {User , UserFHIR};
