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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Find next Monday at 00:00:00
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLabel = (unit) => {
    switch (language) {
      case 'fr':
        return {
          days: 'jours',
          hours: 'heures',
          minutes: 'minutes',
          seconds: 'secondes'
        }[unit];
      case 'ar':
        return {
          days: 'يوم',
          hours: 'ساعة',
          minutes: 'دقيقة',
          seconds: 'ثانية'
        }[unit];
      default:
        return {
          days: 'days',
          hours: 'hours',
          minutes: 'minutes',
          seconds: 'seconds'
        }[unit];
    }
  };

  return (
    <div className={`countdown-timer ${isScrolled ? 'scrolled' : ''}`}>
      <div className="countdown-container">
        {!isScrolled ? (
          <>
            <div className="countdown-offer-items">
              <div className="offer-item">
                <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17L4 12" />
                </svg>
                <span>{t('countdownMasterclass')}</span>
              </div>
              <div className="offer-item">
                <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17L4 12" />
                </svg>
                <span>{t('countdownVIPAccess')}</span>
              </div>
              <div className="offer-item">
                <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17L4 12" />
                </svg>
                <span>{t('countdown100Bonus')}</span>
              </div>
            </div>
            <div className="countdown-display">
              {timeLeft.days > 0 && (
                <div className="time-unit">
                  <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="time-label">{getLabel('days')}</span>
                </div>
              )}
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">{getLabel('hours')}</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">{getLabel('minutes')}</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">{getLabel('seconds')}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="countdown-message">
              {language === 'ar' ? 'ينتهي العرض في:' :
                language === 'fr' ? "L'offre se termine dans:" :
                  'Offer ends in:'}
            </div>
            <div className="countdown-display compact">
              {timeLeft.days > 0 && (
                <div className="time-unit">
                  <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="time-label">{getLabel('days')}</span>
                </div>
              )}
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">{getLabel('hours')}</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">{getLabel('minutes')}</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">{getLabel('seconds')}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;