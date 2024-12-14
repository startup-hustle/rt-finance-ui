import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Home,
  DollarSign,
  Settings
} from 'lucide-react';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import FinancesPage from './pages/FinancesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(splashTimer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
              <div
                  className="sidebar-logo"
                  onClick={toggleSidebar}
                  style={{ cursor: 'pointer' }}
              >
                <img
                    src="/icon.png"
                    alt="Money Care Logo"
                    className="small-logo"
                />
                {isSidebarOpen && <span className="app-name">Money Care</span>}
              </div>
              <nav>
                <ul>
                  <li>
                    <Link to="/" onClick={isSidebarOpen ? undefined : toggleSidebar}>
                      <Home className="sidebar-icon" />
                      {isSidebarOpen && <span>Home</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/finances" onClick={isSidebarOpen ? undefined : toggleSidebar}>
                      <DollarSign className="sidebar-icon" />
                      {isSidebarOpen && <span>Finances</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" onClick={isSidebarOpen ? undefined : toggleSidebar}>
                      <Settings className="sidebar-icon" />
                      {isSidebarOpen && <span>Settings</span>}
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
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