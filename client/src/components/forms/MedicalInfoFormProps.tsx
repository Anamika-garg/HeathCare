import React from 'react';
import { useForm } from 'react-hook-form';
import { MedicalRecord } from '../../types';

interface MedicalInfoFormProps {
  medical: MedicalRecord | null;
  onSubmit: (data: any) => Promise<void>;
}

export default function MedicalInfoForm({ medical, onSubmit }: MedicalInfoFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      medicalInfo: medical?.medicalInfo || '',
      chronicConditions: medical?.chronicConditions || '',
      allergies: medical?.allergies || '',
      medications: medical?.medications || '',
      familyHistory: medical?.familyHistory || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold">Medical Information</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">Medical Information</label>
        <textarea
          {...register('medicalInfo')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="General health information"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Chronic Conditions</label>
        <textarea
          {...register('chronicConditions')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="List any chronic conditions"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Allergies</label>
        <textarea
          {...register('allergies')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="List any allergies"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Medications</label>
        <textarea
          {...register('medications')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="List current medications"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Family History</label>
        <textarea
          {...register('familyHistory')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Relevant family medical history"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Update Medical Information
      </button>
    </form>
  );
}