import { NextResponse } from "next/server";
import { cancelRide } from "@/services/ride.service";
import jwt from "jsonwebtoken";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const rideId = parseInt(params.id, 10);
  if (isNaN(rideId))
    return NextResponse.json({ error: "Invalid ride ID" }, { status: 400 });

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer "))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const customerId = decoded.id;

  try {
    const ride = await cancelRide(rideId, customerId);
    return NextResponse.json({ ride }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
