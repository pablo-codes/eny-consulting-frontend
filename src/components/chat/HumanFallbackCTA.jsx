import React from "react";
import { FiUser } from "react-icons/fi";
import { trackLead } from "../../services/leadTrackingService";

const HumanFallbackCTA = ({ onConnectWithAgent }) => {
  const handleConnectClick = async () => {
    try {
      // Track the human fallback CTA click
      await trackLead({
        ctaType: "human_fallback",
        ctaUrl: "https://www.businessanalysisschool.com/contact_us",
      });

      // Notify parent component
      if (onConnectWithAgent) {
        onConnectWithAgent();
      }

      // Open Business Analysis School contact page in new tab
      window.open(
        "https://www.businessanalysisschool.com/contact_us",
        "_blank"
      );
    } catch (error) {
      console.error("Error handling human fallback:", error);
    }
  };

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <FiUser className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Need more help?</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Connect with a human support agent who can provide personalized
              assistance with your Business Analysis School questions.
            </p>
          </div>
          <div className="mt-4">
            <button onClick={handleConnectClick} className="human-fallback-cta">
              <FiUser className="mr-2" />
              Connect with a Support Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanFallbackCTA;
