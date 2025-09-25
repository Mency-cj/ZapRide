/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cancelRide, updateRideStatus } from "@/services/ride.service";
import jwt from "jsonwebtoken";

export async function DELETE(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer "))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const customerId = decoded.id;

  try {
    const { rideId } = await req.json();
    const ride = await cancelRide(rideId, customerId);
    return NextResponse.json({ ride }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if (decoded.role !== "DRIVER")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { status, rideId } = await req.json();
    const ride = await updateRideStatus(rideId, status);
    return NextResponse.json({ ride }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
