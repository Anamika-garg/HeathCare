import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import axios from 'axios';
import { toast ,ToastContainer } from 'react-toastify';

export default function AdditionalInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medicalInfo: '',
    chronicConditions: '',
    allergies: '',
    medications: '',
    familyHistory: '',
  });

  const [customMedicalInfo, setCustomMedicalInfo] = useState('');
  const [customChronicConditions, setCustomChronicConditions] = useState('');
  const [customAllergies, setCustomAllergies] = useState('');
  const [customMedications, setCustomMedications] = useState('');
  const [customFamilyHistory, setCustomFamilyHistory] = useState('');

  const medicalConditions = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'Stroke',
    'Kidney Disease',
    'Cancer',
    'None of the Above',
  ];

  const allergyOptions = [
    'Pollen',
    'Dust',
    'Food (e.g., nuts, dairy)',
    'Insect stings',
    'Penicillin',
    'None',
  ];

  const medicationOptions = [
    'Aspirin',
    'Ibuprofen',
    'Paracetamol',
    'Antibiotics',
    'None',
  ];

  const familyHistoryOptions = [
    'Diabetes',
    'Heart Disease',
    'Cancer',
    'Hypertension',
    'Mental Health Conditions',
    'None',
  ];

  const chronicConditionsOptions = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'Stroke',
    'None',
  ];

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Add your backend logic here for saving the data
    console.log(formData);

    try {

      const res = await axios.post(`https://heath-care-backend.vercel.app/api/user/medical-info` , formData , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Or use token from context
        }});
      console.log(res);

      // Show success message
        toast.success("Registration successful!");
      
      // Redirect to additional info page
      setTimeout(() => {
        
        navigate('/dashboard');
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
    // After saving, navigate to another page (e.g., user dashboard or home)
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Additional Information</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="medicalInfo" className="block text-sm font-medium text-gray-700">
                Medical Information
              </label>
              <select
                id="medicalInfo"
                name="medicalInfo"
                className="p-2 mt-2 block w-full border border-gray-300 rounded-md"
                value={formData.medicalInfo}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, medicalInfo: value });
                  if (value !== 'None of the Above') {
                    setCustomMedicalInfo('');
                  }
                }}
              >
                <option value="">Select Medical Information</option>
                {medicalConditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
              {formData.medicalInfo === 'None of the Above' && (
                <input
                  type="text"
                  name="customMedicalInfo"
                  placeholder="Please specify"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                  value={customMedicalInfo}
                  onChange={(e) => setCustomMedicalInfo(e.target.value)}
                />
              )}
            </div>

            <div>
              <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-700">
                Chronic Conditions
              </label>
              <select
                id="chronicConditions"
                name="chronicConditions"
                className="p-2 mt-2 block w-full border border-gray-300 rounded-md"
                value={formData.chronicConditions}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, chronicConditions: value });
                  if (value !== 'None') {
                    setCustomChronicConditions('');
                  }
                }}
              >
                <option value="">Select Chronic Conditions</option>
                {chronicConditionsOptions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
              {formData.chronicConditions === 'None' && (
                <input
                  type="text"
                  name="customChronicConditions"
                  placeholder="Please specify"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                  value={customChronicConditions}
                  onChange={(e) => setCustomChronicConditions(e.target.value)}
                />
              )}
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                Allergies
              </label>
              <select
                id="allergies"
                name="allergies"
                className="p-2 mt-2 block w-full border border-gray-300 rounded-md"
                value={formData.allergies}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, allergies: value });
                  if (value !== 'None') {
                    setCustomAllergies('');
                  }
                }}
              >
                <option value="">Select Allergies</option>
                {allergyOptions.map((allergy) => (
                  <option key={allergy} value={allergy}>
                    {allergy}
                  </option>
                ))}
              </select>
              {formData.allergies === 'None' && (
                <input
                  type="text"
                  name="customAllergies"
                  placeholder="Please specify"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                  value={customAllergies}
                  onChange={(e) => setCustomAllergies(e.target.value)}
                />
              )}
            </div>

            <div>
              <label htmlFor="medications" className="block text-sm font-medium text-gray-700">
                Medications
              </label>
              <select
                id="medications"
                name="medications"
                className="p-2 mt-2 block w-full border border-gray-300 rounded-md"
                value={formData.medications}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, medications: value });
                  if (value !== 'None') {
                    setCustomMedications('');
                  }
                }}
              >
                <option value="">Select Medications</option>
                {medicationOptions.map((medication) => (
                  <option key={medication} value={medication}>
                    {medication}
                  </option>
                ))}
              </select>
              {formData.medications === 'None' && (
                <input
                  type="text"
                  name="customMedications"
                  placeholder="Please specify"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                  value={customMedications}
                  onChange={(e) => setCustomMedications(e.target.value)}
                />
              )}
            </div>

            <div>
              <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700">
                Family History
              </label>
              <select
                id="familyHistory"
                name="familyHistory"
                className="p-2 mt-2 block w-full border border-gray-300 rounded-md"
                value={formData.familyHistory}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, familyHistory: value });
                  if (value !== 'None') {
                    setCustomFamilyHistory('');
                  }
                }}
              >
                <option value="">Select Family History</option>
                {familyHistoryOptions.map((history) => (
                  <option key={history} value={history}>
                    {history}
                  </option>
                ))}
              </select>
              {formData.familyHistory === 'None' && (
                <input
                  type="text"
                  name="customFamilyHistory"
                  placeholder="Please specify"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                  value={customFamilyHistory}
                  onChange={(e) => setCustomFamilyHistory(e.target.value)}
                />
              )}
            </div>

            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
