import { Doctor } from '@/types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    availability: ['Mon 9-5', 'Wed 9-5', 'Fri 9-5'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    availability: ['Tue 10-6', 'Thu 10-6', 'Sat 10-2'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    availability: ['Mon 8-4', 'Wed 8-4', 'Fri 8-4'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300'
  }
];