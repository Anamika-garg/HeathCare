import React, { useEffect, useState } from 'react';
import { Hospital } from '../types';
import { Button } from '../components/Button';
import axios from 'axios';
import HospitalCard from '../components/HospitalCard';
import { useNavigate } from 'react-router-dom';

export default function NearbyHospitals() {
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [hospitalData, setHospitalData] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
          console.log(latitude, longitude); // Optional: for debugging
        },
        function (error) {
          console.error(error); // Handle geolocation error
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getNearbyHospitals();
    }
  }, [location]);

  async function getNearbyHospitals() {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/get-nearby-hospitals`,
        location,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(res.data.hospitalData);
      setHospitalData(res.data.hospitalData);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nearby Hospitals</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hospitalData.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              id={hospital.id}
              name={hospital.name}
              phone={hospital.phone}
              latitude={hospital.latitude}
              longitude={hospital.longitude}
            />
          ))}

          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
