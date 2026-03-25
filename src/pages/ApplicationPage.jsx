import React from "react";
import ApplicationForm from "../components/ApplicationForm";
import { ShieldCheck, AlertTriangle, CreditCard } from "lucide-react";

function ApplicationPage() {
  return (
    <div id="apply_page">
      <div className="bg-primary-700 py-16">
        <div className="container-custom">
          <h1 className="heading-1 text-white mb-4">Apply for Dubai Visa</h1>
          <p className="text-lg font-extralight text-primary-100 max-w-3xl">
            Complete the application form below, make your payment, and upload
            your documents. Our team will process your visa and keep you updated
            via email and WhatsApp.
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center text-lg font-extralight text-gray-600">
              <CreditCard className="h-5 w-5 mr-2 text-primary-600" />
              Pay in USD or AED
            </div>
            <div className="flex items-center text-lg font-extralight text-gray-600">
              <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
              Secure Stripe payment
            </div>
            <div className="flex items-center text-lg font-extralight text-gray-600">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              No refund on rejection
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-gray-50">
        <div className="container-custom max-w-4xl">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
