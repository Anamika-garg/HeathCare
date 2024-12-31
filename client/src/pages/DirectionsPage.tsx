import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import maplibregl from 'maplibre-gl';

export default function DirectionsPage() {
  const location = useLocation(); // Retrieve state from navigate
  const mapContainer = useRef(null);

  // Extract the state passed via navigate
  const { userLatitude, userLongitude, hospitalLatitude, hospitalLongitude } = location.state;

  // Define current location and destination
  const currentLocation = { lat: userLatitude, lng: userLongitude };
  const destination = { lat: hospitalLatitude, lng: hospitalLongitude };

  useEffect(() => {
    // Create a new map instance
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://maps.tilehosting.com/styles/streets/style.json?key=w2pUoYkmxmHpq7SRx6MD', // Ensure this is a valid style URL
      center: [currentLocation.lng, currentLocation.lat],
      zoom: 13,
    });

    // Add markers for the user's location and the hospital's location
    new maplibregl.Marker().setLngLat([currentLocation.lng, currentLocation.lat]).addTo(map);
    new maplibregl.Marker().setLngLat([destination.lng, destination.lat]).addTo(map);

    // Optional: Add a line between the current location and the destination
    const coordinates = [
      [currentLocation.lng, currentLocation.lat], // Starting point
      [destination.lng, destination.lat], // End point
    ];

    map.on('load', () => {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ff0000',
          'line-width': 4,
        },
      });
    });

    // Cleanup the map on component unmount
    return () => map.remove();
  }, [currentLocation, destination]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ height: '100vh', width: '100%' }} // Ensure the map takes up the full height
      />
    </div>
  );
}

