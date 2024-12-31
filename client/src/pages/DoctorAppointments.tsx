import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import for navigation
import { Doctor, Appointment } from '../types';
import { fetchDoctors, getAppointments } from '../lib/api';  // Update API function import
import { DoctorCard } from '../components/DoctorCard';
import { AppointmentModal } from '../components/AppointmentModal';
import { AppointmentsList } from '../components/AppointmentsList';

export default function DoctorAppointments() {
  const navigate = useNavigate();  // For navigating to login page
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      navigate('/login');  // Redirect to login if not authenticated
    } else {
      loadDoctors();
      loadAppointments();
    }
  }, [navigate]);

  // Function to check if the user is authenticated
  const checkAuthentication = () => {
    // Check for authentication status, for example using localStorage or context
    const token = localStorage.getItem('token');  // Replace with your auth check logic
    return token !== null;  // Replace this with the actual authentication check
  };

  const loadDoctors = async () => {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <AppointmentsList
          appointments={appointments}
          doctors={doctors}
          onUpdate={loadAppointments}
        />
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Doctors</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {
              doctors.length>0 ? doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookAppointment={handleBookAppointment}
                />
              )) : <h1>No Doctors Registered yet </h1>
            }
            
          </div>
        </div>

        <AppointmentModal
          doctor={selectedDoctor}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={loadAppointments}
        />
      </div>
    </div>
  );
}
