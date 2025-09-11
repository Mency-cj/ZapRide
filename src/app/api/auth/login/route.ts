import { loginUser } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const {email,password}=await req.json();
        if (!email || !password) {
              return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
              );
            }
            const user = await loginUser(email, password);
           return NextResponse.json(
      { message: user.message, role: user.role ,token:user.token},
      { status: 200 }
    );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}