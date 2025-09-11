import prisma from "@/lib/prisma";

export async function createRide(
  pickupLocation: string,
  dropLocation: string,
  pickupTime: string,
  customerId: number
) {
  try {
    const ride = await prisma.ride.create({
      data: {
        pickupLocation,
        dropLocation,
        pickupTime: pickupTime ? new Date(pickupTime) : null,
        customer: {
          connect: { id: customerId },
        },
      },
    });
    return ride;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getRidesByCustomerId(customerId: number) {
  return prisma.ride.findMany({
    where: { customerId },
    orderBy: { pickupTime: "desc" },
  });
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
