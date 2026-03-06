import React, { useState, useEffect } from 'react';
import '../styles/FirstTimePopup.css';

const FirstTimePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the popup
        const hasSeenPopup = localStorage.getItem('hasSeenXMFirstTimePopup');

        if (!hasSeenPopup) {
            // Delay before showing the popup so the page can load nicely
            const timer = setTimeout(() => {
                setIsVisible(true);
                setMounted(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenXMFirstTimePopup', 'true');
        // Allow fade out transition before unmounting
        setTimeout(() => setMounted(false), 300);
    };

    const handleCTAClick = () => {
        localStorage.setItem('hasSeenXMFirstTimePopup', 'true');
        if (window.gtag) {
            window.gtag('event', 'cta_click', {
                event_category: 'affiliate',
                event_label: 'xm_popup_100_bonus'
            });
        }
        // Opening link for XM as requested in the mockup
        window.open('https://affs.click/X3LJB', '_blank');
        setIsVisible(false);
        setTimeout(() => setMounted(false), 300);
    };

    if (!mounted) return null;

    return (
        <div
            className="ftp-overlay"
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
            <div
                className="ftp-modal"
                style={{
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                    transition: 'all 0.3s ease'
                }}
            >
                <button className="ftp-close-btn" onClick={handleClose} aria-label="Close">
                    &times;
                </button>

                <span className="ftp-badge">RECOMMENDED BROKER</span>

                <h2 className="ftp-title">
                    Start Trading with <span className="gold-text">100% Bonus</span>
                </h2>

                <p className="ftp-description">
                    Get a 100% deposit bonus when you sign up with XM - our trusted broker partner.
                    Trade gold, forex, and indices with tight spreads and fast execution.
                </p>

                <div className="ftp-benefits">
                    <div className="ftp-benefit-item">
                        <span className="ftp-benefit-check">✓</span>
                        <span>100% Deposit Bonus</span>
                    </div>
                    <div className="ftp-benefit-item">
                        <span className="ftp-benefit-check">✓</span>
                        <span>Tight Spreads on Gold</span>
                    </div>
                    <div className="ftp-benefit-item">
                        <span className="ftp-benefit-check">✓</span>
                        <span>Fast Withdrawals</span>
                    </div>
                </div>

                <button className="ftp-cta" onClick={handleCTAClick}>
                    CLAIM YOUR 100% BONUS
                    <span className="arrow">→</span>
                </button>

                <p className="ftp-disclaimer">
                    Trading involves risk. Partner code: <span>CQMHK</span>
                </p>
            </div>
        </div>
    );
};

export default FirstTimePopup;
