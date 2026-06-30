import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Get available appointment slots
 */
export const getAvailableSlots = async (params) => {
  const query = buildQuery(params);

  return fetcher(`/appointments/available-slots?${query}`);
};

/**
 * Create appointment
 */
export const createAppointment = async (payload) => {
  return fetcher("/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Get doctor appointments
 */
export const getDoctorAppointments = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/appointments/doctor-appointments?${query}`);
};

/**
 * Get patient appointments
 */
export const getPatientAppointments = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/appointments/patient-appointments?${query}`);
};

/**
 * Get all appointments (admin)
 */
export const getAllAppointments = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/appointments/all?${query}`);
};

/**
 * Get appointment by ID
 */
export const getAppointmentById = async (appointmentId) => {
  return fetcher(`/appointments/${appointmentId}`);
};

/**
 * Cancel appointment
 */
export const cancelAppointment = async (appointmentId) => {
  return fetcher(`/appointments/${appointmentId}/cancel`, {
    method: "PATCH",
  });
};
