import { api } from '../axios';

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  specialization: string;
  degree: string;
  experienceYears: string;
}

export const register = async (data: RegisterData) => {
  const response = await api.post('/register', data);
  return response.data;
};

export interface AuthResponse {
  token: string;
  user: any;
}

export const auth = {
  logout: async () => {
    try {
      // await api.post('/auth/logout');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  updateProfile: async (data: any) => {
    try {
      const response = await api.put('/doctor/profile', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};