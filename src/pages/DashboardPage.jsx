import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent'; // Adjust the path if needed

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const dummyData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        username: 'janedoe',
      };

      setUserInfo(dummyData);
      setLoading(false);
    }, 1000);

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error('Error getting location: ', error)
    );
  }, []);

  const handleCreateNote = () => {
    navigate('/create-note');
  };

  const handleViewNote = () => {
    navigate('/view-notes');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-1000 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome, {userInfo.name} 👋</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What would you like to do?</h2>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-6">

            <button
              onClick={handleCreateNote}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 shadow"
            >
              ➕ Add a New Geotagged Note
            </button>

            <button
              onClick={handleViewNote}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 shadow"
            >
              ⚡ View Geotagged Note
            </button>
          </div>

          {/* Use the MapComponent */}
          {userLocation && (
            <MapComponent userLocation={userLocation} setNotes={setNotes} />
          )}
        </div>
      </div>
    </div>
  );
}
