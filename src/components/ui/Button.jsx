import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const variantClasses = {
    certification:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    masterclass:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    coaching:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    support:
      "bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-400",
    free: "bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500",
    ghost: "bg-blue-500 hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const disabledClasses =
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="loading-spinner mr-2"></div>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
