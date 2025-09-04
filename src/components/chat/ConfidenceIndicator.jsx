import React from "react";

const ConfidenceIndicator = ({ confidence }) => {
  // Determine confidence level and label
  const getConfidenceLevel = () => {
    if (confidence >= 0.8)
      return {
        level: "high",
        label: "High Confidence",
        color: "confidence-high",
      };
    if (confidence >= 0.6)
      return {
        level: "medium",
        label: "Medium Confidence",
        color: "confidence-medium",
      };
    return { level: "low", label: "Low Confidence", color: "confidence-low" };
  };

  const { level, label, color } = getConfidenceLevel();

  // Get confidence percentage
  const percentage = Math.round(confidence * 100);

  return (
    <div className="flex items-center">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      >
        {label} ({percentage}%)
      </span>
      <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
        <div
          className={`bg-current h-2 rounded-full ${
            level === "high"
              ? "text-confidence-high"
              : level === "medium"
              ? "text-confidence-medium"
              : "text-confidence-low"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConfidenceIndicator;
