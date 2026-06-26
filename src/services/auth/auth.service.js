import { authClient } from "@/lib/auth-client";

/**
 * Register a new user
 */
export const register = async (payload) => {
  const { data, error } = await authClient.signUp.email({
    name: payload.name,
    email: payload.email,
    password: payload.password,

    role: payload.role,
    gender: payload.gender,
    phone: payload.phone,
    address: payload.address,
    dateOfBirth: payload.dateOfBirth,
    bloodGroup: payload.bloodGroup,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Login user
 */
export const login = async (payload) => {
  const { data, error } = await authClient.signIn.email({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Logout user
 */
export const logout = async () => {
  const { data, error } = await authClient.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Continue with Google
 */
export const loginWithGoogle = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
