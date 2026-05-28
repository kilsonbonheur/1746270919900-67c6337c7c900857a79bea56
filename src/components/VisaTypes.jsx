import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, Users, Check } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import { formatPrice } from "../utils/pricing";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../translations";

function VisaTypes() {
  const [currency, setCurrency] = useState("USD");
  const { language } = useLanguage();

  const visaOptions = [
    {
      id: 1,
      title: "30 Days Tourist Visa",
      priceUsd: 125,
      priceAed: 459,
      icon: <Clock className="h-8 w-8 text-primary-500" />,
      features: [
        "Valid for 30 days from entry",
        "Single entry only",
        "Processing time: 24-72 hours",
        "Extendable for additional 30 days",
      ],
      popular: false,
    },
    {
      id: 2,
      title: "60 Days Tourist Visa",
      priceUsd: 250,
      priceAed: 918,
      icon: <Calendar className="h-8 w-8 text-primary-500" />,
      features: [
        "Valid for 60 days from entry",
        "Single entry only",
        "Processing time: 24-72 hours",
        "Extendable for additional 30 days",
      ],
      popular: true,
    },
    {
      id: 3,
      title: "60 Days Multiple Entry",
      priceUsd: 350,
      priceAed: 1285,
      icon: <Users className="h-8 w-8 text-primary-500" />,
      features: [
        "Valid for 60 days from entry",
        "Multiple entries allowed",
        "Processing time: 24-72 hours",
        "120 days validity period",
      ],
      popular: false,
    },
  ];

  return (
    <section id="home_visa-types" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="heading-2 text-gray-900 mb-4">
            {t(language, "visaTypes.title")}
          </h2>
          <p className="text-lg font-extralight text-gray-600 mb-6">
            {t(language, "visaTypes.subtitle")}
          </p>
          <div className="flex justify-center">
            <CurrencySelector currency={currency} setCurrency={setCurrency} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visaOptions.map((visa) => {
            const price = currency === "AED" ? visa.priceAed : visa.priceUsd;
            return (
              <div
                key={visa.id}
                className={`card relative ${
                  visa.popular
                    ? "border-2 border-primary-500 transform hover:-translate-y-2"
                    : "transform hover:-translate-y-1"
                } transition-all duration-300`}
              >
                {visa.popular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-lg font-medium rounded-bl-md">
                    {t(language, "visaTypes.mostPopular")}
                  </div>
                )}

                <div className="flex flex-col h-full">
                  <div className="mb-6">{visa.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {visa.title}
                  </h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary-600">
                      {formatPrice(price, currency)}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {visa.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-lg font-extralight text-gray-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      to="/apply"
                      className={`w-full text-center ${
                        visa.popular ? "btn-primary" : "btn-secondary"
                      }`}
                    >
                      {t(language, "visaTypes.applyNow")}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default VisaTypes;
