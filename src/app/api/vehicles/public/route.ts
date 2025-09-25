import { getAllVehicles } from "@/services/vehicle.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const vehicles = await getAllVehicles();
        return NextResponse.json({ vehicles }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}