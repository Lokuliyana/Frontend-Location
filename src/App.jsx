import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateNote from './pages/CreateNote'; 
import ViewNotes from './pages/ViewNotes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/view-notes" element={<ViewNotes />} />
      </Routes>
    </Router>
  );
}