import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/ResultsScreenshots.css';

// Import images individually, excluding a12.webp
import a1 from '../assets/results/a1.webp';
import a2 from '../assets/results/a2.webp';
// import a3 from '../assets/results/a3.webp';
// import a4 from '../assets/results/a4.webp';
import a5 from '../assets/results/a5.webp';
import a6 from '../assets/results/a6.webp';
import a7 from '../assets/results/a7.webp';
import a8 from '../assets/results/a8.webp';
import a9 from '../assets/results/a9.webp';
import a10 from '../assets/results/a10.webp';
import a11 from '../assets/results/a11.webp';
// a12 intentionally excluded
import a13 from '../assets/results/a13.webp';
import a14 from '../assets/results/a14.webp';
import a15 from '../assets/results/a15.webp';
import a16 from '../assets/results/a16.webp';
import a17 from '../assets/results/a17.webp';
import a18 from '../assets/results/a18.webp';
import a19 from '../assets/results/a19.webp';
import a20 from '../assets/results/a20.webp';

const images = [a1, a2, a5, a6, a7, a8, a9, a10, a11, a13, a14, a15, a16, a17, a18, a19, a20];

const ResultsScreenshots = () => {
  const { t, language } = useLanguage();
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;

    // Check if language is RTL (Arabic)
    const isRTL = language === 'ar';

    // Much faster speed on mobile vs desktop
    const isMobile = window.innerWidth <= 768;
    const scrollSpeed = isMobile ? 1.5 : 0.7;

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Calculate the width of one complete set
      const isMobileView = window.innerWidth <= 768;
      const itemWidth = isMobileView ? 240 : 280;
      const gap = isMobileView ? 12 : 16;
      const setWidth = (itemWidth + gap) * images.length;

      // Reset seamlessly when we've scrolled through one complete set
      if (scrollPosition >= setWidth) {
        scrollPosition = scrollPosition - setWidth;
      }

      // For RTL, we need to scroll in the opposite direction
      // LTR scrolls left (negative), RTL scrolls right (positive)
      const transformValue = isRTL ? scrollPosition : -scrollPosition;
      scrollContainer.style.transform = `translateX(${transformValue}px)`;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [language]);

  const handleTelegramClick = () => {
    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'screenshots_section_telegram'
      });
    }
    window.open('https://t.me/Zerowfxgold', '_blank');
  };

  // Double the images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={`results-screenshots ${isSectionVisible ? 'visible' : ''}`}
      id="results-screenshots"
      ref={sectionRef}
    >
      <div className="results-screenshots-container">
        <div className="results-screenshots-header">
          <h2 className="section-title">
            {t('screenshotsTitle')}
          </h2>
          <p className="section-subtitle">
            {t('screenshotsSubtitle')}
          </p>
        </div>

        <div className="screenshots-scroll-container">
          <div className="screenshots-scroll" ref={scrollRef}>
            {duplicatedImages.map((img, index) => (
              <div
                key={index}
                className="screenshot-item"
              >
                <img
                  src={img}
                  alt={`Trading result ${(index % images.length) + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsScreenshots;