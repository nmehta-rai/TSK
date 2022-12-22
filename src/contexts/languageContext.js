import React, {useState, createContext, useContext} from 'react';
import {dictionaryList, languageOptions} from '../languages/languages';

const LanguageContext = createContext({
  userLanguage: 'en',
  dictionary: dictionaryList.en,
});

export const LanguageProvider = ({children}) => {
  const [userLanguage, setUserLanguage] = useState('en');

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: newLang => setUserLanguage(newLang),
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLang can only be used inside LanguageProvider');
  }
  return context;
};
