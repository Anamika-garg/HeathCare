export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  address: {
    line: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  dob: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
}

export interface MedicalInfo {
  birthDate: string;
  medicalInformation: string;
  chronicConditions: string;
  allergies: string;
  medications: string;
  familyHistory: string;
}

export interface Hospital {
  id: string;
  name: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
  image: string;
}


export interface MedicalRecord {
  medicalInfo: string;
  chronicConditions: string;
  allergies: string;
  medications: string;
  familyHistory: string;
}




export interface Appointment {
  // id: string;
  doctorId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'cancelled' | 'completed';
}

export interface TimeSlot {
  time: string;
  available: boolean;
}