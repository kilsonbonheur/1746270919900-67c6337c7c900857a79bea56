import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Globe } from "lucide-react";

function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-primary-600 hover:bg-gray-50 border border-gray-200"
      aria-label={language === "en" ? "Switch to French" : "Passer en anglais"}
    >
      <Globe className="h-4 w-4" />
      <span>{language === "en" ? "FR" : "EN"}</span>
    </button>
  );
}

export default LanguageSwitcher;
