import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, Settings, Receipt } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/" className="flex items-center">
                <Home className="w-6 h-6" />
                <span className="ml-2">Home</span>
              </Link>
              <Link to="/expenses" className="flex items-center">
                <Receipt className="w-6 h-6" />
                <span className="ml-2">Expenses</span>
              </Link>
              <Link to="/settings" className="flex items-center">
                <Settings className="w-6 h-6" />
                <span className="ml-2">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}