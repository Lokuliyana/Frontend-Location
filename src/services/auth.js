import axios from './axios';

export async function login(credentials) {
  try {
    const res = await axios.post('/auth/login', credentials);
    localStorage.setItem('token', res.data.token);
    return true;
  } catch (err) {
    alert('Login failed');
    return false;
  }
}

export function logout() {
  localStorage.removeItem('token');
}
