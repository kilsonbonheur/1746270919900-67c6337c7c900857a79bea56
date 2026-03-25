import React from 'react';
import { Link } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';
import CTA from '../components/CTA';

function VisaTypesPage() {
  const visaTypes = [
    {
      id: 1,
      title: "30 Days Tourist Visa",
      price: 125,
      description: "Perfect for short vacations or business trips to Dubai. This single-entry visa allows you to stay in the UAE for up to 30 days from your date of entry.",
      features: [
        "Valid for 30 days from entry",
        "Single entry only",
        "Processing time: 24-72 hours",
        "Extendable for additional 30 days",
        "Suitable for tourism, family visits, or short business trips",
      ],
      requirements: [
        "Valid passport with at least 6 months validity",
        "Colored passport-size photograph with white background",
        "Return flight ticket",
        "Hotel booking confirmation (if applicable)",
      ],
      image: "https://content-studio.biela.dev/cover/857x1536/i/content-studio/67c6337c7c900857a79bea56/1746270919900-67c6337c7c900857a79bea56/1774362307273-b26226de.png/ai-generated-dubai-visit-visa-document-857x1536.webp",
    },
    {
      id: 2,
      title: "60 Days Tourist Visa",
      price: 250,
      description: "Ideal for extended stays in Dubai. This single-entry visa allows you to stay in the UAE for up to 60 days from your date of entry.",
      features: [
        "Valid for 60 days from entry",
        "Single entry only",
        "Processing time: 24-72 hours",
        "Extendable for additional 30 days",
        "Perfect for longer vacations or business requirements",
      ],
      requirements: [
        "Valid passport with at least 6 months validity",
        "Colored passport-size photograph with white background",
        "Return flight ticket",
        "Hotel booking confirmation (if applicable)",
        "Bank statements for the last 3 months",
      ],
      image: "https://content-studio.biela.dev/cover/1536x1023/i/content-studio/67c6337c7c900857a79bea56/1746270919900-67c6337c7c900857a79bea56/1774397568276-5bdc0c04.avif/passport-leather-suitcase-geographical-map_181624-14322-1536x1023.webp",
    },
    {
      id: 3,
      title: "60 Days Multiple Entry Visa",
      price: 350,
      description: "The most flexible option for frequent travelers to Dubai. This multiple-entry visa allows you to enter and exit the UAE multiple times over a 60-day period.",
      features: [
        "Valid for 60 days from first entry",
        "Multiple entries allowed",
        "Processing time: 24-72 hours",
        "120 days validity period",
        "Ideal for business travelers or those visiting multiple countries in the region",
      ],
      requirements: [
        "Valid passport with at least 6 months validity",
        "Colored passport-size photograph with white background",
        "Return flight ticket",
        "Hotel booking confirmation (if applicable)",
        "Bank statements for the last 6 months",
        "Proof of previous travel to UAE (if available)",
      ],
      image: "https://content-studio.biela.dev/cover/1536x1152/i/images-library/67b871a3b0fab4774a108359/1774379085405-67b871a3b0fab4774a108359/originals/1774382918922.png/aerial-view-of-palm-jumeirah-island-at-golden-sunset-with-warm-amber-sky-and-luxury-villas-lining-the-fronds-1536x1152.webp",
    },
    {
      id: 4,
      title: "Transit Visa",
      price: 90,
      description: "For travelers passing through Dubai. This visa allows you to stay in the UAE for up to 96 hours during your transit.",
      features: [
        "Valid for 96 hours from entry",
        "Single entry only",
        "Processing time: 24 hours",
        "Non-extendable",
        "Perfect for short layovers or connecting flights",
      ],
      requirements: [
        "Valid passport with at least 3 months validity",
        "Colored passport-size photograph with white background",
        "Confirmed onward flight ticket",
        "Hotel booking confirmation (if applicable)",
      ],
      image: "https://content-studio.biela.dev/cover/1536x1026/i/content-studio/67c6337c7c900857a79bea56/1746270919900-67c6337c7c900857a79bea56/1774397568275-8ea781f5.webp/67cd72_c172df4fe21c4c93b75f448ea7f331f6mv2-1536x1026.webp",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-primary-700 py-16">
        <div className="container-custom">
          <h1 className="heading-1 text-white mb-4">Dubai Visa Types</h1>
          <p className="text-lg text-primary-100 max-w-3xl">
            Choose the right visa for your Dubai visit. We offer a variety of visa options to suit your travel needs and duration of stay.
          </p>
        </div>
      </div>
      
      {/* Visa Types */}
      <div className="section">
        <div className="container-custom">
          <div className="space-y-16">
            {visaTypes.map((visa) => (
              <div key={visa.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <img 
                      src={visa.image} 
                      alt={visa.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="lg:col-span-2 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{visa.title}</h2>
                      <div className="mt-2 md:mt-0">
                        <span className="text-2xl font-bold text-primary-600">${visa.price}</span>
                        <span className="text-gray-500 ml-1">USD</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{visa.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
                        <ul className="space-y-2">
                          {visa.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
                        <ul className="space-y-2">
                          {visa.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Link to="/apply" className="btn-primary">
                        Apply Now
                      </Link>
                      <Link to="/requirements" className="btn-secondary">
                        View Full Requirements
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Note */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Note</h3>
                <p className="text-gray-600">
                  Visa requirements and processing times may vary based on your nationality and current regulations. 
                  Our team will guide you through the specific requirements for your case. 
                  All prices are subject to change based on current exchange rates and government fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <CTA />
    </div>
  );
}

export default VisaTypesPage;
