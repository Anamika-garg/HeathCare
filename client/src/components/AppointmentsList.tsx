import { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { Button } from '../components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Appointment, Doctor } from '../types';
import { cancelAppointment, updateAppointment } from '../lib/api';

interface AppointmentsListProps {
  appointments: Appointment[];
  doctors: Doctor[];
  onUpdate: () => void;
}

export function AppointmentsList({
  appointments,
  doctors,
  onUpdate,
}: AppointmentsListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  const handleCancel = (appointment: Appointment) => {
    cancelAppointment(appointment._id);
    onUpdate();
  };

  const handleReschedule = (newTime: string) => {
    if (selectedAppointment) {
      const updated = { ...selectedAppointment, time: newTime };
      updateAppointment(updated);
      setIsRescheduleModalOpen(false);
      onUpdate();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments scheduled</p>
      ) : (
        appointments.map((appointment) => {
          const doctor = doctors.find((d) => d.id === appointment.doctorId);
          return (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            >
              <div className="space-y-2">
                {/* Display Doctor's Name */}
                <h3 className="font-semibold">{doctor?.fullName}</h3>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{JSON.parse(JSON.stringify(appointment.date).split('T')[0])}</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span>{appointment.time}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Status: {appointment.status}
                </div>
              </div>
              {appointment.status === 'scheduled' && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setIsRescheduleModalOpen(true);
                    }}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancel(appointment)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          );
        })
      )}

      <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <select
              className="w-full rounded-md border p-2"
              onChange={(e) => handleReschedule(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select new time
              </option>
              {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(
                (time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                )
              )}
            </select>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
