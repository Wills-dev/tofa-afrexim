"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { clearCookie, readAuthCookie } from "@/lib/helpers/cookieHelper";
import { UserRole } from "@/lib/types";
import { getCurrentUser } from "@/services/auth/api/getCurrentUser";
import GlobalLoader from "@/components/atoms/GlobalLoader/GlobalLoader";

export const AuthContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AuthState = ({ children }: Props) => {
  const sessionToken = readAuthCookie("sessionToken");

  const [currentUser, setCurrentUser] = useState<UserRole | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    try {
      setUserLoading(true);
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error: any) {
      console.log("error fetching user", error);
      clearCookie("sessionToken");
      setCurrentUser(null);
    } finally {
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionToken && !currentUser) {
      fetchUser();
    } else {
      setUserLoading(false);
    }
  }, [sessionToken, currentUser, fetchUser]);

  const refreshUser = useCallback(async () => {
    if (sessionToken) {
      await fetchUser();
    }
  }, [sessionToken, fetchUser]);

  const hasRole = (roles: string | string[]): boolean => {
    if (!currentUser) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(currentUser?.role);
  };

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      userLoading,
      refreshUser,
      hasRole,
      isAuthenticated: !!currentUser,
    }),
    [currentUser, userLoading, refreshUser, hasRole]
  );

  if (userLoading) {
    return <GlobalLoader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthState;
