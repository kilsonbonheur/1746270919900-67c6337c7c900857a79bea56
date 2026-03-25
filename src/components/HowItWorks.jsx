import React from "react";
import { FileText, CreditCard, CheckCircle, Clock } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Complete Application",
      description:
        "Fill out our simple online application form with your personal details and travel information.",
      color: "bg-primary-600",
    },
    {
      id: 2,
      icon: <CreditCard className="h-10 w-10 text-white" />,
      title: "Pay First",
      description:
        "Select USD or AED and pay securely via Stripe before we begin processing your visa.",
      color: "bg-secondary-600",
    },
    {
      id: 3,
      icon: <Clock className="h-10 w-10 text-white" />,
      title: "Processing",
      description:
        "Our team processes your application and submits it to the immigration authorities. Track via email and WhatsApp.",
      color: "bg-gold-500",
    },
    {
      id: 4,
      icon: <CheckCircle className="h-10 w-10 text-white" />,
      title: "Receive Visa",
      description:
        "Get your approved visa delivered to your email within 24-72 hours.",
      color: "bg-green-600",
    },
  ];

  return (
    <section id="home_how-it-works" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg font-extralight text-gray-600">
            Getting your Dubai visit visa is simple and straightforward with our
            easy 4-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg`}
              >
                {step.icon}
              </div>
              <div className="relative mb-6 w-full hidden lg:block">
                {step.id < steps.length && (
                  <div className="absolute top-[-30px] left-[60%] w-full h-0.5 bg-gray-200"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-lg font-extralight text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
