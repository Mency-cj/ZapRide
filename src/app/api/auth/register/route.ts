import { createUser } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, role } = await req.json();
    if (!name || !email || !password || !phone || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const user = await createUser(name, email, password, phone, role);
    return NextResponse.json({ ...user }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
