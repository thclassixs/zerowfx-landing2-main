import React, { useState, useEffect } from 'react';
import './App.css';
import { LanguageProvider } from './components/LanguageContext';
import { PriceProvider } from './components/PriceContext';
import Navbar from './components/Navbar';
import CountdownTimer from './components/CountdownTimer';
import Vidsec from './components/VideoSection';
import MarketTicker from './components/MarketTicker';
import About from './components/About';
import TradingSetups from './components/TradingSetups';
import Results from './components/Results';
import ResultsScreenshots from './components/ResultsScreenshots';
import BrokerSection from './components/BrokerSection';
import Footer from './components/Footer';
import StickyCTABar from './components/StickyCTABar';
import SecondVidSec from './components/SecondVideoSection';
import AffiliatesPage from './components/AffiliatesPage';

function App() {
  const [page, setPage] = useState('home');

  // Sync with hash-based routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/affiliates') {
        setPage('affiliates');
      } else {
        setPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <LanguageProvider>
      <PriceProvider>
        <div className="App">
          <Navbar currentPage={page} setPage={setPage} />
          <div className="navbar-spacer"></div>

          {page === 'affiliates' ? (
            <AffiliatesPage />
          ) : (
            <>
              <CountdownTimer />
              <Vidsec />
              <MarketTicker />
              <SecondVidSec />
              <About />
              <Results />
              <TradingSetups />
              <ResultsScreenshots />
              <BrokerSection />
              <Footer />
              <StickyCTABar />
            </>
          )}
        </div>
      </PriceProvider>
    </LanguageProvider>
  );
}

export default App;
