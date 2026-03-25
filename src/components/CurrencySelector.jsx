import React from "react";

function CurrencySelector({ currency, setCurrency }) {
  return (
    <div id="apply_currency-selector" className="flex items-center gap-2">
      <span className="text-lg font-extralight text-gray-600">Currency:</span>
      <div className="flex rounded-md overflow-hidden border border-gray-300">
        <button
          type="button"
          onClick={() => setCurrency("USD")}
          className={`px-4 py-2 text-lg font-medium transition-colors ${
            currency === "USD"
              ? "bg-primary-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          USD ($)
        </button>
        <button
          type="button"
          onClick={() => setCurrency("AED")}
          className={`px-4 py-2 text-lg font-medium transition-colors ${
            currency === "AED"
              ? "bg-primary-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          AED
        </button>
      </div>
    </div>
  );
}

export default CurrencySelector;
