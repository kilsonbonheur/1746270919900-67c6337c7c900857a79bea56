import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VisaTypesPage from './pages/VisaTypesPage';
import ApplicationPage from './pages/ApplicationPage';
import RequirementsPage from './pages/RequirementsPage';
import ContactPage from './pages/ContactPage';
import TrackApplicationPage from './pages/TrackApplicationPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="visa-types" element={<VisaTypesPage />} />
          <Route path="apply" element={<ApplicationPage />} />
          <Route path="requirements" element={<RequirementsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="track" element={<TrackApplicationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
