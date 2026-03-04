import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/UrgencyBanner.css';

const UrgencyBanner = () => {
  const { t } = useLanguage();
  const [spotsLeft] = useState(Math.floor(Math.random() * (50 - 25 + 1)) + 25);

  return (
    <section className="urgency-banner">
      <div className="urgency-container">
        <div className="urgency-content">
          <div className="urgency-icon">⚠️</div>
          <div className="urgency-text">
            <h3 className="urgency-title">{t('urgencyTitle')}</h3>
            <p className="urgency-subtitle">
              {t('urgencySubtitle').replace('{spots}', spotsLeft)}
            </p>
          </div>
        </div>
        
        <div className="bonuses-grid">
          <div className="bonus-item">
            <div className="bonus-icon">📚</div>
            <div className="bonus-details">
              <h4>{t('bonusTitle1')}</h4>
              <p className="bonus-value">
                <span className="strikethrough">$247</span> {t('bonusFree')}
              </p>
            </div>
          </div>
          
          <div className="bonus-item">
            <div className="bonus-icon">💰</div>
            <div className="bonus-details">
              <h4>{t('bonusTitle2')}</h4>
              <p className="bonus-value">{t('bonusValue2')}</p>
            </div>
          </div>
          
          <div className="bonus-item">
            <div className="bonus-icon">👥</div>
            <div className="bonus-details">
              <h4>{t('bonusTitle3')}</h4>
              <p className="bonus-value">{t('bonusValue3')}</p>
            </div>
          </div>
        </div>

        <div className="urgency-cta">
          <button 
            className="urgency-button"
            onClick={() => window.open('https://t.me/Zerowfxgold', '_blank')}
          >
            {t('urgencyButton')}
          </button>
          <p className="urgency-note">{t('urgencyNote')}</p>
        </div>
      </div>
    </section>
  );
};

export default UrgencyBanner;