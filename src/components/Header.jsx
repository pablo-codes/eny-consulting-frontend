import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section: Logo + Title */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shadow-sm">
                <img src={logo} alt="Logo" className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                  Business Analysis School
                </h1>
                <p className="text-xs text-gray-500">
                  AI Student Support Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Right section: Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Chat Support
                </Link>
              </li>
              <li>
                <Link
                  to="/health"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Chat Health
                </Link>
              </li>
              <li>
                <a
                  href="https://www.businessanalysisschool.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Visit Website
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
