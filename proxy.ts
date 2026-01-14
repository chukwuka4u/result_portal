import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/" ];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get JWT token
  const token = await getToken({ req: request });

  // If route is protected and user not logged in 
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

// If logged in, redirect based on role
  if (token) {
    if (token.role === "admin" && pathname === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token.role === "teacher" && pathname === "/") {
      return NextResponse.redirect(new URL("/teacher", request.url));
    }
    if (token.role === "student" && pathname === "/") {
      return NextResponse.redirect(new URL("/student", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|auth|_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
