import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Submit doctor application
 */
export const createApplication = async (payload) => {
  return fetcher("/doctor-applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Get logged-in user's applications
 */
export const getMyApplications = async () => {
  return fetcher("/doctor-applications/me");
};

/**
 * Get all doctor applications
 */
export const getAllApplications = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/doctor-applications?${query}`);
};

/**
 * Get application by ID
 */
export const getApplicationById = async (applicationId) => {
  return fetcher(`/doctor-applications/${applicationId}`);
};

/**
 * Approve application
 */
export const approveApplication = async (applicationId) => {
  return fetcher(`/doctor-applications/${applicationId}/approve`, {
    method: "PATCH",
  });
};

/**
 * Reject application
 */
export const rejectApplication = async (applicationId, rejectionReason) => {
  return fetcher(`/doctor-applications/${applicationId}/reject`, {
    method: "PATCH",
    body: JSON.stringify({
      rejectionReason,
    }),
  });
};

/**
 * Resubmit application
 */
export const resubmitApplication = async (applicationId, payload) => {
  return fetcher(`/doctor-applications/${applicationId}/resubmit`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
