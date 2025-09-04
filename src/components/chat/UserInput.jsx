import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiLoader } from "react-icons/fi";

const UserInput = ({ onSendMessage, isLoading, disabled }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [message]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end space-x-3 bg-white border border-gray-200 rounded-2xl shadow-sm p-2"
    >
      {/* Textarea */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question about Business Analysis School certifications, programs, or career guidance..."
          disabled={disabled}
          rows="1"
          className="w-full resize-none rounded-xl px-4 py-3 pr-16 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-gray-300"
        />

        {/* Hint */}
        <div className="absolute right-4 bottom-2 text-[10px] text-gray-400">
          Press Enter ↵
        </div>
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={isLoading || disabled || !message.trim()}
        className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
          isLoading || disabled || !message.trim()
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
        }`}
      >
        {isLoading ? (
          <FiLoader className="animate-spin w-5 h-5" />
        ) : (
          <FiSend className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default UserInput;
