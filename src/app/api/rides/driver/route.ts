/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRidesByDriverId } from "@/services/ride.service";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    console.log("Token:",token);
    console.log("Req.Headers:",req.headers)
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const driverId = decoded.id;
    const rides = await getRidesByDriverId(driverId);
    return NextResponse.json({ rides });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
