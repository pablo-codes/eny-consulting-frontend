import React from "react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import LeadCapture from "../ui/LeadCapture";

const MessageBubble = ({ message, onCTAClick }) => {
  const isUser = message.type === "user";
  const isAI = message.type === "ai";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3/4 rounded-lg p-4 ${
          isUser ? "message-user" : "message-ai"
        }`}
      >
        {/* Message Content */}
        {isAI ? (
          <ReactMarkdown
            components={{
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-gray-900" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="ml-4 list-disc" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`text-xs mt-2 ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {format(new Date(message.timestamp), "h:mm a")}
        </div>

        {/* Sources (AI only) */}
        {isAI && message.sources && message.sources.length > 0 && (
          <div className="mt-2 text-xs">
            <span className="font-medium">Sources:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {message.sources.slice(0, 2).map((source, index) => (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  {new URL(source).hostname}
                </a>
              ))}
              {message.sources.length > 2 && (
                <span className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-700">
                  +{message.sources.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA Button (AI only) */}
        {isAI && message.cta && (
          <LeadCapture cta={message.cta} onCTAClick={onCTAClick} />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
