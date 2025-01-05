import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdditionalInfo from './pages/AdditionalInfo';
import NearbyHospitals from './pages/NearbyHospitals';
import DoctorAppointments from './pages/DoctorAppointments';
import ResetPassword from './pages/ResetPassword';
import { BPTracker } from './components/BPTracker';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/additional-info" element={<AdditionalInfo />} />
        <Route path="/hospitals" element={<Layout><NearbyHospitals /></Layout>} />
        <Route path="/appointments" element={<Layout><DoctorAppointments /></Layout>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/BP-tracker" element={<Layout><BPTracker /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;