import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const PriceContext = createContext();

export const usePrices = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('usePrices must be used within a PriceProvider');
  }
  return context;
};

export const PriceProvider = ({ children }) => {
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  const [prices, setPrices] = useState(() => {
    // Try to load from localStorage
    const cached = localStorage.getItem('marketPrices');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is still valid (less than 5 minutes old)
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    
    // Default empty state
    return {
      gold: { price: null, change: null },
      btc: { price: null, change: null },
      eth: { price: null, change: null },
      sol: { price: null, change: null },
      avax: { price: null, change: null },
      eurusd: { price: null, change: null },
      gbpusd: { price: null, change: null },
      usdjpy: { price: null, change: null }
    };
  });

  const [lastFetch, setLastFetch] = useState(() => {
    const cached = localStorage.getItem('marketPrices');
    if (cached) {
      const { timestamp } = JSON.parse(cached);
      return timestamp;
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchPrices = useCallback(async () => {
    const now = Date.now();
    
    // Don't fetch if we just fetched recently (within 1 minute)
    if (lastFetch && now - lastFetch < 60000) {
      return;
    }

    setIsLoading(true);

    try {
      // Fetch Gold from goldprice.org
      let goldPrice = null;
      let goldChange = null;
      try {
        const goldResponse = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
        const goldData = await goldResponse.json();
        if (goldData && goldData.items && goldData.items[0]) {
          goldPrice = goldData.items[0].xauPrice;
          goldChange = goldData.items[0].pcXau;
        }
      } catch (err) {
        console.error('Error fetching gold:', err);
      }

      // Fetch Crypto from CoinGecko
      let cryptoData = {};
      try {
        const cryptoResponse = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,avalanche-2&vs_currencies=usd&include_24hr_change=true'
        );
        cryptoData = await cryptoResponse.json();
      } catch (err) {
        console.error('Error fetching crypto:', err);
      }

      // Fetch Forex rates
      let eurusd = null;
      let gbpusd = null;
      let usdjpy = null;
      try {
        const forexResponse = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        const forexData = await forexResponse.json();
        if (forexData && forexData.usd) {
          eurusd = 1 / forexData.usd.eur;
          gbpusd = 1 / forexData.usd.gbp;
          usdjpy = forexData.usd.jpy;
        }
      } catch (err) {
        console.error('Error fetching forex:', err);
      }

      const newPrices = {
        gold: {
          price: goldPrice,
          change: goldChange
        },
        btc: {
          price: cryptoData.bitcoin?.usd || null,
          change: cryptoData.bitcoin?.usd_24h_change || null
        },
        eth: {
          price: cryptoData.ethereum?.usd || null,
          change: cryptoData.ethereum?.usd_24h_change || null
        },
        sol: {
          price: cryptoData.solana?.usd || null,
          change: cryptoData.solana?.usd_24h_change || null
        },
        avax: {
          price: cryptoData['avalanche-2']?.usd || null,
          change: cryptoData['avalanche-2']?.usd_24h_change || null
        },
        eurusd: {
          price: eurusd,
          change: null
        },
        gbpusd: {
          price: gbpusd,
          change: null
        },
        usdjpy: {
          price: usdjpy,
          change: null
        }
      };

      setPrices(newPrices);
      setLastFetch(now);

      // Save to localStorage
      localStorage.setItem('marketPrices', JSON.stringify({
        data: newPrices,
        timestamp: now
      }));

    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setIsLoading(false);
    }
  }, [lastFetch]);

  useEffect(() => {
    // Fetch on mount if cache is expired
    const cached = localStorage.getItem('marketPrices');
    const shouldFetch = !cached || (Date.now() - lastFetch > CACHE_DURATION);
    
    if (shouldFetch) {
      fetchPrices();
    }

    // Set up interval to fetch every 5 minutes
    const interval = setInterval(fetchPrices, CACHE_DURATION);

    return () => clearInterval(interval);
  }, [CACHE_DURATION, fetchPrices, lastFetch]);

  return (
    <PriceContext.Provider value={{ prices, lastFetch, isLoading, fetchPrices }}>
      {children}
    </PriceContext.Provider>
  );
};