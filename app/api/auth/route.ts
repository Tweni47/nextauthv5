import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    const loginUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, redirect to the protected page
  // const protectedUrl = new URL("/middleware", request.url);
  // return NextResponse.redirect(protectedUrl);

  return NextResponse.redirect(new URL("/", request.url));
}
