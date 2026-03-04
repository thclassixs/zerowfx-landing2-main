import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/About.css';
import img1 from '../assets/image3.webp';
import img2 from '../assets/image2.webp';
import img3 from '../assets/image4.webp';
import img4 from '../assets/image5.webp';
import img7 from '../assets/image8.webp';
import img8 from '../assets/image9.webp';
import img9 from '../assets/image10.webp';
import img10 from '../assets/image11.webp';
import img11 from '../assets/image12.webp';

const About = () => {
  const { t } = useLanguage();
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef(null);

  const images = [img1, img2, img3, img4, img7, img8, img9, img10, img11];

  useEffect(() => {
    const currentSection = sectionRef.current;
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      sectionObserver.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        sectionObserver.unobserve(currentSection);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleTelegramClick = () => {
    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'about_section_telegram'
      });
    }
    window.open('https://t.me/Zerowfxgold', '_blank');
  };

  const handleXMClick = () => {
    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'xm_register_click', {
        event_category: 'conversion',
        event_label: 'about_section_xm'
      });
    }
    window.open('https://affs.click/X3LJB', '_blank');
  };

  return (
    <section className={`about ${isSectionVisible ? 'visible' : ''}`} id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <div className="about-image-slider">
            <div className="image-slider-container">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Trading Expert ${index + 1}`}
                  className={`slider-image-about ${index === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="about-text">
            <div className="about-header">
              <h2 className="about-main-title">
                {t('aboutTitle1')} <span className="highlight">{t('aboutTitle2')}</span>
              </h2>
            </div>

            <div className="about-body">
              <div className="text-block">
                <p>{t('aboutText1')}</p>
              </div>

              <div className="text-block">
                <p>{t('aboutText2')}</p>
              </div>

              <div className="about-buttons">
                <button className="cta-button" onClick={handleTelegramClick}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  {t('aboutButton')}
                </button>

                <div className="xm-button-wrapper">
                  <button className="xm-button" onClick={handleXMClick}>
                    {t('aboutXMButton')}
                  </button>
                  <span className="bonus-badge">{t('aboutBonusBadge')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;