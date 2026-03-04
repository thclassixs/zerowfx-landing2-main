import React from 'react';
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
import FloatingTelegram from './components/FloatingTelegram';
import FloatingLanguage from './components/FloatingLanguage';
import StickyCTABar from './components/StickyCTABar';
import SecondVidSec from './components/SecondVideoSection';

function App() {
  return (
    <LanguageProvider>
      <PriceProvider>
        <div className="App">
          <Navbar />
          <div className="navbar-spacer"></div>
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
          <FloatingTelegram />
          <FloatingLanguage />
          <StickyCTABar />
        </div>
      </PriceProvider>
    </LanguageProvider>
  );
}

export default App;
