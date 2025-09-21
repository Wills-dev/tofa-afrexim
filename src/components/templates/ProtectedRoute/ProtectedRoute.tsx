"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { AuthContext } from "@/contexts/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { hasRequiredRole } from "@/lib/helpers/auth";

import GlobalLoader from "@/components/atoms/GlobalLoader/GlobalLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string | string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute = ({
  children,
  requiredRoles,
  fallback,
}: ProtectedRouteProps) => {
  const { currentUser, userLoading, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (userLoading) return;

    if (!isAuthenticated) {
      router.push(ROUTES?.login);
      return;
    }

    if (requiredRoles && currentUser) {
      const roles = Array.isArray(requiredRoles)
        ? requiredRoles
        : [requiredRoles];
      const hasRequiredRole = roles.includes(currentUser.role);

      if (!hasRequiredRole) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [userLoading, isAuthenticated, currentUser, requiredRoles, router]);

  if (userLoading) {
    return fallback || <GlobalLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (
    requiredRoles &&
    currentUser &&
    !hasRequiredRole(currentUser.role, requiredRoles)
  ) {
    router.push("/unauthorized");
    return;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
