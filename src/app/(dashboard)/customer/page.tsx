"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Customer() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rides, setRides] = useState<any[]>([]);

  async function fetchRides() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("/api/rides", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRides(data.rides);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchRides();
  }, []);

  async function cancelRide(rideId: number) {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`/api/rides/${rideId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      console.log("Ride cancelled:", data.ride);
      setRides((prev) => prev.filter((ride) => ride.id !== rideId));
      fetchRides();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      const response = await fetch("/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Failed to book ride");

      console.log("Ride booked successfully", res.ride);
      reset();
      fetchRides();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="flex justify-center min-h-screen bg-gray-100 p-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
          <p>Welcome, </p>
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Book Your Ride</h2>
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
              <Button type="submit" className="mb-9">
                Book Ride
              </Button>
            </form>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Your Booked Rides
            </h2>
            {rides.length === 0 ? (
              <p className="text-center text-gray-500">No rides booked yet.</p>
            ) : (
              <ul>
                {rides.map((ride) => (
                  <li
                    key={ride.id}
                    className={`border-b py-3 ${
                      ride.status === "CANCELLED" ? "opacity-50" : ""
                    }`}
                  >
                    <p>
                      <strong>Pickup:</strong> {ride.pickupLocation}
                    </p>
                    <p>
                      <strong>Drop:</strong> {ride.dropLocation}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {new Date(ride.pickupTime).toLocaleString()}
                    </p>
                    {ride.status !== "CANCELLED" && (
                      <Button
                        variant="destructive"
                        className="mt-2"
                        onClick={() => cancelRide(ride.id)}
                      >
                        Cancel Ride
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
