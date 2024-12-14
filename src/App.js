import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
    Home,
    DollarSign,
    Settings,
    User
} from 'lucide-react';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import FinancesPage from './pages/FinancesPage';
import SettingsPage from './pages/SettingsPage';

// TopBar Component
const TopBar = ({ isSidebarOpen, toggleSidebar }) => {
    const [userProfile] = useState({
        name: "John Doe",
        avatar: "/default-avatar.png"
    });

    return (
        <header className="top-bar">
            <div className="top-bar-content">
                <div
                    className="sidebar-logo"
                    onClick={toggleSidebar}
                >
                    <img
                        src="/icon.png"
                        alt="Money Care Logo"
                        className="small-logo"
                    />
                    <span className="app-name">Money Care</span>
                </div>
                <div className="top-bar-actions">
                    <div className="user-profile-icon">
                        {userProfile?.avatar ? (
                            <img
                                src={userProfile.avatar}
                                alt="User Profile"
                                className="user-avatar"
                            />
                        ) : (
                            <User className="default-avatar" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

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
                    <TopBar
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />

                    {isSidebarOpen && (
                        <aside className="sidebar">
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
                    )}

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