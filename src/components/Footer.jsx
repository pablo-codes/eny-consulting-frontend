import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-800">
              Business Analysis School
            </span>
            . All rights reserved.
          </p>

          {/* Links */}
          <div className="flex space-x-6">
            <a
              href="https://www.businessanalysisschool.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.businessanalysisschool.com/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="https://www.businessanalysisschool.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-xs text-gray-500 tracking-wide">
            🚀 Powered by <span className="font-medium">AI Technology</span> |
            Helping you achieve your{" "}
            <span className="font-semibold text-blue-600">
              6-figure career goals
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
