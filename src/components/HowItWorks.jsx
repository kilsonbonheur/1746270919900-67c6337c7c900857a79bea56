import React from "react";
import { FileText, CreditCard, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../translations";

function HowItWorks() {
  const { language } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: <FileText className="h-10 w-10 text-white" />,
      title: t(language, "howItWorks.step1Title"),
      description: t(language, "howItWorks.step1Desc"),
      color: "bg-primary-600",
    },
    {
      id: 2,
      icon: <CreditCard className="h-10 w-10 text-white" />,
      title: t(language, "howItWorks.step2Title"),
      description: t(language, "howItWorks.step2Desc"),
      color: "bg-secondary-600",
    },
    {
      id: 3,
      icon: <Clock className="h-10 w-10 text-white" />,
      title: t(language, "howItWorks.step3Title"),
      description: t(language, "howItWorks.step3Desc"),
      color: "bg-gold-500",
    },
    {
      id: 4,
      icon: <CheckCircle className="h-10 w-10 text-white" />,
      title: t(language, "howItWorks.step4Title"),
      description: t(language, "howItWorks.step4Desc"),
      color: "bg-green-600",
    },
  ];

  return (
    <section id="home_how-it-works" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">{t(language, "howItWorks.title")}</h2>
          <p className="text-lg font-extralight text-gray-600">
            {t(language, "howItWorks.subtitle")}
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
