/* eslint-disable @typescript-eslint/no-explicit-any */
import { createVehicle, getVehicles } from "@/services/vehicle.service";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const saveFile = async (file: File | null, prefix: string) => {
  if (!file) return null;

  const originalName = file.name || "upload.png";
  let ext = path.extname(originalName).toLowerCase();
  if (!ext) ext = ".png";

  const fileName = `${prefix}-${Date.now()}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: `zapride/${fileName}` },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
    stream.end(buffer);
  });

  return result.secure_url;
};
export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    const formData = await request.formData();
    const vehicleNo = formData.get("vehicleNo")?.toString();
    const licenseNo = formData.get("licenseNo")?.toString();
    const vehicleType = formData.get("vehicleType")?.toString();
    const vehicleModel = formData.get("vehicleModel")?.toString();
    const idProofFile = formData.get("idProof") as File | null;
    const profilePhotoFile = formData.get("profilePhoto") as File | null;

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
    console.log("ID Proof uploaded:", idProofPath);
    const profilePhotoPath = await saveFile(profilePhotoFile, "profilePhoto");
    console.log("Profile Photo uploaded:", profilePhotoPath);

    const vehicle = await createVehicle(
      vehicleNo.toString(),
      licenseNo.toString(),
      vehicleType.toString(),
      vehicleModel.toString(),
      userId,
      idProofPath,
      profilePhotoPath
    );

    return NextResponse.json({ vehicle }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.id;
    const vehicles = await getVehicles(userId);
    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
