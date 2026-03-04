import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/WhatYouGet.css';

const WhatYouGet = () => {
  const { t } = useLanguage();
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const benefits = [
    {
      icon: '📊',
      title: t('benefitTitle1'),
      description: t('benefitDesc1')
    },
    {
      icon: '🎥',
      title: t('benefitTitle2'),
      description: t('benefitDesc2')
    },
    {
      icon: '👥',
      title: t('benefitTitle3'),
      description: t('benefitDesc3')
    },
    {
      icon: '📚',
      title: t('benefitTitle4'),
      description: t('benefitDesc4')
    },
    {
      icon: '💬',
      title: t('benefitTitle5'),
      description: t('benefitDesc5')
    },
    {
      icon: '📈',
      title: t('benefitTitle6'),
      description: t('benefitDesc6')
    }
  ];

  return (
    <section 
      className={`what-you-get ${isSectionVisible ? 'visible' : ''}`}
      ref={sectionRef}
    >
      <div className="what-you-get-container">
        <div className="what-you-get-header">
          <h2 className="section-title">{t('whatYouGetTitle')}</h2>
          <p className="section-subtitle">{t('whatYouGetSubtitle')}</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="what-you-get-cta">
          <button 
            className="main-cta-button"
            onClick={() => window.open('https://t.me/Zerowfxgold', '_blank')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            {t('whatYouGetButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;