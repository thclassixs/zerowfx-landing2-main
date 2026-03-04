import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/SecondVideoSection.css';
import sliderVideo from '../assets/video_2025-12-12_13-26-55.mp4'; // Use a separate video if you want

const Vidsec = () => {
  const { t } = useLanguage();
  const [memberCount, setMemberCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentElement = statsRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [hasAnimated]);

  const animateCount = () => {
    const target = 20000;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setMemberCount(target);
        clearInterval(timer);
      } else {
        setMemberCount(Math.floor(current));
      }
    }, 16);
  };

  const handleTelegramClick = () => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'hero_section_telegram'
      });
    }
    window.open('https://t.me/Zerowfxgold', '_blank');
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section className="secondvidsec">



      <div className="hero-content">
        <div className="hero-image">
          <div className="image-border">
            <div className="image-slider video-slider">
              <video
                className="slider-video"
                src={sliderVideo}
                controls
                playsInline
                preload="auto"
              />
            </div>
          </div>
        </div>
        <div className="hero-text">

          <ul className="hero-list">
            <li>Access to Zfx Telegram Trading Community</li>
            <li>Weekly Live Sessions on Forex, Stocks, and Crypto</li>
            <li>Mid-Week Market Updates on Forex, Stocks, and Crypto</li>
            <li>High-Quality Trade Setups</li>
            <li>Daily Live Sessions and Q&A with WTW Seniors</li>
            <li>Monthly Live Sessions on Investments and Stocks</li>
            <li>Best Tips to Strengthen Your Psychology</li>
          </ul>

          {/* Stats */}



          {/* CTA */}
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleTelegramClick}>
              <svg className="telegram-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              {t('heroButton')}
            </button>
          </div>

          {/* Trust indicators */}
          <div className="trust-indicators">
            <div className="indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{t('heroVerified')}</span>
            </div>

            <div className="indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <span>{t('heroTransparent')}</span>
            </div>

            <div className="indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
              </svg>
              <span>{t('heroRealTime')}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – VIDEO INSTEAD OF IMAGE SLIDER */}

      </div>
    </section>
  );
};

export default Vidsec;
