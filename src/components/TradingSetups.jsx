import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/TradingSetups.css';

// Import setup images
import AA1 from '../assets/setups/AA1.webp';
import AA2 from '../assets/setups/AA2.webp';
import AB1 from '../assets/setups/AB1.webp';
import AB2 from '../assets/setups/AB2.webp';
import AC1 from '../assets/setups/AC1.webp';
import AC2 from '../assets/setups/AC2.webp';

const TradingSetups = () => {
  const { t } = useLanguage();
  const [currentSetup, setCurrentSetup] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  const setups = [
    { before: AA1, after: AA2, name: 'Setup A' },
    { before: AB1, after: AB2, name: 'Setup B' },
    { before: AC1, after: AC2, name: 'Setup C' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const handlePrevSetup = () => {
    setCurrentSetup((prev) => (prev === 0 ? setups.length - 1 : prev - 1));
  };

  const handleNextSetup = () => {
    setCurrentSetup((prev) => (prev === setups.length - 1 ? 0 : prev + 1));
  };

  const handleTelegramClick = () => {
    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'setups_section_telegram'
      });
    }
    window.open('https://t.me/Zerowfxgold', '_blank');
  };

  return (
    <section 
      className={`trading-setups ${isSectionVisible ? 'visible' : ''}`}
      ref={sectionRef}
    >
      <div className="setups-container">
        <div className="setups-header">
          <h2 className="setups-title">{t('setupsTitle')}</h2>
          <p className="setups-subtitle">{t('setupsSubtitle')}</p>
        </div>

        <div className="setups-display">
          <button 
            className="setup-nav setup-nav-prev" 
            onClick={handlePrevSetup}
            aria-label="Previous setup"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="setup-cards">
            <div className="setup-card before-card">
              <div className="card-label">
                <span className="label-icon">📍</span>
                {t('setupBefore')}
              </div>
              <div className="setup-image-wrapper">
                <img 
                  src={setups[currentSetup].before} 
                  alt={`${setups[currentSetup].name} - Before`}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="setup-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>

            <div className="setup-card after-card">
              <div className="card-label">
                <span className="label-icon">✅</span>
                {t('setupAfter')}
              </div>
              <div className="setup-image-wrapper">
                <img 
                  src={setups[currentSetup].after} 
                  alt={`${setups[currentSetup].name} - After`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <button 
            className="setup-nav setup-nav-next" 
            onClick={handleNextSetup}
            aria-label="Next setup"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="setup-indicators">
          {setups.map((_, index) => (
            <button
              key={index}
              className={`setup-dot ${index === currentSetup ? 'active' : ''}`}
              onClick={() => setCurrentSetup(index)}
              aria-label={`Go to setup ${index + 1}`}
            />
          ))}
        </div>

        <div className="setups-cta">
          <p className="cta-text-sets">{t('setupsCTA')}</p>
          <button className="cta-telegram-btn" onClick={handleTelegramClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            {t('setupsButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TradingSetups;