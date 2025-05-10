import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (based on token or session)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data and token on logout
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page
  };

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
