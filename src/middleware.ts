import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { hasRoleAccess, isPublicRoute, requiresAuth } from "@/lib/helpers/auth";
import { ROUTES } from "./lib/constants/routes";

interface DecodedToken {
  id: string;
  email: string;
  role?: "admin" | "superadmin" | "user" | "supervisor";
  iat: number;
  exp: number;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("sessionToken")?.value;

  if (!token && requiresAuth(pathname)) {
    return NextResponse.redirect(new URL(ROUTES?.login, request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // Check expiration
      if (decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(
          new URL(ROUTES?.login, request.url)
        );
        response.cookies.delete("sessionToken");
        return response;
      }

      if (!decoded.role) {
        const response = NextResponse.redirect(
          new URL(ROUTES?.login, request.url)
        );
        response.cookies.delete("sessionToken");
        return response;
      }

      if (!hasRoleAccess(pathname, decoded.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      const response = NextResponse.next();
      response.headers.set("x-user-role", decoded.role);
      response.headers.set("x-user-id", decoded.id);
      return response;
    } catch (error) {
      console.log("Invalid token, redirecting to login");
      const response = NextResponse.redirect(
        new URL(ROUTES?.login, request.url)
      );
      response.cookies.delete("sessionToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
