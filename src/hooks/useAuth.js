"use client";

import { useEffect, useState } from "react";
import {
  getCurrentUser,
  isAuthenticated,
} from "@/services/auth/session.service";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);

        setAuthenticated(await isAuthenticated());
      } catch {
        setUser(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    user,
    authenticated,
    loading,
  };
};
