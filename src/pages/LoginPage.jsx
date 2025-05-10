import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Just skip authentication logic for now
    try {
      // Skip calling backend for authentication, just navigate to the dashboard
      if (username && password) {
        navigate('/dashboard'); // Navigate directly to the dashboard
      } else {
        setError('Please fill out both username and password.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-500">Register here</a></p>
        </div>
      </div>
    </div>
  );
}