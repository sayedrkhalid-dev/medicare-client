import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Get current user
 */
export const getMe = async () => {
  return fetcher("/users/me");
};

/**
 * Get all users
 */
export const getAllUsers = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/users?${query}`);
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  return fetcher(`/users/${userId}`);
};

/**
 * Suspend user
 */
export const suspendUserById = async (userId) => {
  return fetcher(`/users/${userId}/suspend`, {
    method: "PATCH",
  });
};

/**
 * Activate user
 */
export const activateUserById = async (userId) => {
  return fetcher(`/users/${userId}/activate`, {
    method: "PATCH",
  });
};
