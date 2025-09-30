import prisma from "@/lib/prisma";

export async function createVehicle(
  vehicleNo: string,
  licenseNo: string,
  vehicleType: string,
  vehicleModel: string,
  userId: number,
  idProof?: string | null,
  profilePhoto?: string | null,
) {
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        vehicleNo,
        licenseNo,
        vehicleType,
        vehicleModel,
        userId,
        idProof,
        profilePhoto,
      },
    });
    return vehicle;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getVehicles(userId: number) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "asc",
      },
      include: {
        user: true,
      },
    });
    return vehicles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        user:{
          select:{
            id:true,
            name:true,
          },
        },
      },
      
    });
    return vehicles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
