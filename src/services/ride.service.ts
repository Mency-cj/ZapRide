import {  RideStatus } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function createRide(
  pickupLocation: string,
  dropLocation: string,
  pickupTime: string,
  customerId: number,
  driverId: number,
  vehicleId: number
) {
  try {
    const ride = await prisma.ride.create({
      data: {
        pickupLocation,
        dropLocation,
        pickupTime: pickupTime ? new Date(pickupTime) : null,
        driverId,
        vehicleId,
        customerId,
      },
      include: {
        vehicle: true,
        customer: true,
      },
    });
    return ride;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getRidesByCustomerId(customerId: number) {
  try {
    const rides = await prisma.ride.findMany({
      where: { customerId },
      include: {
        vehicle: {
          select: {
            vehicleType: true,
            vehicleNo: true,
            profilePhoto: true,
          },
        },
      },
      orderBy: { pickupTime: "desc" },
    });
    return rides;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getRidesByDriverId(driverId: number) {
  try {
    const rides = await prisma.ride.findMany({
      where: { driverId },
      include: {
        vehicle: {
          select: {
            vehicleType: true,
            vehicleNo: true,
            profilePhoto: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
      orderBy: { pickupTime: "desc" },
    });
    return rides;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function cancelRide(rideId: number, customerId: number) {
  const ride = await prisma.ride.findUnique({ where: { id: rideId } });

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.customerId !== customerId) {
    throw new Error("You cannot cancel this ride");
  }

  const cancelledRide = await prisma.ride.update({
    where: { id: rideId },
    data: { status: "CANCELLED" },
  });

  return cancelledRide;
}

export async function updateRideStatus(rideId: number, status: RideStatus) {
  try {
    const ride = await prisma.ride.update({
      where: { id: rideId },
      data: { status },
      include: {
        vehicle: true,
        customer: true,
        driver: true,
      },
    });
    return ride;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
