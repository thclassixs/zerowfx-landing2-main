import React from 'react';
import '../styles/CTA.css';

const CTA = () => {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Trading?</h2>
          <p className="cta-subtitle">
            Join hundreds of successful traders who have mastered the markets 
            with proven strategies and expert mentorship.
          </p>
          <button className="cta-button">Start Your Journey Today</button>
          <p className="cta-note">
            Limited spots available • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;