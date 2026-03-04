import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/Results.css';

const Results = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const handleTelegramClick = () => {
    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'results_section_telegram'
      });
    }
    window.open('https://t.me/Zerowfxgold', '_blank');
  };

  const videos = [
    'l3vp9kgor5',
    'byqv69r5gy',
    'pu5yy1muk1',
    'sdr7a4aee4',
    '4wyo86dep1',
    'ylzc6g11jz',
    'mwpy455mpm',
    'k1o93mk5ds',
    'qwn184fh9i'
  ];

  const infiniteVideos = [...videos, ...videos, ...videos, ...videos, ...videos];
  const centerOffset = videos.length * 2;

  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://fast.wistia.com/player.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://fast.wistia.com/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const itemWidth = 250 + 24;
      const actualIndex = centerOffset + currentIndex;
      
      trackRef.current.style.transition = isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
      trackRef.current.style.transform = `translateX(-${actualIndex * itemWidth}px)`;
    }
  }, [currentIndex, centerOffset, isTransitioning]);

  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      
      if (currentIndex - 1 <= -videos.length) {
        setCurrentIndex((prev) => prev + videos.length);
      }
    }, 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      
      if (currentIndex + 1 >= videos.length) {
        setCurrentIndex((prev) => prev - videos.length);
      }
    }, 500);
  };

  const handleDotClick = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const normalizedIndex = ((currentIndex % videos.length) + videos.length) % videos.length;
  const isRTL = language === 'ar';

  return (
    <section className="results" ref={sectionRef}>
      <div className="results-container">
        <div className={`results-header ${hasAnimated ? 'animate-in' : ''}`}>
          <h2 className="results-title">{t('resultsTitle')}</h2>
          <p className="results-subtitle" style={{ whiteSpace: 'pre-line' }}>
            {t('resultsSubtitle')}
          </p>
        </div>

        <div className={`results-gallery ${hasAnimated ? 'animate-in' : ''}`}>
          <button 
            className="gallery-nav gallery-nav-prev"
            onClick={isRTL ? handleNext : handlePrev}
            aria-label="Previous"
            disabled={isTransitioning}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="gallery-viewport">
            <div className="gallery-track" ref={trackRef}>
              {infiniteVideos.map((videoId, index) => (
                <div key={`video-${index}`} className="gallery-item">
                  <wistia-player media-id={videoId}></wistia-player>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="gallery-nav gallery-nav-next"
            onClick={isRTL ? handlePrev : handleNext}
            aria-label="Next"
            disabled={isTransitioning}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className={`gallery-dots ${hasAnimated ? 'animate-in' : ''}`}>
          {videos.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`gallery-dot ${index === normalizedIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>

        <div className={`results-cta ${hasAnimated ? 'animate-in' : ''}`}>
          <button className="telegram-button" onClick={handleTelegramClick}>
            <svg className="telegram-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            {t('resultsButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Results;