import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/library", "/founders", "/reader"];

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("_ms-mid")?.value;

  const isProtected = PROTECTED_ROUTES.some((route) => path === route || path.startsWith(`${route}/`));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/library/:path*", "/founders/:path*", "/reader/:path*"],
};
