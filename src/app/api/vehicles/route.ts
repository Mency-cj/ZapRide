import { createVehicle, getVehicles } from "@/services/vehicle.service";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
const saveFile = async (file: File | null, prefix: string) => {
  if (!file) return null;
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  const originalName = file.name || "upload.png";
  let ext = path.extname(originalName).toLowerCase();
  if (!ext) ext = ".png";
  const fileName = `${prefix}-${Date.now()}${ext}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${fileName}`;
};
export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.id;
    const body = await request.formData();
    const vehicleNo = body.get("vehicleNo")?.toString();
    const licenseNo = body.get("licenseNo")?.toString();
    const vehicleType = body.get("vehicleType")?.toString();
    const vehicleModel = body.get("vehicleModel")?.toString();
    const idProofFile = body.get("idProof") as File | null;
    const profilePhotoFile = body.get("profilePhoto") as File | null;
    if (
      !vehicleNo ||
      !licenseNo ||
      !vehicleType ||
      !vehicleModel ||
      !idProofFile ||
      !profilePhotoFile
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const idProofPath = await saveFile(idProofFile, "idProof");
    const profilePhotoPath = await saveFile(profilePhotoFile, "profilePhoto");
    const vehicle = await createVehicle(
      vehicleNo,
      licenseNo,
      vehicleType,
      vehicleModel,
      userId,
      idProofPath,
      profilePhotoPath
    );
    return NextResponse.json({ vehicle }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.id;
    const vehicles = await getVehicles(userId);
    return NextResponse.json({ vehicles }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
