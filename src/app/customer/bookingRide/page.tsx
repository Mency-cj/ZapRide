/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
interface Props {
  selectedVehicle: any;
  onClose: () => void;
  refreshRides: () => void;
}

export default function BookingRide({
  selectedVehicle,
  onClose,
  refreshRides,
}: Props) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data: any) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      const bookingData = {
        ...data,
        driverId: selectedVehicle.user.id,
        vehicleId: selectedVehicle.id,
      };
      const response = await fetch("/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Failed to book ride");

      console.log("Ride booked successfully", res.ride);
      reset();
      refreshRides();
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {selectedVehicle && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Book Your Ride , {selectedVehicle.vehicleType}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Pickup Location"
              {...register("pickupLocation", {
                required: "Pickup location is required",
              })}
              className="text-center w-full border rounded p-2 mb-3"
            />
            {errors.pickupLocation && (
              <p className="text-red-500">
                {String(errors.pickupLocation.message)}
              </p>
            )}

            <input
              type="text"
              placeholder="Drop-off location"
              {...register("dropLocation", {
                required: "Drop location is required",
              })}
              className="text-center w-full border rounded p-2 mb-3"
            />
            {errors.dropLocation && (
              <p className="text-red-500">
                {String(errors.dropLocation.message)}
              </p>
            )}
            <input
              type="datetime-local"
              {...register("pickupTime", {
                required: "Pickup time is required",
              })}
              className="text-center w-full border rounded p-2 mb-3"
            />
            {errors.pickupTime && (
              <p className="text-red-500">
                {String(errors.pickupTime.message)}
              </p>
            )}
            <Button type="submit" className="mb-9 mr-3">
              Book Ride
            </Button>
            <Button type="button" variant="secondary" onClick={() => onClose()}>
              Cancel
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
