import React, { useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { usePrices } from './PriceContext';
import '../styles/MarketTicker.css';

const MarketTicker = () => {
  const { language } = useLanguage();
  const { prices } = usePrices();
  const wrapperRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);

  const formatPrice = (price, decimals = 2) => {
    if (!price && price !== 0) return '...';
    return price.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const formatChange = (change) => {
    if (!change && change !== 0) return '';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const tickerItems = [
    { symbol: 'GOLD', price: prices.gold?.price, change: prices.gold?.change, prefix: '$', decimals: 2 },
    { symbol: 'BTC', price: prices.btc?.price, change: prices.btc?.change, prefix: '$', decimals: 0 },
    { symbol: 'ETH', price: prices.eth?.price, change: prices.eth?.change, prefix: '$', decimals: 2 },
    { symbol: 'SOL', price: prices.sol?.price, change: prices.sol?.change, prefix: '$', decimals: 2 },
    { symbol: 'AVAX', price: prices.avax?.price, change: prices.avax?.change, prefix: '$', decimals: 2 },
    { symbol: 'EUR/USD', price: prices.eurusd?.price, change: prices.eurusd?.change, prefix: '', decimals: 5 },
    { symbol: 'GBP/USD', price: prices.gbpusd?.price, change: prices.gbpusd?.change, prefix: '', decimals: 5 },
    { symbol: 'USD/JPY', price: prices.usdjpy?.price, change: prices.usdjpy?.change, prefix: '', decimals: 3 }
  ];

  const isRTL = language === 'ar';

  // Infinite scroll animation
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Wait for DOM to be fully ready
    const initAnimation = () => {
      if (!wrapper.firstChild || wrapper.firstChild.offsetWidth === 0) {
        requestAnimationFrame(initAnimation);
        return;
      }

      // Determine speed based on screen size
      const getSpeed = () => {
        if (window.innerWidth <= 520) return 0.8;
        if (window.innerWidth <= 968) return 0.5;
        return 0.3;
      };

      let speed = getSpeed();
      const firstChild = wrapper.firstChild;
      const itemWidth = firstChild.offsetWidth;

      const animate = () => {
        if (isRTL) {
          positionRef.current += speed;
          if (positionRef.current >= itemWidth) {
            positionRef.current = 0;
          }
        } else {
          positionRef.current -= speed;
          if (positionRef.current <= -itemWidth) {
            positionRef.current = 0;
          }
        }

        wrapper.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
        animationRef.current = requestAnimationFrame(animate);
      };

      const handleResize = () => {
        speed = getSpeed();
      };

      window.addEventListener('resize', handleResize);
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('resize', handleResize);
      };
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRTL]);

  return (
    <div className={`market-ticker ${isRTL ? 'rtl' : ''}`}>
      <div className="ticker-track">
        <div className="ticker-wrapper" ref={wrapperRef}>
          <div className="ticker-content">
            {tickerItems.map((item, index) => (
              <div className="ticker-item" key={`set1-${index}`}>
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="ticker-price">
                  {item.prefix}{formatPrice(item.price, item.decimals)}
                </span>
                {item.change !== null && (
                  <span className={`ticker-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    {formatChange(item.change)}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="ticker-content">
            {tickerItems.map((item, index) => (
              <div className="ticker-item" key={`set2-${index}`}>
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="ticker-price">
                  {item.prefix}{formatPrice(item.price, item.decimals)}
                </span>
                {item.change !== null && (
                  <span className={`ticker-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    {formatChange(item.change)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;