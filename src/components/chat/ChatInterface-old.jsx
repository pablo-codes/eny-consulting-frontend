import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import UserInput from "./UserInput";
import ConfidenceIndicator from "./ConfidenceIndicator";
import HumanFallbackCTA from "./HumanFallbackCTA";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI assistant for Business Analysis School. I can help you with questions about certifications like SAMC™, SDC®, SMC®, SPOC®, SSBB™, and LSSBB™, coaching programs, career guidance, and more. What would you like to know?",
      timestamp: new Date(),
      confidence: 0.9,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to backend
      // In real implementation, this would call your backend API
      const response = await simulateAIResponse(messageText);

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: response.content,
        timestamp: new Date(),
        confidence: response.confidence,
        cta: response.cta,
        sources: response.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError("Failed to get response. Please try again.");
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate AI response - replace with actual API call
  const simulateAIResponse = async (userMessage) => {
    // This is a simulation - replace with actual backend API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerMessage = userMessage.toLowerCase();
        let responseContent = "";
        let confidence = 0.8;
        let cta = null;
        let sources = [];

        if (
          lowerMessage.includes("samc") ||
          lowerMessage.includes("agile master")
        ) {
          responseContent =
            "The SCRUMstudy Agile Master Certified (SAMC™) exam costs $550. It consists of 100 multiple choice questions and has a duration of 120 minutes. The current pass rate is 93%.";
          confidence = 0.9;
          cta = {
            text: "Ready to get certified for $550? Schedule your SAMC™ exam today!",
            type: "samc_certification",
            url: "https://www.businessanalysisschool.com/scrumstudy-agile-master-certified",
          };
          sources = [
            "https://www.businessanalysisschool.com/scrumstudy-agile-master-certified",
          ];
        } else if (
          lowerMessage.includes("sdc") ||
          lowerMessage.includes("scrum developer")
        ) {
          responseContent =
            "The Scrum Developer Certified (SDC®) is an entry-level certification that costs $200. The exam has 75 questions and lasts 90 minutes with a 98% pass rate.";
          confidence = 0.9;
          cta = {
            text: "Start your Scrum journey! Get certified as a Scrum Developer (SDC®) for $200.",
            type: "sdc_certification",
            url: "https://www.businessanalysisschool.com/scrum-developer-certified",
          };
          sources = [
            "https://www.businessanalysisschool.com/scrum-developer-certified",
          ];
        } else if (
          lowerMessage.includes("job") &&
          lowerMessage.includes("six figure")
        ) {
          responseContent =
            "Join our free masterclass to learn how to land a 6-figure business analysis job! Discover the three secrets that helped thousands of students achieve their career goals.";
          confidence = 0.85;
          cta = {
            text: "Land your 6-figure job! Join our free masterclass.",
            type: "free_masterclass_job",
            url: "https://www.businessanalysisschool.com/land-your-business-analysis-job",
          };
          sources = [
            "https://www.businessanalysisschool.com/land-your-business-analysis-job",
          ];
        } else if (
          lowerMessage.includes("coaching") ||
          lowerMessage.includes("program")
        ) {
          responseContent =
            "We offer various coaching programs including Product Management Accelerator and Data Analytics Accelerator programs designed to help you advance your career.";
          confidence = 0.8;
          cta = {
            text: "Want personalized guidance? Explore our coaching programs!",
            type: "coaching_programs",
            url: "https://www.businessanalysisschool.com/coaching-programs",
          };
          sources = [
            "https://www.businessanalysisschool.com/coaching-programs",
          ];
        } else {
          responseContent =
            "I can help you with information about Business Analysis School certifications, coaching programs, and career guidance. What specific information are you looking for?";
          confidence = 0.7;
          cta = {
            text: "Explore our wide range of certifications and courses!",
            type: "all_certifications",
            url: "https://www.businessanalysisschool.com",
          };
        }

        resolve({
          content: responseContent,
          confidence: confidence,
          cta: cta,
          sources: sources,
        });
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Messages Container */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <MessageBubble
              message={message}
              onCTAClick={(ctaType) => console.log("CTA clicked:", ctaType)}
            />
            {message.type === "ai" && message.confidence && (
              <div className="mt-2">
                <ConfidenceIndicator confidence={message.confidence} />
              </div>
            )}
            {message.type === "ai" && message.confidence < 0.4 && (
              <HumanFallbackCTA
                onConnectWithAgent={() =>
                  console.log("Connecting with agent...")
                }
              />
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="message-ai max-w-3/4 rounded-lg p-4">
              <div className="flex items-center">
                <div className="loading-spinner mr-2"></div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center mb-4">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* User Input */}
      <div className="chat-input-container">
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
