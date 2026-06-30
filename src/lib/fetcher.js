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

  let result = null;

  try {
    result = await response.json();
  } catch {
    result = null;
  }

  console.log("Response : ", response);
  console.log("Result : ", result);

  if (!response.ok) {
    const error = new Error(result?.message || "Something went wrong.");
    error.status = response.status;
    error.data = result;
    throw error;
  }

  return result;
};
