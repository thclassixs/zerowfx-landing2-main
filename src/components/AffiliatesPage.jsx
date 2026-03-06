import React, { useEffect, useRef, useState } from 'react';
import '../styles/AffiliatesPage.css';

/* ─────────────────────────────────────────────────────────────
   Broker / Affiliate data — edit here to add / remove entries
───────────────────────────────────────────────────────────── */
const brokers = [
    {
        id: 'xm',
        name: 'XM Group',
        category: 'Forex & CFD',
        badge: 'RECOMMENDED',
        badgeColor: '#168241',
        logo: '🏦',
        rating: 4.9,
        bonus: '100% Deposit Bonus',
        description:
            "Trade Forex, Gold, Indices and Crypto with one of the world's most trusted brokers.Ultra - tight spreads, fast execution and regulated in multiple jurisdictions.",
        features: [
            '100% Deposit Bonus up to $500',
            'Ultra-low spreads from 0.0 pips',
            'Free VPS for active traders',
            'Instant withdrawals',
            '$30 No-Deposit Bonus',
        ],
        ctaLabel: 'Open Account – Get 100% Bonus',
        ctaLink: 'https://affs.click/X3LJB',
        partnerCode: 'CQMHK',
        regulation: 'CySEC • ASIC • IFSC',
        highlight: true,
    },
    {
        id: 'exness',
        name: 'Exness',
        category: 'Forex & Metals',
        badge: 'TOP SPREADS',
        badgeColor: '#1d6edb',
        logo: '💹',
        rating: 4.7,
        bonus: 'Unlimited Leverage',
        description:
            'Industry-leading tight spreads on Gold and major Forex pairs. Instant withdrawals 24/7 and professional trading conditions for serious traders.',
        features: [
            'Spreads from 0.0 pips on Gold',
            'Unlimited leverage available',
            'Instant 24/7 withdrawals',
            'No swap on select accounts',
            'True ECN execution',
        ],
        ctaLabel: 'Start Trading with Exness',
        ctaLink: 'https://one.exness-track.com/a/your-link',
        partnerCode: 'ZEROWFX',
        regulation: 'FCA • CySEC • FSA',
        highlight: false,
    },
    {
        id: 'ic-markets',
        name: 'IC Markets',
        category: 'ECN Broker',
        badge: 'RAW SPREADS',
        badgeColor: '#8b5cf6',
        logo: '📈',
        rating: 4.8,
        bonus: 'Raw Spread Account',
        description:
            'True ECN broker with raw interbank spreads. Perfect for scalping and algorithmic trading. Regulated by ASIC and CySEC with lightning-fast execution.',
        features: [
            'Raw spreads from 0.0 pips',
            'Up to 1:500 leverage',
            'Multiple platforms (MT4/MT5/cTrader)',
            'Ultra-fast order execution',
            'No restrictions on trading style',
        ],
        ctaLabel: 'Open Raw Spread Account',
        ctaLink: 'https://icmarkets.com/?camp=your-link',
        partnerCode: 'ZFX2024',
        regulation: 'ASIC • CySEC • FSA',
        highlight: false,
    },
    {
        id: 'pepperstone',
        name: 'Pepperstone',
        category: 'CFD Broker',
        badge: 'FAST EXECUTION',
        badgeColor: '#f59e0b',
        logo: '⚡',
        rating: 4.6,
        bonus: 'No Minimum Deposit',
        description:
            'Award-winning broker offering superior trading conditions for Gold and Forex. Known for blazing-fast execution and no dealing desk intervention.',
        features: [
            'No minimum deposit',
            'Award-winning customer support',
            'Advanced charting tools',
            'MT4 / MT5 / cTrader support',
            'Razor-thin spreads on majors',
        ],
        ctaLabel: 'Trade with Pepperstone',
        ctaLink: 'https://pepperstone.com/?ref=your-link',
        partnerCode: 'ZEROWFX',
        regulation: 'ASIC • FCA • DFSA',
        highlight: false,
    },
];

/* ─── Star Rating ─── */
const StarRating = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
        <div className="afp-stars" aria-label={`Rating: ${rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className={`afp-star ${i <= full ? 'full' : i === full + 1 && half ? 'half' : 'empty'}`}
                >
                    ★
                </span>
            ))}
            <span className="afp-rating-num">{rating}</span>
        </div>
    );
};

/* ─── Single Broker Card ─── */
const BrokerCard = ({ broker, index }) => {
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = cardRef.current;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (el) obs.observe(el);
        return () => { if (el) obs.unobserve(el); };
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if (window.gtag) {
            window.gtag('event', 'affiliate_click', {
                event_category: 'affiliates_page',
                event_label: broker.id,
            });
        }
        window.open(broker.ctaLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <article
            ref={cardRef}
            className={`afp-card ${broker.highlight ? 'afp-card--featured' : ''} ${visible ? 'afp-card--visible' : ''}`}
            style={{ transitionDelay: `${index * 80}ms` }}
            id={`broker-${broker.id}`}
        >
            {broker.highlight && (
                <div className="afp-featured-ribbon">⭐ TOP PICK</div>
            )}

            {/* Card Header */}
            <div className="afp-card-header">
                <div className="afp-logo-wrap">
                    <span className="afp-logo-emoji">{broker.logo}</span>
                </div>
                <div className="afp-card-meta">
                    <span className="afp-badge" style={{ background: broker.badgeColor + '22', color: broker.badgeColor, borderColor: broker.badgeColor + '55' }}>
                        {broker.badge}
                    </span>
                    <h3 className="afp-card-name">{broker.name}</h3>
                    <p className="afp-card-category">{broker.category}</p>
                    <StarRating rating={broker.rating} />
                </div>
                <div className="afp-bonus-tag">
                    <span className="afp-bonus-label">BONUS</span>
                    <span className="afp-bonus-value">{broker.bonus}</span>
                </div>
            </div>

            {/* Description */}
            <p className="afp-card-desc">{broker.description}</p>

            {/* Features */}
            <ul className="afp-features">
                {broker.features.map((f, i) => (
                    <li key={i} className="afp-feature-item">
                        <span className="afp-check">✓</span>
                        {f}
                    </li>
                ))}
            </ul>

            {/* Footer */}
            <div className="afp-card-footer">
                <div className="afp-regulation">
                    <span className="afp-regulation-label">Regulated by:</span>
                    <span className="afp-regulation-value">{broker.regulation}</span>
                </div>
                {broker.partnerCode && (
                    <div className="afp-partner-code">
                        Code: <strong>{broker.partnerCode}</strong>
                    </div>
                )}
            </div>

            <a
                href={broker.ctaLink}
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
                className="afp-cta"
                id={`cta-${broker.id}`}
            >
                {broker.ctaLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
            </a>

            <p className="afp-disclaimer">
                Trading involves risk. Capital at risk. Partner disclosure required.
            </p>
        </article>
    );
};

/* ─── Main Page ─── */
const AffiliatesPage = () => {
    const headerRef = useRef(null);
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const t = setTimeout(() => setHeaderVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <main className="afp-page" id="affiliates-page">
            {/* Hero Header */}
            <header className={`afp-hero ${headerVisible ? 'afp-hero--visible' : ''}`} ref={headerRef}>
                <div className="afp-hero-bg" aria-hidden="true">
                    <div className="afp-hero-orb afp-hero-orb--1" />
                    <div className="afp-hero-orb afp-hero-orb--2" />
                    <div className="afp-grid-pattern" />
                </div>
                <div className="afp-hero-content">
                    <span className="afp-hero-eyebrow">🤝 ZEROWFX PARTNERS</span>
                    <h1 className="afp-hero-title">
                        Trusted Brokers &amp;<br />
                        <span className="afp-hero-accent">Affiliate Partners</span>
                    </h1>
                    <p className="afp-hero-subtitle">
                        Every broker listed here has been personally vetted by the ZeroWFX team.
                        Trade with confidence using our exclusive affiliate links and unlock
                        special bonuses available only to our community.
                    </p>
                    <div className="afp-hero-stats">
                        <div className="afp-stat">
                            <span className="afp-stat-num">4+</span>
                            <span className="afp-stat-label">Partner Brokers</span>
                        </div>
                        <div className="afp-stat-divider" />
                        <div className="afp-stat">
                            <span className="afp-stat-num">10+</span>
                            <span className="afp-stat-label">Years Experience</span>
                        </div>
                        <div className="afp-stat-divider" />
                        <div className="afp-stat">
                            <span className="afp-stat-num">100%</span>
                            <span className="afp-stat-label">Regulated Brokers</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Disclaimer Banner */}
            <div className="afp-disclaimer-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>
                    <strong>Affiliate Disclosure:</strong> ZeroWFX may earn a commission when you open an account through our links at no extra cost to you.
                    All brokers are independently reviewed for safety and quality.
                </p>
            </div>

            {/* Cards Grid */}
            <section className="afp-grid-section">
                <div className="afp-grid-container">
                    <div className="afp-cards-grid">
                        {brokers.map((broker, i) => (
                            <BrokerCard key={broker.id} broker={broker} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="afp-trust-section">
                <div className="afp-trust-container">
                    <h2 className="afp-trust-title">Why We Only Partner with the Best</h2>
                    <div className="afp-trust-grid">
                        {[
                            { icon: '🛡️', title: 'Fully Regulated', desc: 'Every broker is licensed by top-tier regulators including FCA, ASIC, and CySEC.' },
                            { icon: '⚡', title: 'Fast Execution', desc: 'Our partners offer institutional-grade infrastructure for split-second trade execution.' },
                            { icon: '💸', title: 'Exclusive Bonuses', desc: 'Our affiliate links unlock special offers not available to the general public.' },
                            { icon: '🔒', title: 'Fund Security', desc: 'Client funds are held in segregated accounts at top-tier banking institutions.' },
                        ].map((item, i) => (
                            <div className="afp-trust-card" key={i}>
                                <span className="afp-trust-icon">{item.icon}</span>
                                <h3 className="afp-trust-card-title">{item.title}</h3>
                                <p className="afp-trust-card-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AffiliatesPage;
