import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import UserInput from "./UserInput";
import ConfidenceIndicator from "./ConfidenceIndicator";
import HumanFallbackCTA from "./HumanFallbackCTA";
import { sendChatMessage } from "../../services/chatService";
import {
  insertMessage,
  insertSession,
  getMessagesBySession,
  getSessions,
} from "../../services/indexDBService";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I’m your AI assistant for the Business Analysis School. I can help you with questions about our certifications, programs, career guidance, and more. What would you like to explore today?",
      timestamp: new Date().toISOString(),
      confidence: 0.9,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);

  // Initialize session
  useEffect(() => {
    const initializeSession = async () => {
      const sessions = await getSessions();

      if (sessions.success && sessions.data.length > 0) {
        // Reuse the most recent session
        const latest = sessions.data[sessions.data.length - 1];
        setSessionId(latest.id);
      } else {
        // Create a new one
        const newId = `session_${Date.now()}`;
        setSessionId(newId);
        await insertSession({
          id: newId,
          title: "Business Analysis School Chat",
          timestamp: new Date().toISOString(),
        });
        await insertMessage({
          ...messages[0],
          sessionId: newId,
        });
      }
    };
    initializeSession();
  }, []);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      const result = await getMessagesBySession(sessionId);

      if (result.success && result.data.length > 0) {
        setMessages(result.data);
      }
    };
    loadMessages();
  }, [sessionId]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
      sessionId: sessionId,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Save user message to IndexedDB

    try {
      // Call actual backend API
      const response = await sendChatMessage(messageText);

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: response.data.response,
        timestamp: new Date().toISOString(),
        confidence: response.data.confidence,
        cta: response.data.cta,
        sources: response.data.sources,
        sessionId: sessionId,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Save AI message to IndexedDB

      if (response.data.cta?.type !== "server_error") {
        await insertMessage(userMessage).catch((err) => {
          console.error("Failed to save user message to IndexedDB:", err);
        });
        await insertMessage(aiMessage).catch((err) => {
          console.error("Failed to save AI message to IndexedDB:", err);
        });
      }
    } catch (err) {
      setError("Failed to get response. Please try again.");
      console.error("Chat error:", err);

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 2,
        type: "ai",
        content:
          "Sorry, I'm having trouble connecting to the server. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        confidence: 0.1,
        sessionId: sessionId,
      };

      setMessages((prev) => [...prev, errorMessage]);
      await insertMessage(errorMessage).catch((err) => {
        console.error("Failed to save error message to IndexedDB:", err);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pl-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "ai" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="max-w-[80%] pt-4">
              <MessageBubble message={message} />

              {/* Confidence indicator (Test only) */}
              {/* {message.type === "ai" && message.confidence && (
                <div className="mt-1">
                  <ConfidenceIndicator confidence={message.confidence} />
                </div>
              )} */}

              {/* Human fallback CTA if low confidence */}
              {message.type === "ai" && message.confidence < 0.4 && (
                <div className="mt-2">
                  <HumanFallbackCTA />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm px-4 py-2">
              <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 text-sm">Thinking...</span>
            </div>
          </div>
        )}

        {/* Error alert */}
        {error && (
          <div className="flex justify-center">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-sm text-sm"
              role="alert"
            >
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* User Input */}
      <div className="border-t bg-white px-4 py-3">
        <UserInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
