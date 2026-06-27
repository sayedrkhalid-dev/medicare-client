"use client";

import { useEffect, useState } from "react";

import { getMe } from "@/services/users/user.service";

export const useUser = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const result = await getMe();

      setUser(result.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user,
    loading,
    refresh: loadUser,
  };
};
