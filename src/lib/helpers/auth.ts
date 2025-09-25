export const AUTH_CONFIG = {
  public: [
    "/",
    "/auth/signup",
    "/auth/login",
    "/auth/verify",
    "/set-password",
    "/unauthorized",
    "/not-found",
  ],
  protected: [
    "/onboard",
    "/onboard/edit/[id]",
    "/dashboard/settings",
    "/dashboard/profile",
  ],
  superadmin: ["/dashboard/admin/register"],
  admin: [
    "/dashboard/admin/overview",
    "/dashboard/admin/companies",
    "/dashboard/admin/companies/[id]",
    "/dashboard/admin/users",
    "/dashboard/admin/users/[id]",
    "/dashboard/admin/supervisors",
    "/dashboard/admin/supervisors/[id]",
  ],
  supervisor: [
    "/dashboard/supervisor/overview",
    "/dashboard/supervisor/companies",
    "/dashboard/supervisor/companies/[id]",
    "/dashboard/supervisor/users",
    "/dashboard/supervisor/users/[id]",
  ],
  user: [
    "/dashboard/overview",
    "/dashboard/companies",
    "/dashboard/companies/[id]",
  ],
} as const;

export function isPublicRoute(pathname: string): boolean {
  return AUTH_CONFIG.public.some((route) => {
    // Handle exact match for root path
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });
}

export function requiresAuth(pathname: string): boolean {
  return (
    AUTH_CONFIG.protected.some((route) => pathname.startsWith(route)) ||
    AUTH_CONFIG.admin.some((route) => pathname.startsWith(route)) ||
    AUTH_CONFIG.superadmin.some((route) => pathname.startsWith(route)) ||
    AUTH_CONFIG.user.some((route) => pathname.startsWith(route))
  );
}

export function hasRoleAccess(pathname: string, userRole: string): boolean {
  // Check user-only routes
  const isUserRoute = AUTH_CONFIG.user.some((route) =>
    pathname.startsWith(route)
  );
  if (isUserRoute) {
    const hasAccess = userRole === "user";

    return hasAccess;
  }

  // Check super routes (superadmin + admin can access)
  const isSupervisorRoute = AUTH_CONFIG.supervisor.some((route) =>
    pathname.startsWith(route)
  );
  if (isSupervisorRoute) {
    const hasAccess = userRole === "supervisor";
    return hasAccess;
  }

  // Check superadmin-only
  const isSuperAdminRoute = AUTH_CONFIG.superadmin.some((route) =>
    pathname.startsWith(route)
  );
  if (isSuperAdminRoute) {
    const hasAccess = userRole === "superadmin";
    return hasAccess;
  }

  // Check admin routes (superadmin + admin can access)
  const isAdminRoute = AUTH_CONFIG.admin.some((route) =>
    pathname.startsWith(route)
  );
  if (isAdminRoute) {
    const hasAccess = ["superadmin", "admin"].includes(userRole);
    return hasAccess;
  }

  // Protected routes (any authenticated user can access)
  const isProtectedRoute = AUTH_CONFIG.protected.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtectedRoute) {
    return true;
  }

  return false;
}

export function hasRequiredRole(
  userRole: string,
  requiredRoles: string | string[]
): boolean {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.includes(userRole);
}
