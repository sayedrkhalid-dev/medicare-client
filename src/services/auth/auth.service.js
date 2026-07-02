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

    callbackURL: "/",
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
    callbackURL: "/",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Logout user
 *
 * NOTE: better-auth's signOut does NOT auto-redirect via callbackURL the way
 * signIn/signUp do. Navigation must be triggered manually in onSuccess.
 */
export const logout = async () => {
  const { data, error } = await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/login";
      },
    },
  });

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
    callbackURL: "/",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
