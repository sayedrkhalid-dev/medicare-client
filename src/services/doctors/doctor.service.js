// services/doctors/doctor.service.js
import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Get all doctors
 */
export const getAllDoctors = async (params = {}) => {
  const query = buildQuery(params);
  const response = await fetcher(`/doctors/all?${query}`);
  return response;
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
export const suspendDoctorById = async (doctorId) => {
  return fetcher(`/doctors/${doctorId}/suspend`, {
    method: "PATCH",
  });
};

/**
 * Activate doctor
 */
export const activateDoctorById = async (doctorId) => {
  return fetcher(`/doctors/${doctorId}/activate`, {
    method: "PATCH",
  });
};
