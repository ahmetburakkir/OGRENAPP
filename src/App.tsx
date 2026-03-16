import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import UniversiteDashboard from './pages/dashboards/UniversiteDashboard';
import LiseDashboard from './pages/dashboards/LiseDashboard';
import KarakterTesti from './pages/dashboards/KarakterTesti';
import Auth from './pages/Auth';
import OrtaokulDashboard from './pages/dashboards/OrtaokulDashboard';
import ProgressDashboard from './pages/dashboards/ProgressDashboard';
import Settings from './pages/Settings';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

            {/* Protected Routes */}
            <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
            <Route path="/dashboard/universite" element={<ProtectedRoute><UniversiteDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/lise" element={<ProtectedRoute><LiseDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/lise/karakter-testi" element={<ProtectedRoute><KarakterTesti /></ProtectedRoute>} />
            <Route path="/dashboard/ortaokul" element={<ProtectedRoute><OrtaokulDashboard /></ProtectedRoute>} />
            
            <Route path="/progress" element={<ProtectedRoute><ProgressDashboard /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </GlobalLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
