import { useState, useEffect } from "react";
import { Calendar, Clock, User, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "../lib/axios";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

interface Appointment {
  id: string; // Make sure this corresponds to the API's response structure
  patientName: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

export function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/getAppointments');
      console.log('API Response:', response);

      // Log the data structure to check if it is an array or nested
      console.log('Response data:', response.data);

      // Check if the response data is an array of appointments
      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else if (response.data && Array.isArray(response.data.AppointmentsData)) {
        // If the response data has an 'appointments' property
        setAppointments(response.data.AppointmentsData);
      } else {
        toast.error('Invalid appointments data received');
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch appointments');
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId: string) => {
    try {
      // Assuming the API call for cancellation is correct
      const response = await api.put(`/appointments/${appointmentId}/cancel`);
      // console.log(appointmentId)
      if (response.status === 200) {
        toast.success("Appointment cancelled successfully");
        // Update local state to reflect the cancellation
        setAppointments(
          appointments.map((apt) =>
            apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
          )
        );
      } else {
        toast.error("Failed to cancel appointment");
      }
    } catch (error) {
      toast.error("Failed to cancel appointment");
      console.error("Error cancelling appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    // <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
          <div className="flex gap-2">
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value="all">All Appointments</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id} // Ensure the correct key is used here
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {appointment.patientName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    appointment.status === "scheduled"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </span>
              </div>

              {appointment.status === "scheduled" && (
                <button
                  onClick={() => handleCancel(appointment._id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No appointments
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any appointments scheduled.
            </p>
          </div>
        )}
      </div>
    // </DashboardLayout>
  );
}
