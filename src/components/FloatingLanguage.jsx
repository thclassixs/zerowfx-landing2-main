import React from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/FloatingLanguage.css';
import ukFlag from '../assets/flags/uk.webp';
import saFlag from '../assets/flags/sa.webp';
import frFlag from '../assets/flags/fr.webp';

const FloatingLanguage = () => {
  const { language, cycleLanguage, t } = useLanguage();

  const getLanguageFlag = () => {
    switch (language) {
      case 'en':
        return ukFlag;
      case 'ar':
        return saFlag;
      case 'fr':
        return frFlag;
      default:
        return ukFlag;
    }
  };

  const getLanguageName = () => {
    switch (language) {
      case 'en':
        return 'English';
      case 'ar':
        return 'العربية';
      case 'fr':
        return 'Français';
      default:
        return 'Language';
    }
  };

  return (
    <button
      onClick={cycleLanguage}
      className="floating-language"
      aria-label={t('floatingLanguage')}
    >
      <img 
        src={getLanguageFlag()} 
        alt={getLanguageName()}
        className="language-flag-img"
      />
      <span className="language-tooltip">{t('floatingLanguage')}</span>
    </button>
  );
};

export default FloatingLanguage;