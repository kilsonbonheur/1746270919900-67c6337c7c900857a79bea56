import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertCircle, Check, X } from 'lucide-react';

function RequirementsPage() {
  const generalRequirements = [
    "Valid passport with at least 6 months validity from the intended date of entry",
    "Colored passport-size photograph with white background (taken within the last 6 months)",
    "Completed visa application form",
    "Confirmed return flight ticket",
    "Hotel booking confirmation or proof of accommodation",
    "Travel insurance covering the duration of stay (recommended)",
  ];

  const additionalRequirements = [
    {
      title: "Financial Requirements",
      items: [
        "Bank statements for the last 3-6 months (depending on visa type)",
        "Minimum balance requirement varies based on nationality and visa type",
        "Credit card copy (if available)",
      ],
    },
    {
      title: "Employment Requirements",
      items: [
        "Employment letter stating position, salary, and duration of employment",
        "No Objection Certificate (NOC) from employer",
        "Business card (if applicable)",
      ],
    },
    {
      title: "For Students",
      items: [
        "Student ID or enrollment letter from educational institution",
        "No Objection Certificate from school/university",
        "Sponsorship letter from parents/guardians (if applicable)",
      ],
    },
  ];

  const eligibilityByNationality = [
    {
      region: "Visa on Arrival Countries",
      description: "Citizens of these countries can get visa on arrival and don't need to apply in advance:",
      countries: ["United States", "United Kingdom", "European Union", "Australia", "New Zealand", "Japan", "Singapore", "Malaysia", "South Korea"],
      eligible: true,
    },
    {
      region: "GCC Residents",
      description: "Residents of GCC countries with specific professions can apply for visa on arrival:",
      countries: ["Saudi Arabia", "Kuwait", "Bahrain", "Oman", "Qatar"],
      eligible: true,
    },
    {
      region: "Pre-Approval Required",
      description: "Citizens of these countries need pre-approval before traveling to Dubai:",
      countries: ["India", "Pakistan", "Philippines", "Bangladesh", "Sri Lanka", "Nigeria", "Kenya", "Egypt"],
      eligible: true,
      note: "Our service specializes in processing visas for these nationalities.",
    },
    {
      region: "Restricted Countries",
      description: "Citizens of these countries face additional scrutiny and requirements:",
      countries: ["Afghanistan", "Iraq", "Syria", "Yemen", "Somalia"],
      eligible: false,
      note: "Special approval process required. Please contact us for details.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-primary-700 py-16">
        <div className="container-custom">
          <h1 className="heading-1 text-white mb-4">Visa Requirements</h1>
          <p className="text-lg text-primary-100 max-w-3xl">
            Learn about the documents and eligibility requirements for Dubai visit visas. Requirements may vary based on your nationality and visa type.
          </p>
        </div>
      </div>
      
      {/* General Requirements */}
      <div className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-gray-900 mb-8">General Requirements</h2>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <ul className="space-y-4">
                {generalRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <FileText className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <h2 className="heading-2 text-gray-900 mb-8">Additional Requirements</h2>
            
            <div className="space-y-8 mb-12">
              {additionalRequirements.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Important Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Note</h3>
                  <p className="text-gray-600">
                    Requirements may vary based on your nationality, visa type, and current regulations. 
                    Our team will guide you through the specific requirements for your case after you submit your application.
                    All documents must be in English or Arabic, or accompanied by certified translations.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="heading-2 text-gray-900 mb-8">Eligibility by Nationality</h2>
            
            <div className="space-y-8 mb-12">
              {eligibilityByNationality.map((region, index) => (
                <div key={index} className={`rounded-xl p-6 ${region.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{region.region}</h3>
                    {region.eligible ? (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Eligible</span>
                    ) : (
                      <span className="ml-3 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Restricted</span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4">{region.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {region.countries.map((country, countryIndex) => (
                      <span key={countryIndex} className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200">
                        {country}
                      </span>
                    ))}
                  </div>
                  
                  {region.note && (
                    <p className="text-sm italic text-gray-600">{region.note}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/apply" className="btn-primary">
                Apply for Visa Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequirementsPage;
