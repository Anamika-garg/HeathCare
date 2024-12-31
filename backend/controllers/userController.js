const { User, UserFHIR } = require("../models/UserSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
const axios = require("axios");
const BPReading = require('../models/BPReading.js');
const Appointment = require("../models/Appointment.js");
const Doctor = require("../models/DoctorSchema.js");


const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "A1+",
  "A1-",
  "A2+",
  "A2-",
  "A1B+",
  "A1B-",
  "A2B+",
  "A2B-",
  "Bombay Blood Group (hh)",
  "Rh-null",
];

//post -> /api/user/register
async function registerUser(req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      mobileNumber,
      address,
      dob,
      gender,
      bloodGroup,
    } = req.body;
    // console.log(req.body)

    if (
      (!firstName,
      !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !mobileNumber ||
        !address ||
        !dob ||
        !gender ||
        !bloodGroup)
    ) {
      return res.status(422).json({
        error: "Fill all the details!",
      });
    }
    if (password.length < 8) {
      return res
        .status(422)
        .json({ error: "Password must be at least 8 characters long." });
    }
    if (!email.includes("@")) {
      return res.status(422).json({ error: "Invalid email address." });
    }

    if (password != confirmPassword) {
      return res
        .status(422)
        .json({ error: "Passwords and confirm passwords do not match" });
    }
    if (mobileNumber.length !== 10) {
      return res.status(422).json({ error: "Invalid mobile number." });
    }

    if (!bloodGroups.includes(bloodGroup)) {
      return res.status(422).json({ error: "Invalid Blood Group." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ error: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      mobileNumber,
      address,
      dob,
      gender,
      bloodGroup,
    });

    await newUser.save();

    const { _id: id, name } = newUser;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .json({ success: "User registered successfully!", User , token });

  } catch (err) {
    console.log("Error Occured", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Post -> /api/user/login
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const userEmail = email.toLowerCase();

    const user = await User.findOne({ email: userEmail });

    if (!email.includes("@")) {
      return res.status(422).json({
        error: "Please Enter a Valid email id",
      });
    } else if (!user) {
      return res.status(404).json({
        error: "User does not exists!",
      });
    } else {
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res.status(422).json({
          error: "Invalid Credentials!",
        });
      } else {
        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          token,
          id,
          name,
          success: `Successfully Signed in as ${userEmail} `,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// Post -> /api/user/reset-password

async function requestPasswordReset(req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1800000; // 30 min
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      text: `You can reset your password using this link: ${resetUrl}`,
    }).catch((err) => console.error("SendMail Error:", err));;

    res.status(200).json({
      message: "Password reset email sent.",
      mailContent: `You can reset your password using this link: ${resetUrl}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Post -> /api/user/reset-password/:token

async function resetPassword(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear the token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password.", error });
  }
}

//Create Patient Resource
//Post -> /api/user/medical-info
async function UserMedicalInfo(req, res, next) {
  const userInput = req.body;
  const userId = req.user.id;
  console.log(userInput)

  if (!userInput.medicalInfo) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const recordExists = await UserFHIR.findOne({ UserId: userId });
  if (recordExists) {
    console.log(recordExists);
    return res.status(422).json({
      error: "Duplicate Entry not allowed",
    });
  }
  const user = await User.findOne({ _id: userId });

  const isoDate = user.dob.toISOString();
  const dob = isoDate.split('T')[0];

  try {
    const patientResource = {
      resourceType: "Patient",
      name: [
        {
          family: user.lastName,
          given: user.firstName,
        },
      ],
      birthDate: dob,
      gender: user.gender.toLowerCase(),
      address: [
        {
          line: user.address[0].line,
          city: user.address[0].city,
          state: user.address[0].state,
          postalCode: user.address[0].postalCode,
          country: user.address[0].country,
        },
      ],
      telecom: [
        {
          system: "phone",
          value: user.mobileNumber,
          use: "mobile",
        },
        {
          system: "email",
          value: user.email.toLowerCase(),
        },
      ],
      extension: [
        {
          url: "https://api.myhealthsystem.com/fhir/extensions/chronic-conditions",
          valueString: userInput.chronicConditions,
        },
        {
          url: "https://api.myhealthsystem.com/fhir/extensions/allergies",
          valueString: userInput.allergies,
        },
        {
          url: "https://api.myhealthsystem.com/fhir/extensions/medications",
          valueString: userInput.medications,
        },
        {
          url: "https://api.myhealthsystem.com/fhir/extensions/family-history",
          valueString: userInput.familyHistory,
        },
        {
          url: "https://api.myhealthsystem.com/fhir/extensions/blood-group",
          valueString: user.bloodGroup,
        },
      ],
    };

    console.log(patientResource);

    const response = await axios.post(
      `${process.env.FHIR_SERVER_URL}/Patient`,
      patientResource,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    const newFHIR = new UserFHIR({
      UserId: userId,
      FHIR_id: response.data.id,
      medicalInfo : userInput.medicalInfo,
      chronicConditions : userInput.chronicConditions,
      allergies : userInput.allergies,
      medications : userInput.medications,
      familyHistory : userInput.familyHistory,
    });

    await newFHIR.save();
    res.status(200).json({
      message: "Patient data sent successfully to FHIR server",
      fhirResponse: response.data,
    });
  } catch (error) {

    if(error.status == 500){
      const newFHIR = new UserFHIR({
        UserId: userId,
        FHIR_id: null,
        medicalInfo : req.body.medicalInfo,
        chronicConditions : req.body.chronicConditions ,
        allergies : req.body.allergies ,
        medications : req.body.medications ,
        familyHistory : req.body.familyHistory ,
      });
  
      await newFHIR.save();
    console.log(error);
      res.status(200).json({ success: "Failed to send data to FHIR server. Saved Locally"});
    }
    else{
      res.status(500).json({ error: "Failed to send data to FHIR server"});
    }
    // console.error("Error sending data to FHIR server:", error);
  }
}

//Get Patient Details
//Get -> /api/user/get-medical-info
async function getUserMedicalInfo(req, res, next) {
  try {
    const userId = req.user.id;
    const userRecord = await User.findOne({_id : userId})
    const medicalRecord = await UserFHIR.findOne({ UserId: userId });

    if (!userRecord) {
      return res.status(404).json({
        error: "No Record Found",
      });
    }

    // const fhirId = medicalRecord.FHIR_id;
    // console.log(fhirId);

    // const response = await axios.get(
    //   `${process.env.FHIR_SERVER_URL}/Patient/${fhirId}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log(response);
    res.status(200).json({
      success: "Patient data fetched successfully",
      // fhirResponse: response.data,
      user : userRecord,
      medicalRecord
    });
  } catch (Err) {
    console.log(Err);
    res.status(500).json({error : "Some Internal Server Error Occured"});
  }
}

//POST -> /api/user/get-nearby-hospitals
async function getNearbyHospitals(req, res, next) {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(422).json({
        error: "Location Needed",
      });
    }

    const query = `[out:json];
                  node["amenity"="hospital"](around:5000,${latitude},${longitude});
                  out;`;

    const url = process.env.NEARBY_HOSPITALS_URL;
    
    const response = await axios.post(url , query , {
      headers : {
        'Content-Type': 'text/plain'
      }
    });
    
    const hospitals = response.data.elements;

    const hospitalData = hospitals.map(hospital => ({
      name: hospital.tags.name || "No Name",
      latitude: hospital.lat,
      longitude: hospital.lon,
      address : hospital.tags['addr:full'] ? hospital.tags['addr:full'] : `${hospital.tags['addr:street'] || ''}, ${hospital.tags['addr:city'] || ''}, ${hospital.tags['addr:postcode'] || ''}`.trim(),
      phone: hospital.tags['contact:phone'] || hospital.tags.phone || "Not Available"
    }));

    // console.log(response.data);

    
    return res.status(200).json({
      success: "Fetched Successfully",
      //data : response.data,
      hospitalData
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Some Internal Server Error",
    });
  }
}




//put -> /api/user/update-profile
async function updateProfile(req, res){
  try {
    const {
      firstName,
      lastName,
      mobileNumber,
      address,
      dob,
      gender,
      bloodGroup
    } = req.body;

    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        mobileNumber,
        address,
        dob,
        gender,
        bloodGroup
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Update medical information
//put -> /api/user/update-medical-info
async function updateMedicalInfo(req,res,next){
  try {
    const {
      medicalInfo,
      chronicConditions,
      allergies,
      medications,
      familyHistory
    } = req.body;

    const userId = req.user.id;

    let userFHIR = await UserFHIR.findOne({ UserId: userId });

    if (!userFHIR) {
      // Create new FHIR record if it doesn't exist
      userFHIR = new UserFHIR({
        UserId: userId,
        FHIR_id: `FHIR-${userId}`, // Generate FHIR ID as needed
        medicalInfo,
        chronicConditions,
        allergies,
        medications,
        familyHistory
      });
    } else {
      // Update existing record
      userFHIR.medicalInfo = medicalInfo;
      userFHIR.chronicConditions = chronicConditions;
      userFHIR.allergies = allergies;
      userFHIR.medications = medications;
      userFHIR.familyHistory = familyHistory;
    }

    await userFHIR.save();

    res.status(200).json({
      message: 'Medical information updated successfully',
      medicalRecord: userFHIR
    });
  } catch (error) {
    console.error('Error updating medical information:', error);
    res.status(500).json({ message: 'Error updating medical information', error: error.message });
  }
};





// Get ->  /api/user/readings
//  get BP data
async function getReadings(req,res,next){
  // console.log("get");
  try {
    const userId = req.user.id;
    const readings = await BPReading.find({userId}).sort({ measuredAt: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Post -> upload reading
async function PostReadings(req,res,next) {
  // console.log('post')
  const userId = req.user.id;
  const reading = new BPReading({
    userId,
    systolic: req.body.systolic,
    diastolic: req.body.diastolic,
    pulse: req.body.pulse,
    notes: req.body.notes,
    measuredAt: req.body.measuredAt || new Date()
  });

  

  try {
    const newReading = await reading.save();
    console.log(newReading)
    res.status(201).json(newReading);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};




// Get a specific appointment by ID
async function getUserAppointment(req, res, next) {
  try {
    // Fetch appointments for the user and sort them by date in descending order
    const appointment = await Appointment.find({ patientID: req.user.id }).sort({ createdAt: -1 });

    // If no appointments found, return a 404 status
    if (!appointment || appointment.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Return the sorted appointments
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Error fetching appointment' });
  }
};
// Save an appointment
async function bookAppointment(req, res, next) {
  const { doctorId, patientName, date, time, status } = req.body;
  const patientID = req.user.id;
  
  try {
    // Find the doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create the appointment (no need to set `id` here)
    const appointment = new Appointment({
      doctorId,
      doctorName: doctor.fullName,  // Doctor name from the doctor record
      patientName,
      date,
      time,
      status,
      patientID
    });

    await appointment.save();
    console.log(appointment);
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Update an appointment
async function updateAppointment(req,res,next){
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

// Cancel an appointment (update status)
async function cancelAppointment(req,res,next){
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
};



async function getDoctors(req,res,next) {
  const doc = await Doctor.find({});
  console.log(doc);
  res.status(200).json(doc);

}

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
  UserMedicalInfo,
  getUserMedicalInfo,
  getNearbyHospitals,
  updateProfile,
  updateMedicalInfo,
  getReadings,
  PostReadings,
  // getAppointments,
  getUserAppointment,
  // makeAppointment,
  updateAppointment,
  cancelAppointment,
  bookAppointment,
  getDoctors
};
