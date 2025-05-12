import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Correctly imported image URLs (Webpack/Vite compatible)
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const MapComponent = ({ userLocation, setNotes }) => {
  const [nearbyNotes, setNearbyNotes] = useState([]);

  useEffect(() => {
    if (!userLocation) return;

    const [latitude, longitude] = userLocation;

    const fetchNearbyNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes/nearby', {
          params: { latitude, longitude, radius: 1000 },
        });
        const data = response.data || [];
        setNearbyNotes(data);
        if (setNotes) setNotes(data);
      } catch (error) {
        console.error('Error fetching nearby notes:', error);
      }
    };

    fetchNearbyNotes();
  }, [userLocation, setNotes]);

  if (!userLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={userLocation} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* User marker */}
      <Marker position={userLocation}>
        <Popup>
          You are here
          {nearbyNotes.length === 0 && (
            <>
              <br />
              <em>No nearby notes found within 1km radius.</em>
            </>
          )}
        </Popup>
      </Marker>

      {/* Notes markers */}
      {Array.isArray(nearbyNotes) &&
        nearbyNotes.map((note) => (
          <Marker key={note.id} position={[note.latitude, note.longitude]}>
            <Popup>
              <strong>{note.title}</strong>
              <br />
              {note.content}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
