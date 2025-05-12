import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await axios.get('http://localhost:5000/api/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsLoggedIn(true);
      } catch (err) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to GeoTagger</h1>

      {isLoggedIn ? (
        <>
          <p>You are logged in.</p>
          <div>
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <div>
          <p>Please log in to access your dashboard.</p>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
    </div>
  );
}
