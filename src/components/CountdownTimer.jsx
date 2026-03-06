import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/CountdownTimer.css';

const CountdownTimer = () => {
  const { language, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpanded, setIsExpanded] = useState(() => {
    // Start collapsed on mobile to avoid blocking content
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMonday = new Date(now);
      const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
      nextMonday.setDate(now.getDate() + daysUntilMonday);
      nextMonday.setHours(0, 0, 0, 0);
      const difference = nextMonday - now;
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLabel = (unit) => {
    switch (language) {
      case 'fr':
        return { days: 'j', hours: 'h', minutes: 'min', seconds: 'sec' }[unit];
      case 'ar':
        return { days: 'ي', hours: 'س', minutes: 'د', seconds: 'ث' }[unit];
      default:
        return { days: 'd', hours: 'h', minutes: 'm', seconds: 's' }[unit];
    }
  };

  const getMessage = () => {
    if (language === 'ar') return 'ينتهي العرض في';
    if (language === 'fr') return "L'offre expire dans";
    return 'Offer ends in';
  };

  const getOfferItems = () => {
    return [
      t('countdownMasterclass'),
      t('countdownVIPAccess'),
      t('countdown100Bonus'),
    ];
  };

  if (!isVisible) {
    return (
      <button
        className="countdown-restore-btn"
        onClick={() => setIsVisible(true)}
        title="Show countdown timer"
        aria-label="Show countdown timer"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </button>
    );
  }

  return (
    <div className={`countdown-widget ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Collapse/Expand Tab */}
      <button
        className="countdown-toggle-btn"
        onClick={() => setIsExpanded(prev => !prev)}
        aria-label={isExpanded ? 'Collapse timer' : 'Expand timer'}
        title={isExpanded ? 'Collapse' : 'Expand'}
      >
        <svg
          className="toggle-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points={isExpanded ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
        </svg>
      </button>

      {/* Widget Body */}
      <div className="countdown-widget-body">
        {/* Header row */}
        <div className="countdown-widget-header">
          <div className="countdown-widget-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <span className="countdown-widget-title">{getMessage()}</span>
          <button
            className="countdown-hide-btn"
            onClick={() => setIsVisible(false)}
            title="Hide timer"
            aria-label="Hide timer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Time Display */}
        <div className="countdown-widget-display">
          {timeLeft.days > 0 && (
            <>
              <div className="cw-time-unit">
                <span className="cw-time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="cw-time-label">{getLabel('days')}</span>
              </div>
              <span className="cw-separator">:</span>
            </>
          )}
          <div className="cw-time-unit">
            <span className="cw-time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="cw-time-label">{getLabel('hours')}</span>
          </div>
          <span className="cw-separator">:</span>
          <div className="cw-time-unit">
            <span className="cw-time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="cw-time-label">{getLabel('minutes')}</span>
          </div>
          <span className="cw-separator">:</span>
          <div className="cw-time-unit">
            <span className="cw-time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="cw-time-label">{getLabel('seconds')}</span>
          </div>
        </div>

        {/* Offer items */}
        <ul className="countdown-widget-offers">
          {getOfferItems().map((item, i) => (
            <li key={i} className="cw-offer-item">
              <svg className="cw-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17L4 12" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountdownTimer;