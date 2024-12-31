import React from 'react';
import { UserCircle } from 'lucide-react';
import { Button } from '../Button';
import { User } from '../../types';

interface PersonalInfoProps {
  user: User | null;
  onEditClick: () => void;
}

export function PersonalInfo({ user, onEditClick }: PersonalInfoProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center">
        <UserCircle className="w-5 h-5 mr-2" />
        Personal Information
      </h2>
      {user ? (
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user.mobileNumber}
          </p>
          <p>
            <span className="font-medium">Address:</span>{' '}
            {`${user.address[0].line}, ${user.address[0].city}, ${user.address[0].state}, 
            ${user.address[0].country}`}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Loading personal information...</p>
      )}
      <Button
        variant="outline"
        className="mt-4"
        onClick={onEditClick}
      >
        Edit Profile
      </Button>
    </div>
  );
}