import React from 'react';
import { Calendar, Building2, ClipboardList, UserPlus } from 'lucide-react';

const features = [
  {
    name: 'Easy Registration',
    description: 'Quick and secure sign-up process with comprehensive health profile creation.',
    icon: UserPlus
  },
  {
    name: 'Doctor Appointments',
    description: 'Book appointments with top healthcare professionals at your convenience.',
    icon: Calendar
  },
  {
    name: 'Nearby Hospitals',
    description: 'Find and get directions to the nearest healthcare facilities.',
    icon: Building2
  },
  {
    name: 'Medical Records',
    description: 'Securely store and access your medical history anytime, anywhere.',
    icon: ClipboardList
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive healthcare management at your fingertips
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.name} className="relative">
                <div className="absolute h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}