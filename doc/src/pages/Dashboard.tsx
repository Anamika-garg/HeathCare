import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { AppointmentsList } from '../appointments/AppointmentsList';

interface Doctor {
  id: string;
  fullName: string;
  email: string;
  specialization: string;
  degree: string;
  experienceYears: number;
}

function Dashboard() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Doctor>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    try {
      const res = await axios.get('http://localhost:3000/api/doctor/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDoctor(res.data); // Assuming the API returns a doctor object directly
      setFormData(res.data); // Set the fetched data to formData for editing
    } catch (error) {
      toast.error('Failed to fetch doctor information');
      console.error('Error fetching doctor info:', error);
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        'http://localhost:3000/api/doctor/dashboard',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setDoctor(res.data); // Update doctor state with the updated data
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    // <DashboardLayout doctor={doctor}>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {editing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization || ''}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    value={formData.degree || ''}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.experienceYears || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, experienceYears: parseInt(e.target.value) })
                    }
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="mt-2 text-gray-900">{doctor.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-2 text-gray-900">{doctor.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialization</label>
                  <p className="mt-2 text-gray-900">{doctor.specialization}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <p className="mt-2 text-gray-900">{doctor.degree}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <p className="mt-2 text-gray-900">{doctor.experienceYears}</p>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
        {/* <AppointmentsList/> */}
      </div>
    // </DashboardLayout>
  );
}

export default Dashboard;
