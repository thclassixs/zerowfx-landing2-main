import React from 'react';
import '../styles/Mentorship.css';

const Mentorship = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$297',
      period: '/month',
      features: [
        'Weekly Live Trading Sessions',
        'Access to Trading Community',
        'Basic Strategy Course',
        'Email Support',
        'Trading Journal Template'
      ],
      popular: false
    },
    {
      name: 'VIP',
      price: '$597',
      period: '/month',
      features: [
        'Daily Live Trading Sessions',
        'Priority Community Access',
        'Advanced Strategy Course',
        '24/7 Priority Support',
        'Personal Trading Review',
        'Risk Management Tools',
        'Exclusive Market Analysis'
      ],
      popular: true
    },
    {
      name: 'Lifetime',
      price: '$2,997',
      period: 'one-time',
      features: [
        'Lifetime Access to All Content',
        'All VIP Features Included',
        'Quarterly 1-on-1 Coaching',
        'Lifetime Updates',
        'Direct Mentor Access',
        'Custom Strategy Development',
        'Early Access to New Content'
      ],
      popular: false
    }
  ];

  return (
    <section className="mentorship">
      <div className="mentorship-container">
        <div className="mentorship-header">
          <h2 className="mentorship-title">Choose Your Path</h2>
          <p className="mentorship-subtitle">
            Select the mentorship plan that fits your goals and commitment level. 
            All plans include our proven trading strategies and ongoing support.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              
              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="plan-button">
                {plan.name === 'Lifetime' ? 'Get Lifetime Access' : 'Start Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="mentorship-guarantee">
          <h3>30-Day Money-Back Guarantee</h3>
          <p>
            Try any mentorship plan risk-free. If you're not completely satisfied 
            within the first 30 days, we'll refund your investment—no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;