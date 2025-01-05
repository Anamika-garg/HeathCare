import React, { useState , useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Heart } from 'lucide-react';
import { User } from '../types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer
import { AuthContext } from "../Context/AuthContext";

import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const { login } = useContext(AuthContext);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add validation logic here

    try {
      const res = await axios.post(`https://heath-care-backend.vercel.app/api/user/register`, formData);
      console.log(res);

      // Show success message
        toast.success("Registration successful!");  
        let userToken = res.data.token;
        login(userToken);
      
      // Redirect to additional info page
      setTimeout(() => {
        
        navigate('/additional-info');
      }, 1000);
    } catch (error) {
      console.error(error);
    
      // Check if the error response is from the server
      if (error.response) {
        // Server responded with a status other than 2xx
        const errorMessage = error.response.data.error || "An error occurred while registering.";
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Heart className="mx-auto h-12 w-12 text-blue-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="First Name"
                type="text"
                required
                error={errors.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder='Enter You First Name'
              />
              <Input
                label="Last Name"
                type="text"
                required
                error={errors.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder='Enter You Last Name'
              />
            </div>

            <Input
              label="Email"
              type="email"
              required
              error={errors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder='Enter You Email Address'
            />

            <Input
              label="Password"
              type="password"
              required
              error={errors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder='Create Your Password'
            />

            <Input
              label="Confirm Password"
              type="password"
              required
              error={errors.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder='Confirm You Password'
            />

            <Input
              label="Mobile Number"
              type="tel"
              required
              error={errors.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                placeholder='Enter You mobile number'
            />

            {/* Address Fields */}
            <Input
              label="Address Line"
              type="text"
              required
              error={errors.address?.line}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line: e.target.value } })}
                placeholder='Line'
            />

            <Input
              label="City"
              type="text"
              required
              error={errors.address?.city}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                placeholder='City'
            />

            <Input
              label="State"
              type="text"
              required
              error={errors.address?.state}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                placeholder='State'
            />

            <Input
              label="Postal Code"
              type="text"
              required
              error={errors.address?.postalCode}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, postalCode: e.target.value } })}
                placeholder='Postal Code'
            />

            <Input
              label="Country"
              type="text"
              required
              error={errors.address?.country}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                placeholder='Country'
            />

            <Input
              label="Date of Birth (DOB)"
              type="date"
              required
              error={errors.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />

            <div className="mt-2">
              <span className="block text-sm font-medium text-gray-700">Gender</span>
              <div className="flex items-center space-x-4 mt-2">
                {genders.map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={() => setFormData({ ...formData, gender })}
                    />
                    <span className="ml-2 text-sm text-gray-600">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                className="mt-2 block w-full border border-gray-300 rounded-md p-1"
                value={formData.bloodGroup || ''}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
