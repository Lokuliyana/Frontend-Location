import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './pages/DashboardPage';
import { ProtectedRoute } from './hooks/useAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
