import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../translations";

function RefundPolicy() {
  const { language } = useLanguage();

  return (
    <section id="home_refund-policy" className="section bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2 text-gray-900 mb-4">{t(language, "refundPolicy.title")}</h2>
            <p className="text-lg font-extralight text-gray-600">
              {t(language, "refundPolicy.subtitle")}
            </p>
          </div>

          <div className="bg-white rounded-md shadow-soft p-8">
            <div className="flex items-start mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t(language, "refundPolicy.noRefundTitle")}
                </h3>
                <p className="text-lg font-extralight text-gray-600">
                  {t(language, "refundPolicy.noRefundText")}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <ShieldCheck className="h-8 w-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t(language, "refundPolicy.commitmentTitle")}
                  </h3>
                  <ul className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i} className="text-lg font-extralight text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">-</span>
                        {t(language, `refundPolicy.commitment${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RefundPolicy;
