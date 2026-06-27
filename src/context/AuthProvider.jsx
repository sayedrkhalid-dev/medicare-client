"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import AuthContext from "./AuthContext";

import { getSession, signOut } from "@/services/auth/auth.service";

/**
 * Auth Provider
 *
 * Responsibilities:
 * - Store authenticated user
 * - Store current session
 * - Global loading state
 * - Refresh session
 * - Logout
 */
const AuthProvider = ({ children }) => {
  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [user, setUser] = useState(null);

  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Refresh Session
  |--------------------------------------------------------------------------
  */

  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getSession();

      setUser(result?.user ?? null);

      setSession(result?.session ?? null);
    } catch (error) {
      console.error(error);

      setUser(null);

      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const logout = async () => {
    await signOut();

    setUser(null);

    setSession(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Load Session
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const refresh = () => refreshSession();

    refresh();
  }, [refreshSession]);

  /*
  |--------------------------------------------------------------------------
  | Context Value
  |--------------------------------------------------------------------------
  */

  const value = useMemo(
    () => ({
      user,

      session,

      loading,

      authenticated: !!user,

      refreshSession,

      logout,

      setUser,

      setSession,
    }),
    [user, session, loading, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
