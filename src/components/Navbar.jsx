import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/Navbar.css';
import ukFlag from '../assets/flags/uk.webp';
import saFlag from '../assets/flags/sa.webp';
import frFlag from '../assets/flags/fr.webp';

const Navbar = ({ currentPage, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const langRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionClass) => {
    // If on affiliates page, go home first
    if (currentPage !== 'home') {
      window.location.hash = '';
      setPage('home');
      setTimeout(() => {
        const section = document.querySelector(sectionClass);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.querySelector(sectionClass);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const navigateTo = (target) => {
    if (target === 'home') {
      window.location.hash = '';
      setPage('home');
    } else if (target === 'affiliates') {
      window.location.hash = '#/affiliates';
      setPage('affiliates');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const flagMap = { en: ukFlag, ar: saFlag, fr: frFlag };
  const nameMap = { en: 'EN', ar: 'عر', fr: 'FR' };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left: Brand */}
        <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigateTo('home')}>
          <img src="/favicon.png" alt="Zerowfx" className="navbar-logo" />
          <span className="navbar-title">Zerowfx</span>
        </div>

        {/* Center: Nav links */}
        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {currentPage === 'home' ? (
            <>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('.about'); }}>About</a></li>
              <li><a href="#results" onClick={(e) => { e.preventDefault(); scrollToSection('.results'); }}>Results</a></li>
              <li><a href="#setups" onClick={(e) => { e.preventDefault(); scrollToSection('.trading-setups'); }}>Setups</a></li>
              <li><a href="#broker" onClick={(e) => { e.preventDefault(); scrollToSection('.broker-section'); }}>Broker</a></li>
            </>
          ) : (
            <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>← Home</a></li>
          )}
          <li>
            <a
              href="#affiliates"
              onClick={(e) => { e.preventDefault(); navigateTo('affiliates'); }}
              className={currentPage === 'affiliates' ? 'navbar-link-active' : ''}
              style={currentPage === 'affiliates' ? { color: '#168241' } : {}}
            >
              Partners
            </a>
          </li>
        </ul>

        {/* Right: Language + Hamburger */}
        <div className="navbar-cta-wrapper">
          {/* Language switcher Dropdown */}
          <div className="navbar-lang-container" ref={langRef}>
            <button
              className="navbar-lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-expanded={langMenuOpen}
              aria-label="Toggle language menu"
              title="Change language"
            >
              <img
                src={flagMap[language] || ukFlag}
                alt={language}
                className="navbar-lang-flag"
              />
              <span className="navbar-lang-name">{nameMap[language] || 'EN'}</span>
              <svg
                className={`navbar-lang-arrow ${langMenuOpen ? 'open' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Dropdown Menu */}
            <ul className={`navbar-lang-dropdown ${langMenuOpen ? 'open' : ''}`}>
              {Object.keys(flagMap).map((lang) => (
                <li key={lang}>
                  <button
                    className={`lang-dropdown-item ${language === lang ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                  >
                    <img src={flagMap[lang]} alt={lang} className="navbar-lang-flag" />
                    <span>{nameMap[lang]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
