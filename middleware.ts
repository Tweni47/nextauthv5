// export { auth as middleware } from "@/auth";

// import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/middleware"];
const authRoute = "/api/auth";
const loginRoute = "/sign-in";

export default async function Middleware(request: NextRequest) {
  const session = await auth();
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if the current route is the auth route to prevent loops
  const isAuthRoute = request.nextUrl.pathname === authRoute;

  // If the route is protected and the user is not authenticated, redirect to the login page
  if (isProtected && !session) {
    const loginUrl = new URL(loginRoute, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the route is the auth route and the user is authenticated, redirect to the home page
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the route is not protected or the user is authenticated, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
