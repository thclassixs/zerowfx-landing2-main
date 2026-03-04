import React, { useEffect, useRef, useState } from 'react';
import '../styles/BrokerSection.css';

const BrokerSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  const handleCTAClick = () => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'affiliate',
        event_label: 'xm_broker_100_bonus'
      });
    }
    window.open('https://affs.click/X3LJB', '_blank');
  };

  return (
    <section className={`broker-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="broker-container">
        <span className="broker-badge">RECOMMENDED BROKER</span>

        <h2 className="broker-title">
          Start Trading with <span className="gold-text">100% Bonus</span>
        </h2>

        <p className="broker-description">
          Get a 100% deposit bonus when you sign up with XM - our trusted broker partner.
          Trade gold, forex, and indices with tight spreads and fast execution.
        </p>

        <div className="broker-benefits">
          <div className="benefit-item">
            <span className="benefit-check">✓</span>
            <span>100% Deposit Bonus</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-check">✓</span>
            <span>Tight Spreads on Gold</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-check">✓</span>
            <span>Fast Withdrawals</span>
          </div>
        </div>

        <button className="broker-cta" onClick={handleCTAClick}>
          Claim Your 100% Bonus
          <span className="arrow">→</span>
        </button>

        <p className="broker-disclaimer">
          Trading involves risk. Partner code: <span style={{ color: '#ffffff' }}>CQMHK</span>
        </p>
      </div>
    </section>
  );
};

export default BrokerSection;
