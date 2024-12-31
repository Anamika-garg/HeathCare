const Doctor = require("../models/DoctorSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appointment = require("../models/Appointment");
require('dotenv').config();

async function registerDoc(req, res, next) {
  const { email, password, fullName, specialization, degree, experienceYears } = req.body;

  // List of random image URLs
  const randomImages = [
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=30',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    `https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300`,
    `https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300`,
    `https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=300`];

  try {
    // Check if the doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Randomly select an image URL from the array
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

    // Create a new doctor with the randomly selected image
    const newDoctor = new Doctor({
      email,
      password: hashedPassword,
      fullName,
      specialization,
      degree,
      experienceYears,
      image: randomImage,  // Assign the random image URL
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
  // 2. Doctor Login
async function loginDoc(req,res,next){
    const { email, password } = req.body;
  
    try {
      // Find the doctor by email
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, doctor.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: doctor._id, role: doctor.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
      console.log('login success')
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
async function getDoctorInfo(req,res,next){
  try {
    const docId = req.user.id;
    // console.log(docId)

    const doctor = await Doctor.findOne({ _id: docId });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function getAppointments(req, res, next) {
  const doctorId = req.user.id;

  try {
    const AppointmentsData = await Appointment.find({ doctorId })
      .sort({ createdAt: -1}); // Sort by date and time in ascending order

    if (!AppointmentsData || AppointmentsData.length === 0) {
      return res.status(404).json({
        message: "No appointments found",
      });
    }

    res.status(200).json({
      AppointmentsData,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
}

async function cancelAppointment(req, res, next) {
  const { appointmentId } = req.params;

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);

    // Check if the appointment exists
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Check if the appointment is already cancelled
    if (appointment.status === "cancelled") {
      return res.status(400).json({ error: "Appointment is already cancelled" });
    }

    // Change the status to 'cancelled'
    appointment.status = "cancelled";
    await appointment.save();

    // Fetch the updated appointments list
    const doctorId = req.user.id;
    const AppointmentsData = await Appointment.find({ doctorId })
      .sort({ date: 1, time: 1 }); // Sorted by date and time

    // Send success response with updated data
    res.status(200).json({
      message: "Appointment cancelled successfully",
      AppointmentsData,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
}




module.exports = {
    registerDoc,
    loginDoc,
    getDoctorInfo,
    getAppointments,
    cancelAppointment,
}