import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countdownHeight, setCountdownHeight] = useState(0);

  // Dynamically measure the countdown banner height to eliminate the gap
  useEffect(() => {
    const countdown = document.querySelector('.countdown-timer');
    if (!countdown) return;

    const updateHeight = () => {
      const h = countdown.getBoundingClientRect().height;
      setCountdownHeight(h);
      // Keep the CSS variable in sync so .navbar-spacer stays correct
      document.documentElement.style.setProperty('--countdown-h', `${h}px`);
    };
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(countdown);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionClass) => {
    const section = document.querySelector(sectionClass);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{ top: countdownHeight || undefined }}
    >
      <div className="navbar-container">
        {/* Left: Brand */}
        <div className="navbar-brand">
          <img src="/favicon.png" alt="Zerowfx" className="navbar-logo" />
          <span className="navbar-title">Zerowfx</span>
        </div>

        {/* Center: Nav links (hidden on mobile, replaced by hamburger) */}
        <ul
          className={`navbar-menu ${menuOpen ? 'open' : ''}`}
          style={{ top: countdownHeight ? countdownHeight + 70 : undefined }}
        >
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('.about'); }}>About</a></li>
          <li><a href="#results" onClick={(e) => { e.preventDefault(); scrollToSection('.results'); }}>Results</a></li>
          <li><a href="#setups" onClick={(e) => { e.preventDefault(); scrollToSection('.trading-setups'); }}>Setups</a></li>
          <li><a href="#broker" onClick={(e) => { e.preventDefault(); scrollToSection('.broker-section'); }}>Broker</a></li>
          <li className="navbar-menu-cta-item">
            <a href="https://t.me/zerowfx" target="_blank" rel="noopener noreferrer" className="navbar-cta navbar-cta-mobile">
              Join Telegram
            </a>
          </li>
        </ul>

        {/* Right: CTA + Mobile hamburger */}
        <div className="navbar-cta-wrapper">
          <a href="https://t.me/zerowfx" target="_blank" rel="noopener noreferrer" className="navbar-cta">
            Join Telegram
          </a>
          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
