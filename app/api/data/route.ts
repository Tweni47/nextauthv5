// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export const GET = auth(function GET(req) {
//   if (req.auth) return NextResponse.json(req.auth);
//   return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
// });

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const GET = auth(async function GET(req) {
  const headersList = await headers();
  const authorization = headersList.get("authorization");

  if (req.auth) {
    return NextResponse.json({
      ...req.auth,
      authorizationHeader: authorization,
    });
  }
  return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
});
