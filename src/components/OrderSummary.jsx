import React from "react";
import { ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";
import { getPrice, formatPrice } from "../utils/pricing";
import { supabase } from "../lib/supabase";

function OrderSummary({ visaType, currency, onProceedToPayment, isLoading, customerEmail, customerName }) {
  const price = getPrice(visaType, currency);

  if (!visaType) return null;

  const handleStripeCheckout = async () => {
    onProceedToPayment('loading');
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: price,
          currency: currency,
          visa_type: visaType,
          customer_email: customerEmail || '',
          customer_name: customerName || '',
          success_url: `${window.location.origin}/apply?payment=success`,
          cancel_url: `${window.location.origin}/apply?payment=cancelled`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Stripe checkout error:', err);
      // Fallback to simulated payment if Stripe isn't configured
      onProceedToPayment('fallback');
    }
  };

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
        onClick={handleStripeCheckout}
        disabled={isLoading}
        className="w-full btn-gold text-lg"
      >
        <ShieldCheck className="h-5 w-5 mr-2" />
        {isLoading ? "Redirecting to Stripe..." : `Pay ${formatPrice(price, currency)}`}
      </button>

      <div className="flex items-center justify-center mt-3 space-x-1">
        <ShieldCheck className="h-4 w-4 text-gray-400" />
        <p className="text-sm font-extralight text-gray-500">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;
