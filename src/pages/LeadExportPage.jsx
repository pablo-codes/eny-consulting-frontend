import React, { useState } from "react";
import { exportLeadsToCSV } from "../services/leadTrackingService";

const LeadExportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExportClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await exportLeadsToCSV();
      // Make sure your service sets { responseType: "blob" } in axios

      // Create object URL from blob
      const url = window.URL.createObjectURL(response.data);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `lead_data_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
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

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
    </div>
  );
};

export default LeadExportPage;
