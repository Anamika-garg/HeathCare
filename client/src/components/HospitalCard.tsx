import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { Button } from './Button';

const HospitalCard = ({
  id,
  name,
  phone,
  latitude,
  longitude,
}: {
  id: string;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
}) => {
  const [userLocation, setUserLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
        },
        function (error) {
          console.log(error); // Handle error if geolocation fails
          alert('Unable to get your location. Please enable location services and try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, []);

  // Handle the click to show directions
  const handleShowDirections = () => {
    if (userLocation.latitude && userLocation.longitude) {
      const userLat = userLocation.latitude;
      const userLng = userLocation.longitude;

      // Create Google Maps directions URL
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${latitude},${longitude}&travelmode=driving`;

      // Open directions in a new tab
      window.open(directionsUrl, '_blank');
    } else {
      alert('Unable to get your location. Please try again later.');
    }
  };

  return (
    <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{name}</h3>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-2" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>
              {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleShowDirections}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
          >
            Show Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
