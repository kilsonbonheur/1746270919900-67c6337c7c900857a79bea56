import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

function RefundPolicy() {
  return (
    <section id="home_refund-policy" className="section bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2 text-gray-900 mb-4">Refund Policy</h2>
            <p className="text-lg font-extralight text-gray-600">
              Please review our refund policy before submitting your
              application.
            </p>
          </div>

          <div className="bg-white rounded-md shadow-soft p-8">
            <div className="flex items-start mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Refund on Visa Rejection
                </h3>
                <p className="text-lg font-extralight text-gray-600">
                  If your visa application is rejected by the UAE immigration
                  authorities, no refund will be issued. The processing fee
                  covers the administrative work and submission of your
                  application regardless of the outcome.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <ShieldCheck className="h-8 w-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Our Commitment
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-lg font-extralight text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">-</span>
                      We thoroughly review all applications before submission to
                      maximize approval chances
                    </li>
                    <li className="text-lg font-extralight text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">-</span>
                      Our team provides guidance on documentation to reduce
                      rejection risk
                    </li>
                    <li className="text-lg font-extralight text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">-</span>
                      You will be informed of any potential issues before we
                      proceed
                    </li>
                    <li className="text-lg font-extralight text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">-</span>
                      Payment is required before application processing begins
                    </li>
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
