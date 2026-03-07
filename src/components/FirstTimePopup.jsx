import React, { useState, useEffect } from 'react';
import '../styles/FirstTimePopup.css';

const FirstTimePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the popup or submitted the email
        const hasSeenPopup = localStorage.getItem('hasSeenXMFirstTimePopup');
        const hasSubmittedEmail = localStorage.getItem('hasSubmittedPopupEmail');

        if (!hasSeenPopup && !hasSubmittedEmail) {
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

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email || isSubmitting) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus('success');
                setEmail('');

                if (window.gtag) {
                    window.gtag('event', 'subscribe', {
                        event_category: 'engagement',
                        event_label: 'ftp_email_subscription'
                    });
                }

                // Never show popup again after successful submission
                localStorage.setItem('hasSubmittedPopupEmail', 'true');
                localStorage.setItem('hasSeenXMFirstTimePopup', 'true');

                // Close popup automatically after short delay
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(() => setMounted(false), 300);
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Subscribe error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
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

                <form className="email-form" onSubmit={handleEmailSubmit} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '0' }}>
                    <input
                        className="email-input"
                        placeholder="Enter your email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        style={{ padding: '0.9rem 1rem', borderRadius: '50px', border: '1.5px solid rgba(16, 185, 129, 0.35)', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '1rem', textAlign: 'center', width: '100%' }}
                    />
                    <button className="ftp-cta" type="submit" disabled={isSubmitting} style={{ marginBottom: 0, alignSelf: 'center' }}>
                        {isSubmitting ? '...' : (
                            <>
                                SUBMIT
                                <span className="arrow">→</span>
                            </>
                        )}
                    </button>
                    {submitStatus === 'success' && (
                        <p className="email-success" style={{ color: '#4ade80', fontSize: '0.9rem', margin: '0', textAlign: 'center' }}>You're in! Check your inbox.</p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="email-error" style={{ color: '#f87171', fontSize: '0.9rem', margin: '0', textAlign: 'center' }}>Something went wrong. Try again.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FirstTimePopup;
