import React from 'react';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';

function HomePage() {
    return (
        <div className="page home-page">
            <h1>Welcome to Money Care</h1>
            <div className="quick-stats">
                <div className="stat-card">
                    <DollarSign className="stat-icon" />
                    <div>
                        <h3>Total Balance</h3>
                        <p>$45,678.90</p>
                    </div>
                </div>
                <div className="stat-card">
                    <TrendingUp className="stat-icon" />
                    <div>
                        <h3>Monthly Savings</h3>
                        <p>$2,345.67</p>
                    </div>
                </div>
                <div className="stat-card">
                    <Wallet className="stat-icon" />
                    <div>
                        <h3>Investments</h3>
                        <p>$12,345.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;