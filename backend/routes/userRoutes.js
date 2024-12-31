const { Router } = require("express");
const {
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
  getDoctors,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);
router.post("/medical-info", verifyToken, UserMedicalInfo);
router.get("/get-medical-info", verifyToken, getUserMedicalInfo);
router.post("/get-nearby-hospitals", getNearbyHospitals);
router.put("/update-profile", verifyToken, updateProfile);
router.put("/update-medical-info", verifyToken, updateMedicalInfo);
router.get("/readings", verifyToken, getReadings);
router.post("/readings", verifyToken, PostReadings);
// router.get("/appointments", verifyToken, getAppointments);
router.get("/appointments", verifyToken, getUserAppointment);
// router.post("/appointments", verifyToken, makeAppointment);
router.put("/appointments/:id", verifyToken, updateAppointment);
router.patch("/appointments/:id/cancel", cancelAppointment);
router.get("/getDoctors",  getDoctors);
router.post('/bookAppointment' , verifyToken, bookAppointment)

module.exports = router;
