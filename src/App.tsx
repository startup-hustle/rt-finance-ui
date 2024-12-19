import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, DollarSign, Settings, User } from 'lucide-react';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import FinancesPage from './pages/FinancesPage';
import SettingsPage from './pages/SettingsPage';

// Types
interface UserProfile {
    name: string;
    avatar: string | null;
}

interface MenuItem {
    path: string;
    icon: React.ElementType;
    label: string;
}

interface TopBarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

interface SidebarProps {
    isSidebarOpen: boolean;
}

// TopBar Component
const TopBar: React.FC<TopBarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const [userProfile] = useState<UserProfile>({
        name: "John Doe",
        avatar: "/default-avatar.png",
    });

    return (
        <header className="top-bar">
            <div className="top-bar-content">
                <div className="logo-container">
                    <img
                        src="/icon.png"
                        alt="App Logo"
                        className="small-logo"
                        onClick={toggleSidebar}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                toggleSidebar();
                            }
                        }}
                    />
                    <span className="app-name">Money Care</span>
                </div>

                <div className="user-profile">
                    {userProfile.avatar ? (
                        <img
                            src={userProfile.avatar}
                            alt={userProfile.name}
                            className="user-avatar"
                        />
                    ) : (
                        <User className="w-6 h-6 text-gray-200" />
                    )}
                </div>
            </div>
        </header>
    );
};

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
    const menuItems: MenuItem[] = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/finances", icon: DollarSign, label: "Finances" },
        { path: "/settings", icon: Settings, label: "Settings" }
    ];

    if (!isSidebarOpen) return null;

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link to={item.path} className="nav-link">
                                <item.icon className="icon" />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

// Splash Screen Component
const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <div className="splash-screen">
            <video
                autoPlay
                muted
                playsInline
                className="logo-video"
                onEnded={onComplete}
            >
                <source src="/logo-animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

// Main App Component
const App: React.FC = () => {
    const [showSplash, setShowSplash] = useState<boolean>(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    useEffect(() => {
        // Fallback timer for splash screen
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
            setIsDarkTheme(true); // Enable dark theme after splash screen
        }, 5000);

        // Cleanup
        return () => clearTimeout(splashTimer);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle video completion
    const handleSplashComplete = () => {
        setShowSplash(false);
        setIsDarkTheme(true); // Enable dark theme after splash screen
    };

    // Main content class based on sidebar state
    const mainContentClass = `main-content ${
        isSidebarOpen ? '' : 'sidebar-closed'
    }`;

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} />;
    }

    return (
        <Router>
            <div className="app-container">
                <div className="main-layout">
                    <TopBar
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />

                    <Sidebar isSidebarOpen={isSidebarOpen} />

                    <main className={mainContentClass}>
                        <div className="content-wrapper">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/finances" element={<FinancesPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;