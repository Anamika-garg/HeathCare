import { Doctor } from '../types';
import { Button } from '../components/ui/button';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={doctor.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'}
        alt={doctor.fullName}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{doctor.fullName}</h3>
        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
        <p className="text-gray-600">{doctor.degree}</p>
        <p className="text-gray-600">Experience: {doctor.experienceYears} years</p>
        <div className="mt-4 space-y-2">
          {/* Removed availability section since it's not part of the backend data */}
        </div>
        <Button
          className="w-full mt-6"
          onClick={() => onBookAppointment(doctor)}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
