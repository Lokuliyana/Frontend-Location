import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

const MapComponent = ({ userLocation, setNotes }) => {
  const [notes, setLocalNotes] = useState([]); // Default to an empty array

  useEffect(() => {
    // Fetch nearby notes whenever userLocation changes
    if (userLocation) {
      fetchNearbyNotes(userLocation[0], userLocation[1]);
    }
  }, [userLocation]);

  const fetchNearbyNotes = async (latitude, longitude) => {
    try {
      const response = await axios.get(`/api/notes/nearby`, {
        params: {
          lat: latitude,
          lon: longitude,
        },
      });
      setLocalNotes(response.data); // Set the fetched notes in local state
      setNotes(response.data); // Update parent state
    } catch (error) {
      console.error('Error fetching nearby notes:', error);
    }
  };

  return (
    <MapContainer
      center={userLocation || [51.505, -0.09]}
      zoom={13}
      style={{ height: '400px' }}
      className="mb-6"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Display User Location as a Marker */}
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Ensure 'notes' is always an array before calling .map() */}
      {(Array.isArray(notes) ? notes : []).map((note) => (
        <Marker
          key={note.id}
          position={[note.latitude, note.longitude]}
          icon={new L.Icon({
            iconUrl: '/marker-icon.png', // Custom marker icon URL
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
        >
          <Popup>{note.content}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
