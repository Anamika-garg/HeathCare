import { rest } from 'msw';
import { setupWorker } from 'msw';

// Mock data
const mockUsers = [
  {
    id: '1',
    email: 'doctor@example.com',
    fullName: 'Dr. John Doe',
    specialization: 'Cardiology',
    degree: 'MD',
    experienceYears: 10
  }
];

const mockAppointments = [
  {
    id: '1',
    doctorId: '1',
    patientName: 'Jane Smith',
    appointmentDate: '2024-03-20T10:00:00Z',
    status: 'pending'
  }
];

// Mock API handlers
// export const handlers = [
//   // Auth endpoints
//   rest.post('/api/auth/login', async (req, res, ctx) => {
//     const { email, password } = await req.json();
//     const user = mockUsers.find(u => u.email === email);
    
//     if (user && password === 'password') {
//       return res(
//         ctx.json({
//           token: 'mock-jwt-token',
//           user
//         })
//       );
//     }
    
//     return res(
//       ctx.status(401),
//       ctx.json({ message: 'Invalid credentials' })
//     );
//   }),

//   // User profile
//   rest.get('/api/user/profile', (req, res, ctx) => {
//     const user = mockUsers[0]; // For demo, always return first user
//     return res(ctx.json(user));
//   }),

//   // Appointments
//   rest.get('/api/appointments', (req, res, ctx) => {
//     return res(ctx.json(mockAppointments));
//   })
// ];

// // Initialize MSW worker
// export const worker = setupWorker(...handlers);