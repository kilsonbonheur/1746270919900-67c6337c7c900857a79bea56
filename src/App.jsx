import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VisaTypesPage from './pages/VisaTypesPage';
import ApplicationPage from './pages/ApplicationPage';
import RequirementsPage from './pages/RequirementsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="visa-types" element={<VisaTypesPage />} />
        <Route path="apply" element={<ApplicationPage />} />
        <Route path="requirements" element={<RequirementsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
