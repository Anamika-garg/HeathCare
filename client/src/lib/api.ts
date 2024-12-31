import { Doctor, Appointment } from '../types';
import { MOCK_DOCTORS } from './mockData';
import axios, { AxiosError } from 'axios';
import { APIError } from './error';
const API_URL = 'http://localhost:3000/api/user';

// First try to fetch from API, fallback to mock data if it fails
export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(`${API_URL }/getDoctors`);
    if (!response.ok) throw new Error('Failed to fetch doctors');
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.warn('Falling back to mock data:', error);
    return MOCK_DOCTORS;
  }
}

// Simulated appointments storage using localStorage

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const response = await axios.get(`${API_URL}/appointments` , {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data; // returns the list of appointments from the server
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return []; // return an empty array in case of error
  }
}

export const saveAppointment = async (appointment: Appointment, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/bookAppointment`,  // Adjust this to your actual backend API endpoint
      appointment,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
      }
    );
    console.log("Appointment saved:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error saving appointment:", err);
    throw err;
  }
};
export async function updateAppointment(updatedAppointment: Appointment): Promise<Appointment | null> {
  try {
    const response = await axios.put(`${API_URL}/appointments/${updatedAppointment._id}`, updatedAppointment, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data; // returns the updated appointment from the server
  } catch (error) {
    console.error('Error updating appointment:', error);
    return null; // return null in case of error
  }
}

export async function cancelAppointment(appointmentId: string): Promise<Appointment | null> {
  try {
    const response = await axios.patch(`${API_URL}/appointments/${appointmentId}/cancel`, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data; // returns the updated (cancelled) appointment from the server
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return null; // return null in case of error
  }
}



export interface BPReading {
  _id: string;
  systolic: number;
  diastolic: number;
  pulse?: number;
  notes?: string;
  measuredAt: Date;
}

export const api = {
  async getReadings(): Promise<BPReading[]> {
    try {
      const response = await axios.get(`${API_URL}/readings` , {
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new APIError(error.response?.data?.message || 'Failed to fetch readings');
      }
      throw new APIError('Failed to fetch readings');
    }
  },

  async addReading(reading: Omit<BPReading, '_id'>): Promise<BPReading> {
    try {
      const response = await axios.post(`${API_URL}/readings`, reading , {
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        throw new APIError(error.response?.data?.message || 'Failed to add reading');
      }
      throw new APIError('Failed to add reading');
    }
  }
};