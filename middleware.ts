
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";



export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/rides")) {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
console.log("AUTH HEADER:", authHeader);


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const token = authHeader.split(" ")[1];
      console.log("TOKEN:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("user", JSON.stringify(decoded));

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
