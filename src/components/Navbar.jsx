import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClasses = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'text-primary-700 bg-primary-50' 
        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">Kilson</span>
            <span className="text-xl font-medium text-gray-700">Visa Services</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/visa-types" className={navLinkClasses}>
              Visa Types
            </NavLink>
            <NavLink to="/requirements" className={navLinkClasses}>
              Requirements
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contact Us
            </NavLink>
            <NavLink to="/track" className={navLinkClasses}>
              Track Application
            </NavLink>
            <Link to="/apply" className="ml-4 btn-primary">
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="container-custom space-y-1">
            <NavLink
              to="/"
              end
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/visa-types"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Visa Types
            </NavLink>
            <NavLink
              to="/requirements"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Requirements
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/track"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Track Application
            </NavLink>
            <div className="pt-2">
              <Link
                to="/apply"
                className="block w-full btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
