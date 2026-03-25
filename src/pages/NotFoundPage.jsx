import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="section bg-gray-50">
      <div className="container-custom text-center py-16 md:py-24">
        <h1 className="heading-1 text-gray-900 mb-6">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
