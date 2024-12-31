import React from 'react';
import { X } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import MedicalInfoForm from './forms/MedicalInfoForm';
import { User, MedicalRecord } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  medical: MedicalRecord | null;
  onUpdateProfile: (data: any) => Promise<void>;
  onUpdateMedical: (data: any) => Promise<void>;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  medical,
  onUpdateProfile,
  onUpdateMedical
}: EditProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 grid gap-6 md:grid-cols-2">
          <PersonalInfoForm user={user} onSubmit={onUpdateProfile} />
          <MedicalInfoForm medical={medical} onSubmit={onUpdateMedical} />
        </div>
      </div>
    </div>
  );
}