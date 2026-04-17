import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/login", "/"];

  // Check if route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes - redirect to login
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
