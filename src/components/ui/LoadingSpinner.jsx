import React from "react";

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
    xl: "w-12 h-12 border-4",
  };

  const classes = `loading-spinner ${sizeClasses[size]} ${className}`;

  return <div className={classes}></div>;
};

export default LoadingSpinner;
