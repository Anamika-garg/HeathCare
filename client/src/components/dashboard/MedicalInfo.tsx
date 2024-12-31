import React from 'react';
import { Activity } from 'lucide-react';
import { User } from '../../types';

interface MedicalInfoProps {
  user: User | null;
}

export function MedicalInfo({ user }: MedicalInfoProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center">
        <Activity className="w-5 h-5 mr-2" />
        Medical Information
      </h2>
      {user ? (
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-medium">Blood Group:</span> {user.bloodGroup}
          </p>
          <p>
            <span className="font-medium">Date of Birth:</span>{' '}
            {new Date(user.dob).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {user.gender}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Loading medical information...</p>
      )}
    </div>
  );
}