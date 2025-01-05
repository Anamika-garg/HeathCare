import React ,{useState , useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppointmentsList } from "./appointments/AppointmentsList";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import axios from "axios";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route path='/appointments' element ={<AppointmentsList/>} /> */}
          <Route element={<SharedDashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<AppointmentsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

interface Doctor {
  id: string;
  fullName: string;
  email: string;
  specialization: string;
  degree: string;
  experienceYears: number;
}


function SharedDashboardLayout() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    async function getInfo() {
      try {
        const res = await axios.get('https://heath-care-backend.vercel.app/api/doctor/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDoctor(res.data);
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    }

    getInfo();
  }, []);

  if (!doctor) return <div>Loading...</div>;

  return <DashboardLayout doctor={doctor} />;
}

export default App;
