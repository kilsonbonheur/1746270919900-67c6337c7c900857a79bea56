import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "How long does it take to process a Dubai visit visa?",
      answer: "Our standard processing time is 24-72 hours for most visa types. However, processing times may vary depending on the type of visa and current demand. We'll keep you updated on the status of your application throughout the process."
    },
    {
      id: 2,
      question: "What documents do I need to apply for a Dubai visit visa?",
      answer: "The basic requirements include a valid passport with at least 6 months validity, passport-sized photographs with white background, flight itinerary, hotel booking confirmation, and bank statements for the last 3 months. Additional documents may be required based on your nationality and visa type."
    },
    {
      id: 3,
      question: "Can I extend my Dubai visit visa?",
      answer: "Yes, most Dubai visit visas can be extended. The 30-day and 60-day tourist visas can be extended for an additional 30 days by applying before the visa expires. Extension fees apply, and we can assist you with the extension process."
    },
    {
      id: 4,
      question: "What is the difference between a 30-day and 60-day visa?",
      answer: "The main difference is the duration of stay allowed in the UAE. A 30-day visa allows you to stay in Dubai for up to 30 calendar days from your date of entry, while a 60-day visa allows for a 60-day stay. The 60-day visa is slightly more expensive but offers better value for longer stays."
    },
    {
      id: 5,
      question: "Do you offer visa services for all nationalities?",
      answer: "We offer visa services for most nationalities. However, eligibility criteria and documentation requirements may vary based on your country of residence. Some nationalities may have restrictions or additional requirements. Please contact us to check your eligibility."
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway. We do not store your payment information."
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our Dubai visa services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`border-b border-gray-200 ${index === 0 ? 'border-t' : ''}`}
            >
              <button
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="pb-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
