import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-1 mb-6">
              {t(language, "hero.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-50">
              {t(language, "hero.subtitle")}
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-gold-300" />
                <span>{t(language, "hero.feature1")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-gold-300" />
                <span>{t(language, "hero.feature2")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-gold-300" />
                <span>{t(language, "hero.feature3")}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/apply" className="btn-gold">
                {t(language, "hero.applyBtn")}
              </Link>
              <Link to="/visa-types" className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30">
                {t(language, "hero.exploreBtn")}
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-medium overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Dubai Skyline" 
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t(language, "hero.cardTitle")}
                </h3>
                <p className="text-gray-600">
                  {t(language, "hero.cardText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
