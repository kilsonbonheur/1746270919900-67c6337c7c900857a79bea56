import React from "react";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { getPrice, formatPrice } from "../utils/pricing";

function OrderSummary({ visaType, currency, onProceedToPayment, isLoading }) {
  const price = getPrice(visaType, currency);

  if (!visaType) return null;

  return (
    <div id="apply_order-summary" className="bg-white rounded-md shadow-soft p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-extralight text-gray-600">
            Visa Type
          </span>
          <span className="text-lg font-medium text-gray-800">{visaType}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(price, currency)}
          </span>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-lg font-extralight text-gray-700">
            No refund if visa is rejected. Payment is required before processing
            begins.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onProceedToPayment}
        disabled={isLoading}
        className="w-full btn-gold text-lg"
      >
        <ShieldCheck className="h-5 w-5 mr-2" />
        {isLoading ? "Processing..." : `Pay ${formatPrice(price, currency)}`}
      </button>

      <p className="text-lg font-extralight text-gray-500 text-center mt-3">
        Secure payment powered by Stripe
      </p>
    </div>
  );
}

export default OrderSummary;
