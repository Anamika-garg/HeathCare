import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Calendar, Activity, Pill, AlertCircle, Heart } from 'lucide-react';

import axios from 'axios';
import { Button } from '../components/Button';
import EditProfileModal from './EditProfileModal';
import { toast , ToastContainer } from 'react-toastify';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [medical, setMedical] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    fetchDetails();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  };

  async function fetchDetails() {
    try {
      const res = await axios.get(`http://localhost:3000/api/user/get-medical-info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.status === 200) {
        setUser(res.data.user);
        setMedical(res.data.medicalRecord);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleUpdateProfile = async (data : any) => {
    try {
      await axios.put(
        'http://localhost:3000/api/user/update-profile',
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchDetails();
      toast.success('Profile updated successfully!');  // Success toast
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');  // Error toast
    }
  };
  
  const handleUpdateMedical = async (data : any) => {
    try {
      await axios.put(
        'http://localhost:3000/api/user/update-medical-info',
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchDetails();
      toast.success('Medical information updated successfully!');  // Success toast
    } catch (error) {
      console.error('Error updating medical info:', error);
      toast.error('Failed to update medical information. Please try again.');  // Error toast
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">My Health Dashboard</h1>
          </div>

          <div className="p-6 grid gap-6 md:grid-cols-2">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <UserCircle className="w-5 h-5 mr-2" />
                  Personal Information
                </h2>
                {user ? (
                  <div className="mt-4 space-y-2">
                    <p>
                      <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {user.mobileNumber}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{' '}
                      {`${user.address[0].line}, ${user.address[0].city}, ${user.address[0].state}, 
                      ${user.address[0].country}`}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">Loading personal information...</p>
                )}
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Medical Information
                </h2>
                {user ? (
                  <div className="mt-4 space-y-2">
                    <p>
                      <span className="font-medium">Blood Group:</span> {user.bloodGroup}
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth:</span>{' '}
                      {new Date(user.dob).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Gender:</span> {user.gender}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">Loading medical information...</p>
                )}
              </div>

              {/* Current Medications */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Pill className="w-5 h-5 mr-2" />
                  Current Medications
                </h2>
                <p className="mt-2 text-gray-600">{medical?.medications || 'None'}</p>
              </div>

              {/* Allergies */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Allergies
                </h2>
                <p className="mt-2 text-gray-600">{medical?.allergies || 'None'}</p>
              </div>

              {/* Family History */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Family History
                </h2>
                <p className="mt-2 text-gray-600">{medical?.familyHistory || 'None'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        medical={medical}
        onUpdateProfile={handleUpdateProfile}
        onUpdateMedical={handleUpdateMedical}
      />
    </div>
  );
}
