import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/FAQ.css';

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
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

  const faqs = [
    {
      question: t('faqQ1'),
      answer: t('faqA1')
    },
    {
      question: t('faqQ2'),
      answer: t('faqA2')
    },
    {
      question: t('faqQ3'),
      answer: t('faqA3')
    },
    {
      question: t('faqQ4'),
      answer: t('faqA4')
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTelegramClick = () => {
    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'faq_section_telegram'
      });
    }
    window.open('https://t.me/Zerowfxgold', '_blank');
  };

  return (
    <section className={`faq ${isSectionVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">{t('faqTitle')}</h2>
          <p className="faq-subtitle">
            {t('faqSubtitle')}
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta-section">
          <h3 className="faq-cta-title">{t('faqCTATitle')}</h3>
          <button className="telegram-button" onClick={handleTelegramClick}>
            <svg className="telegram-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            {t('faqCTAButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;