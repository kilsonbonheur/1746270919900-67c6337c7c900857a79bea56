import React from "react";
import { ShieldCheck, AlertTriangle, FileText, Scale } from "lucide-react";

function TermsPage() {
  return (
    <div>
      <div className="bg-primary-700 py-16">
        <div className="container-custom">
          <h1 className="heading-1 text-white mb-4">Terms & Conditions</h1>
          <p className="text-lg font-extralight text-primary-100 max-w-3xl">
            Please read these terms and conditions carefully before using our
            visa application services.
          </p>
        </div>
      </div>

      <div className="section bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8">
            {/* General Terms */}
            <div className="card">
              <div className="flex items-start mb-4">
                <Scale className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <h2 className="text-xl font-bold text-gray-800">
                  1. General Terms
                </h2>
              </div>
              <div className="ml-9 space-y-3 text-gray-600">
                <p>
                  By using Kilson Visa Services, you agree to these terms and
                  conditions. Our services include visa application processing
                  for Dubai/UAE visit visas.
                </p>
                <p>
                  Kilson Visa Services acts as an intermediary between the
                  applicant and the UAE immigration authorities. We do not
                  guarantee visa approval as the final decision rests with the
                  immigration authorities.
                </p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="card">
              <div className="flex items-start mb-4">
                <FileText className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <h2 className="text-xl font-bold text-gray-800">
                  2. Payment Terms
                </h2>
              </div>
              <div className="ml-9 space-y-3 text-gray-600">
                <p>
                  All payments must be made in full before we begin processing
                  your visa application. We accept payments in USD and AED via
                  secure Stripe payment processing.
                </p>
                <p>
                  The processing fee covers administrative work, document
                  verification, and submission of your application to the
                  relevant authorities.
                </p>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="card border-l-4 border-yellow-500">
              <div className="flex items-start mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                <h2 className="text-xl font-bold text-gray-800">
                  3. Refund Policy
                </h2>
              </div>
              <div className="ml-9 space-y-3 text-gray-600">
                <p className="font-semibold text-gray-800">
                  No refunds will be issued if your visa application is rejected
                  by the UAE immigration authorities.
                </p>
                <p>
                  The processing fee is non-refundable once your application has
                  been submitted for processing. This includes cases where:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The visa application is rejected by immigration</li>
                  <li>
                    The applicant provides incorrect or fraudulent information
                  </li>
                  <li>
                    The applicant cancels after processing has begun
                  </li>
                  <li>
                    The applicant fails to provide required documents in time
                  </li>
                </ul>
                <p>
                  Refunds may be considered only if Kilson Visa Services
                  is unable to process your application due to our own error,
                  subject to review on a case-by-case basis.
                </p>
              </div>
            </div>

            {/* Document Requirements */}
            <div className="card">
              <div className="flex items-start mb-4">
                <FileText className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <h2 className="text-xl font-bold text-gray-800">
                  4. Document Requirements
                </h2>
              </div>
              <div className="ml-9 space-y-3 text-gray-600">
                <p>
                  Applicants must provide accurate and valid documents including
                  a passport copy, recent photograph, and any additional
                  documents requested.
                </p>
                <p>
                  All documents must be clear, legible, and in the accepted
                  formats (PDF, JPG, PNG). Kilson Visa Services is not
                  responsible for delays caused by unclear or incomplete
                  documentation.
                </p>
              </div>
            </div>

            {/* Processing Time */}
            <div className="card">
              <div className="flex items-start mb-4">
                <ShieldCheck className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <h2 className="text-xl font-bold text-gray-800">
                  5. Processing Time & Privacy
                </h2>
              </div>
              <div className="ml-9 space-y-3 text-gray-600">
                <p>
                  Standard processing time is 24-72 working hours from the time
                  of application submission and payment confirmation. Processing
                  times may vary during peak periods.
                </p>
                <p>
                  Your personal information and documents are handled with strict
                  confidentiality and are only shared with the UAE immigration
                  authorities for the purpose of processing your visa.
                </p>
                <p>
                  We use secure encryption and storage to protect your data. Your
                  documents are stored securely and deleted after your visa has
                  been processed.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="card bg-primary-50 border border-primary-200">
              <p className="text-gray-700">
                If you have any questions about these terms and conditions,
                please contact us at{" "}
                <a
                  href="mailto:info@visainuae.com"
                  className="text-primary-600 hover:underline font-medium"
                >
                  info@visainuae.com
                </a>{" "}
                or via WhatsApp at{" "}
                <a
                  href="https://wa.me/971557968372"
                  className="text-green-600 hover:underline font-medium"
                >
                  +971 55 796 8372
                </a>
                .
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
