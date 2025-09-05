import api from "./api";

export const trackLead = async (leadData) => {
  return api.post("/track/lead", leadData);
};

export const exportLeadsToCSV = async () => {
  return api.get("/track/export-csv", { responseType: "blob" });
};

export const checkLeadTrackingHealth = async () => {
  return api.get("/track/health");
};
