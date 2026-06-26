import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Create doctor schedule
 */
export const createSchedule = async (payload) => {
  return fetcher("/doctor-schedules", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Get logged-in doctor's schedules
 */
export const getMySchedules = async () => {
  return fetcher("/doctor-schedules/me");
};

/**
 * Get doctor schedules
 */
export const getSchedules = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/doctor-schedules?${query}`);
};

/**
 * Get schedule by ID
 */
export const getScheduleById = async (scheduleId) => {
  return fetcher(`/doctor-schedules/${scheduleId}`);
};

/**
 * Update doctor schedule
 */
export const updateSchedule = async (scheduleId, payload) => {
  return fetcher(`/doctor-schedules/${scheduleId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

/**
 * Delete doctor schedule
 */
export const deleteSchedule = async (scheduleId) => {
  return fetcher(`/doctor-schedules/${scheduleId}`, {
    method: "DELETE",
  });
};
