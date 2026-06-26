import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Create prescription
 */
export const createPrescription = async (payload) => {
  return fetcher("/prescriptions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Get my prescriptions
 */
export const getMyPrescriptions = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/prescriptions/me?${query}`);
};

/**
 * Get prescription by ID
 */
export const getPrescriptionById = async (prescriptionId) => {
  return fetcher(`/prescriptions/${prescriptionId}`);
};

/**
 * Update prescription
 */
export const updatePrescription = async (prescriptionId, payload) => {
  return fetcher(`/prescriptions/${prescriptionId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
