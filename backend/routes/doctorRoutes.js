const { Router } = require("express");
const {registerDoc , loginDoc , getDoctorInfo , getAppointments ,cancelAppointment , updateDoctorProfile}  = require("../controllers/doctorControllers");
const { verifyToken } = require("../middlewares/verifyToken");

const router = Router();

router.post("/register", registerDoc);
router.post("/login", loginDoc);
router.get('/dashboard' , verifyToken , getDoctorInfo);
router.get('/getAppointments' , verifyToken , getAppointments);
router.put('/appointments/:appointmentId/cancel' , verifyToken , cancelAppointment)
router.put('/dashboard' , verifyToken , updateDoctorProfile)

module.exports = router;
