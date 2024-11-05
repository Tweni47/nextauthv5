// export { auth as middleware } from "@/auth";

// import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/middleware"];

export default async function Middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Instead of checking the session here, we'll redirect to an API route that will handle authentication
  if (isProtected) {
    const authUrl = new URL("/api/auth", request.url);
    return NextResponse.redirect(authUrl);
  }

  // If the route is not protected or the user is authenticated, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "experimental-edge",
};
