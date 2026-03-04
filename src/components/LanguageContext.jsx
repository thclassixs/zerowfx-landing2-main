import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Function to detect browser language
const detectBrowserLanguage = () => {
  // Get browser language
  const browserLang = navigator.language || navigator.userLanguage;

  // Extract the primary language code (e.g., 'en' from 'en-US')
  const langCode = browserLang.split('-')[0].toLowerCase();

  // Map to our supported languages
  if (langCode === 'ar') {
    return 'ar';
  } else if (langCode === 'fr') {
    return 'fr';
  } else {
    // Default to English for all other languages
    return 'en';
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // First, check if there's a saved language preference
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {
      return savedLanguage;
    }

    // If no saved preference, detect browser language
    return detectBrowserLanguage();
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);

    // Set dir attribute for RTL languages
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const cycleLanguage = () => {
    const languages = ['en', 'ar', 'fr'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, cycleLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};