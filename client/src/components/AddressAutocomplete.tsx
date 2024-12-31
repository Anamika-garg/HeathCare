import React from 'react';
import GooglePlacesAutocomplete from 'react-google-autocomplete';

interface AddressAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  error?: string;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onPlaceSelected, error }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Search Address
      </label>
      <GooglePlacesAutocomplete
        className={`mt-1 block w-full rounded-md border ${
          error ? 'border-red-300' : 'border-gray-300'
        } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
        apiKey="YOUR_GOOGLE_API_KEY"
        onPlaceSelected={(place) => {
          if (place) {
            onPlaceSelected(place);
          }
        }}
        options={{
          types: ['address'],
        }}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
