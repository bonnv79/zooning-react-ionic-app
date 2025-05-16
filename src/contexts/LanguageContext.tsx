import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Import translations
import en from '../translations/en.json';
import vi from '../translations/vi.json';

// Define available languages
export type Language = 'en' | 'vi';
export type Translations = Record<string, string>;

// Define the context type
interface LanguageContextType {
  language: Language;
  translations: Translations;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  translations: {},
  changeLanguage: () => {},
  t: () => '',
});

// Language resources
const resources: Record<Language, Translations> = {
  en,
  vi,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get language from localStorage, default to 'en'
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && ['en', 'vi'].includes(savedLanguage) ? savedLanguage : 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());
  const [translations, setTranslations] = useState<Translations>(resources[language]);

  // Change language function
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setTranslations(resources[lang]);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  // Update translations when language changes
  useEffect(() => {
    setTranslations(resources[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
