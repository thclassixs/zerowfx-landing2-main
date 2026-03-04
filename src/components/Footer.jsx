import React from 'react';
import { useLanguage } from './LanguageContext';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {t('footerCopyright')}
          </p>
          <p className="disclaimer">
            {t('footerDisclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;