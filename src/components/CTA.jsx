import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function CTA() {
  const { language } = useLanguage();

  return (
    <section className="bg-primary-700 py-16">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t(language, "cta.title")}
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            {t(language, "cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/apply" className="btn-gold">
              {t(language, "cta.applyBtn")}
            </Link>
            <Link to="/contact" className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30">
              {t(language, "cta.contactBtn")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
