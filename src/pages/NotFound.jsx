import React from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import { FaHome, FaSearch, FaRobot } from "react-icons/fa";

const NotFound = () => {
  return (
    <Main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
        <div className="text-center max-w-2xl">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary bg-opacity-10 mb-6">
              <FaSearch className="text-5xl text-primary" />
            </div>
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Page Not Found
            </h2>
          </div>

          {/* Message */}
          <p className="text-gray-600 text-lg mb-8">
            Sorry, we couldn't find the page you're looking for. It might have
            been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Business Context Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaRobot className="text-2xl text-primary mr-2" />
              <h3 className="text-xl font-semibold text-primary">
                Need Help with Business Analysis?
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              Our AI assistant can help you with questions about:
            </p>
            <ul className="text-left text-gray-700 mb-4 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>SAMC™ certification</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>SDC® certification ($200, 75 questions, 90 minutes)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Coaching programs and career guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>"Land your 6-figure job" masterclass</span>
              </li>
            </ul>
          </div>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              <FaHome className="mr-2" />
              Back to Chat
            </Link>

            <a
              href="https://www.businessanalysisschool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              Visit Main Site
            </a>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-gray-500 text-sm">
            <p>
              If you believe this is an error, please{" "}
              <a
                href="https://www.businessanalysisschool.com/contact_us"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                contact our support team
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default NotFound;
