import { API_URL } from "./api";

/**
 * Generic API request helper.
 *
 * Features:
 * - Base URL
 * - Cookies included
 * - JSON parsing
 * - Error handling
 */
export const fetcher = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },

    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong.");
  }

  return data.data;
};
