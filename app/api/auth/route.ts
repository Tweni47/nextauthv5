import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If authenticated, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}
