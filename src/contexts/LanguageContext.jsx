import React, { createContext, useContext } from "react";

const LanguageContext = createContext({ language: "en" });

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context || { language: "en" };
}

export function LanguageProvider({ children }) {
  const language = "en";

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
}
