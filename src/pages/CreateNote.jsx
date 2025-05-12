import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return null;
}

export default function CreateNote() {
  const [note, setNote] = useState({
    title: '',
    description: '',
    tags: '',
    location: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (latlng) => {
    setNote((prev) => ({ ...prev, location: latlng }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    if (!note.location) {
      setError('Please select a location on the map.');
      setLoading(false);
      return;
    }

    const payload = {
      title: note.title,
      description: note.description,
      tags: note.tags.split(',').map(tag => tag.trim()),
      lat: note.location.lat,
      lng: note.location.lng,
    };

    try {
      await axios.post('/api/notes', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to save note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a Geotagged Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={note.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={note.tags}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <div>
          <p className="font-medium mb-2">Select location on the map:</p>
          <MapContainer center={[20, 78]} zoom={4} style={{ height: '300px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationPicker onSelect={handleLocationSelect} />
            {note.location && <Marker position={note.location} />}
          </MapContainer>
          {note.location && (
            <p className="mt-2 text-sm text-gray-700">
              Selected Location: {note.location.lat.toFixed(4)}, {note.location.lng.toFixed(4)}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Note'}
        </button>
      </form>
    </div>
  );
}
