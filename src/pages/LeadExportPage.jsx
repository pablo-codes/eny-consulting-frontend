import React, { useState } from "react";
import { exportLeadsToCSV } from "../services/leadTrackingService";

const LeadExportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState(null);

  const handleExportClick = async () => {
    setIsLoading(true);
    setError(null);
    setDownloadUrl("");

    try {
      const response = await exportLeadsToCSV();

      if (response.data?.url) {
        setDownloadUrl(response.data.url);
      } else {
        setError("CSV could not be generated.");
      }
    } catch (err) {
      console.error("Error exporting CSV:", err);
      setError("Failed to export CSV. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Export Leads to CSV</h1>
      <p className="mb-6 text-gray-600">
        Click the button below to generate and download the latest leads CSV
        file.
      </p>

      <button
        onClick={handleExportClick}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-primary-dark"
        }`}
      >
        {isLoading ? "Generating CSV..." : "Export CSV"}
      </button>

      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            Download CSV
          </a>
        </div>
      )}

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
    </div>
  );
};

export default LeadExportPage;
