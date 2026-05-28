import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

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
              {t(language, "nav.home")}
            </NavLink>
            <NavLink to="/visa-types" className={navLinkClasses}>
              {t(language, "nav.visaTypes")}
            </NavLink>
            <NavLink to="/requirements" className={navLinkClasses}>
              {t(language, "nav.requirements")}
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              {t(language, "nav.contactUs")}
            </NavLink>
            <NavLink to="/track" className={navLinkClasses}>
              {t(language, "nav.trackApplication")}
            </NavLink>
            <Link to="/apply" className="ml-2 btn-primary">
              {t(language, "nav.applyNow")}
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
            <NavLink to="/" end className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
              {t(language, "nav.home")}
            </NavLink>
            <NavLink to="/visa-types" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
              {t(language, "nav.visaTypes")}
            </NavLink>
            <NavLink to="/requirements" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
              {t(language, "nav.requirements")}
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
              {t(language, "nav.contactUs")}
            </NavLink>
            <NavLink to="/track" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
              {t(language, "nav.trackApplication")}
            </NavLink>
            <div className="pt-2">
              <Link to="/apply" className="btn-primary text-center block" onClick={() => setIsMenuOpen(false)}>
                {t(language, "nav.applyNow")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
