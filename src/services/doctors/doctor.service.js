import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Get all doctors
 */
export const getDoctors = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/doctors?${query}`);
};

/**
 * Get doctor by ID
 */
export const getDoctorById = async (doctorId) => {
  return fetcher(`/doctors/${doctorId}`);
};

/**
 * Get logged-in doctor's profile
 */
export const getMyDoctorProfile = async () => {
  return fetcher("/doctors/me/profile");
};

/**
 * Suspend doctor
 */
export const suspendDoctor = async (doctorId) => {
  return fetcher(`/doctors/${doctorId}/suspend`, {
    method: "PATCH",
  });
};

/**
 * Activate doctor
 */
export const activateDoctor = async (doctorId) => {
  return fetcher(`/doctors/${doctorId}/activate`, {
    method: "PATCH",
  });
};
