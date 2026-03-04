import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/StickyCTABar.css';

const StickyCTABar = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'sticky_bar_telegram'
      });
    }
    window.open('https://t.me/Zerowfxgold', '_blank');
  };

  return (
    <div className={`sticky-cta-bar ${isVisible ? 'visible' : ''}`}>
      <div className="sticky-cta-content">
        <div className="sticky-cta-text">
          <span className="sticky-message">{t('stickyMessage')}</span>
        </div>
        <button className="sticky-cta-button" onClick={handleClick}>
          {t('stickyButton')}
        </button>
      </div>
    </div>
  );
};

export default StickyCTABar;