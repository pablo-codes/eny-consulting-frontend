import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaServer,
  FaDatabase,
  FaRobot,
} from "react-icons/fa";
import { checkChatHealth } from "../services/chatService";
import { checkLeadTrackingHealth } from "../services/leadTrackingService";

const Health = () => {
  const [chatHealth, setChatHealth] = useState({
    status: "loading",
    message: "",
  });
  const [leadHealth, setLeadHealth] = useState({
    status: "loading",
    message: "",
  });
  const [lastChecked, setLastChecked] = useState(null);

  const checkHealth = async () => {
    setLastChecked(new Date());

    // Check chat service health
    try {
      const chatResponse = await checkChatHealth();
      setChatHealth({
        status: chatResponse.data.status === "OK" ? "healthy" : "unhealthy",
        message: chatResponse.data.message || "Chat service is operational",
        timestamp: chatResponse.data.timestamp,
      });
    } catch (error) {
      setChatHealth({
        status: "unhealthy",
        message: error.message || "Chat service is unavailable",
        timestamp: new Date().toISOString(),
      });
    }

    // Check lead tracking service health
    try {
      const leadResponse = await checkLeadTrackingHealth();

      setLeadHealth({
        status: leadResponse.data.status === "OK" ? "healthy" : "unhealthy",
        message:
          leadResponse.data.message || "Lead tracking service is operational",
        timestamp: leadResponse.data.timestamp,
      });
    } catch (error) {
      setLeadHealth({
        status: "unhealthy",
        message: error.message || "Lead tracking service unavailable",
        timestamp: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    checkHealth();

    // Auto-refresh every 60 seconds
    const interval = setInterval(checkHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <FaCheckCircle className="text-green-500 animate-pulse" />;
      case "unhealthy":
        return <FaTimesCircle className="text-red-500 animate-pulse" />;
      case "loading":
      default:
        return <FaSpinner className="text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 border-green-500";
      case "unhealthy":
        return "bg-red-100 border-red-500";
      case "loading":
      default:
        return "bg-blue-100 border-blue-500";
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Main>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">
            System Health Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor the status of all Business Analysis School services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Chat Service Health */}
          <div
            className={`rounded-lg border-l-4 p-6 transition-all duration-300 transform hover:scale-105 ${getStatusColor(
              chatHealth.status
            )}`}
          >
            <div className="flex items-center mb-4">
              <FaRobot className="text-2xl mr-3 text-primary" />
              <h2 className="text-xl font-semibold">AI Chat Service</h2>
              <div className="ml-auto">{getStatusIcon(chatHealth.status)}</div>
            </div>
            <p className="text-gray-700 mb-2">{chatHealth.message}</p>
            <div className="text-sm text-gray-500">
              Last checked: {formatTime(chatHealth.timestamp)}
            </div>
          </div>

          {/* Lead Tracking Health */}
          <div
            className={`rounded-lg border-l-4 p-6 transition-all duration-300 transform hover:scale-105 ${getStatusColor(
              leadHealth.status
            )}`}
          >
            <div className="flex items-center mb-4">
              <FaDatabase className="text-2xl mr-3 text-primary" />
              <h2 className="text-xl font-semibold">Lead Tracking Service</h2>
              <div className="ml-auto">{getStatusIcon(leadHealth.status)}</div>
            </div>
            <p className="text-gray-700 mb-2">{leadHealth.message}</p>
            <div className="text-sm text-gray-500">
              Last checked: {formatTime(leadHealth.timestamp)}
            </div>
          </div>
        </div>

        {/* Overall System Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaServer className="text-2xl mr-3 text-primary" />
              <h2 className="text-xl font-semibold">Overall System Status</h2>
            </div>
            <div className="flex items-center">
              {chatHealth.status === "healthy" &&
              leadHealth.status === "healthy" ? (
                <>
                  {getStatusIcon("healthy")}
                  <span className="ml-2 text-green-600 font-medium">
                    All Systems Operational
                  </span>
                </>
              ) : (
                <>
                  {getStatusIcon("unhealthy")}
                  <span className="ml-2 text-red-600 font-medium">
                    Degraded Service
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center">
          <button
            onClick={checkHealth}
            disabled={
              chatHealth.status === "loading" || leadHealth.status === "loading"
            }
            className="flex items-center justify-center mx-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {chatHealth.status === "loading" ||
            leadHealth.status === "loading" ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Checking Status...
              </>
            ) : (
              "Refresh Health Check"
            )}
          </button>
          {lastChecked && (
            <p className="text-gray-500 text-sm mt-2">
              Last updated: {lastChecked.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Service Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">AI Chat Service</h3>
            <p className="text-sm text-gray-700">
              Powers the Business Analysis School AI assistant for questions
              about certifications, programs, career guidance, and more.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">Lead Tracking</h3>
            <p className="text-sm text-gray-700">
              Tracks CTA clicks and user interactions to help convert prospects
              into students for coaching programs and certification courses.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">Data Storage</h3>
            <p className="text-sm text-gray-700">
              Secure storage of chat history and lead data using IndexedDB for
              local persistence and MongoDB Atlas for backend storage.
            </p>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Health;
