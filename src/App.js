import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, DollarSign, Settings } from 'lucide-react';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import FinancesPage from './pages/FinancesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // Extend time for video logo

    return () => clearTimeout(splashTimer);
  }, []);

  return (
      <Router>
        <div className="app-container">
          {showSplash && (
              <div className="splash-screen">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="logo-video"
                    onEnded={() => setShowSplash(false)}
                >
                  <source src="/logo-animation.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
          )}

          <div className="main-layout">
            <aside className="sidebar">
              <div className="sidebar-logo">
                <img
                    src="/logo-small.png"
                    alt="Money Care Logo"
                    className="small-logo"
                />
                <span className="app-name">Money Care</span>
              </div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">
                      <Home className="sidebar-icon" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/finances">
                      <DollarSign className="sidebar-icon" />
                      <span>Finances</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">
                      <Settings className="sidebar-icon" />
                      <span>Settings</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/finances" element={<FinancesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
  );
}

export default App;