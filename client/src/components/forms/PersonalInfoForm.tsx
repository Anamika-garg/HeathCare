import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../types';

interface PersonalInfoFormProps {
  user: User | null;
  onSubmit: (data: any) => Promise<void>;
}

export default function PersonalInfoForm({ user, onSubmit }: PersonalInfoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      mobileNumber: user?.mobileNumber || '',
      'address[0].line': user?.address?.[0]?.line || '',
      'address[0].city': user?.address?.[0]?.city || '',
      'address[0].state': user?.address?.[0]?.state || '',
      'address[0].postalCode': user?.address?.[0]?.postalCode || '',
      'address[0].country': user?.address?.[0]?.country || '',
      dob: user?.dob ? user.dob.split('T')[0] : '',
      gender: user?.gender || '',
      bloodGroup: user?.bloodGroup || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
        <input
          type="text"
          {...register('mobileNumber', { required: 'Mobile number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.mobileNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Blood Group</label>
        <input
          type="text"
          {...register('bloodGroup', { required: 'Blood group is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.bloodGroup && (
          <p className="mt-1 text-sm text-red-600">{errors.bloodGroup.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <div className="space-y-2">
          <input
            type="text"
            {...register('address[0].line', { required: 'Address line is required' })}
            placeholder="Street Address"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors['address[0].line'] && (
            <p className="mt-1 text-sm text-red-600">{errors['address[0].line'].message}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register('address[0].city', { required: 'City is required' })}
              placeholder="City"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors['address[0].city'] && (
              <p className="mt-1 text-sm text-red-600">{errors['address[0].city'].message}</p>
            )}

            <input
              type="text"
              {...register('address[0].state', { required: 'State is required' })}
              placeholder="State"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors['address[0].state'] && (
              <p className="mt-1 text-sm text-red-600">{errors['address[0].state'].message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register('address[0].postalCode', { required: 'Postal Code is required' })}
              placeholder="Postal Code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors['address[0].postalCode'] && (
              <p className="mt-1 text-sm text-red-600">{errors['address[0].postalCode'].message}</p>
            )}

            <input
              type="text"
              {...register('address[0].country', { required: 'Country is required' })}
              placeholder="Country"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors['address[0].country'] && (
              <p className="mt-1 text-sm text-red-600">{errors['address[0].country'].message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Update Personal Information
      </button>
    </form>
  );
}
