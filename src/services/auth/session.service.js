import { authClient } from "@/lib/auth-client";

/**
 * Get current session
 */
export const getSession = async () => {
  const { data, error } = await authClient.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async () => {
  const session = await getSession();

  return session?.user ?? null;
};

/**
 * Check whether user is authenticated
 */
export const isAuthenticated = async () => {
  const session = await getSession();

  return !!session;
};
