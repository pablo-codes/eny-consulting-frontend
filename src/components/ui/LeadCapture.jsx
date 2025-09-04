import React from "react";
import Button from "../ui/Button";
import { trackLead } from "../../services/leadTrackingService";

const LeadCapture = ({ cta, onCTAClick }) => {
  if (!cta) return null;

  const handleCTAClick = async () => {
    try {
      // Track the CTA click with the backend
      await trackLead({ ctaType: cta.type, ctaUrl: cta.url });

      // Open the URL in a new tab
      window.open(cta.url, "_blank");

      // Notify parent component
      if (onCTAClick) {
        onCTAClick(cta.type);
      }
    } catch (error) {
      console.error("Error handling CTA click:", error);
    }
  };

  // Determine button variant based on CTA type
  const getButtonVariant = () => {
    if (cta.type.includes("certification")) return "certification";
    if (cta.type.includes("masterclass")) return "masterclass";
    if (cta.type.includes("coaching")) return "coaching";
    if (cta.type.includes("support")) return "support";
    if (cta.type.includes("free")) return "free";
    return "ghost"; // fallback
  };

  return (
    <div className="mt-3">
      <Button
        onClick={handleCTAClick}
        variant={getButtonVariant()}
        className="w-full sm:w-auto"
      >
        {cta.text}
      </Button>
    </div>
  );
};

export default LeadCapture;
