import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({ language: "en" });

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context || { language: "en", toggleLanguage: () => {} };
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("preferred_language");
    return saved === "fr" ? "fr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("preferred_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}