import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form);
    if (success) navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-12 space-y-4">
      <input name="username" onChange={handleChange} className="w-full border rounded p-2" placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} className="w-full border rounded p-2" placeholder="Password" />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
  );
}
