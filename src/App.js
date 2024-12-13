import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // PWA Install Prompt Handling
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('App installed');
      } else {
        console.log('App install cancelled');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>RT Finance</h1>
        
        {/* Animated Logo Component */}
        <div className="logo-container">
          <div className="logo-text">RT Finance</div>
        </div>
        
        {/* Install PWA Button */}
        {isInstallable && (
          <button onClick={handleInstallClick} className="install-btn">
            Install App
          </button>
        )}
        
        {/* Main App Content */}
        <div className="app-content">
          <section className="finance-dashboard">
            <h2>Financial Overview</h2>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Balance</h3>
                <p>$24,500.75</p>
              </div>
              <div className="dashboard-card">
                <h3>Investments</h3>
                <p>+3.2% Today</p>
              </div>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}

export default App;