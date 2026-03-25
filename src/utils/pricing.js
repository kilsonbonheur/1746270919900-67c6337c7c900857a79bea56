const VISA_PRICES = {
  "30 Days Tourist Visa": { usd: 125, aed: 459 },
  "60 Days Tourist Visa": { usd: 250, aed: 918 },
  "60 Days Multiple Entry": { usd: 350, aed: 1285 },
  "Transit Visa": { usd: 90, aed: 330 },
};

export function getPrice(visaType, currency) {
  const prices = VISA_PRICES[visaType];
  if (!prices) return 0;
  return currency === "AED" ? prices.aed : prices.usd;
}

export function formatPrice(amount, currency) {
  if (currency === "AED") {
    return `AED ${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()} USD`;
}

export function getCurrencySymbol(currency) {
  return currency === "AED" ? "AED" : "$";
}

export { VISA_PRICES };
