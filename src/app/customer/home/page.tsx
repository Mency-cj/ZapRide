/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import BookingRide from "../bookingRide/page";
import { useAuth } from "@/context/AuthContext";

export default function Customer() {
  const [rides, setRides] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>();
  const { token } = useAuth();

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
      setRides(data.rides || []);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function fetchVehicles() {
    try {
      const res = await fetch("/api/vehicles/public", {
        method: "GET",
      });
      const data = await res.json();
      console.log("DATA:", data);
      setVehicles(data.vehicles || []);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (!token) return;
    fetchRides();
    fetchVehicles();
  }, []);

  async function cancelRide(rideId: number) {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`/api/rides/${rideId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rideId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      console.log("Ride cancelled:", data.ride);
      setRides((prev) => prev.filter((ride) => ride.id !== rideId));
      setSelectedVehicle(null);
      fetchRides();
    } catch (err: any) {
      console.error(err.message);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
        <div>
          <p className="text-xl sm:text-2xl font-semibold pb-4 sm:pb-6 text-center">
            <strong> Welcome to Zap Ride</strong>
          </p>
          <div className=" p-4 mb-5">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold pb-4 sm:pb-7 text-center">
              Your Booked Rides
            </h2>
            {rides.length === 0 ? (
              <p className="text-center text-gray-500">No rides booked yet.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 text-center">
                {rides.map((ride) => (
                  <li
                    key={ride.id}
                    className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 ${
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
                      <strong>Vehicle:</strong>
                      {ride.vehicle.vehicleType}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {new Date(ride.pickupTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <span
                        className={
                          ride.status === "PENDING"
                            ? "text-yellow-600"
                            : ride.status === "ACCEPTED"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {ride.status}
                      </span>
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
          <div className="p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold pb-4 sm:pb-8 text-center">
              Available Vehicles
            </h2>

            {vehicles.length === 0 ? (
              <p className="text-center text-gray-500">
                No vehicles registered yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
                    onClick={() => setSelectedVehicle(v)}
                  >
                    <p className="font-semibold text-center mb-3">
                      {v.user.name}
                    </p>

                    {v.profilePhoto ? (
                      <img
                        src={v.profilePhoto}
                        alt={v.vehicleNo}
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-3">
                        No Image
                      </div>
                    )}

                    <div className="text-sm sm:text-base text-gray-500 text-center">
                      <p>
                        <strong>Vehicle Type:</strong> {v.vehicleType}
                      </p>
                      <p>
                        <strong>Vehicle No:</strong> {v.vehicleNo}
                      </p>
                      <p>
                        <strong>License:</strong> {v.licenseNo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedVehicle && (
              <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-xs flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative border-2 border-gray-300">
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                  >
                    ✖
                  </button>

                  <BookingRide
                    selectedVehicle={selectedVehicle}
                    onClose={() => setSelectedVehicle(null)}
                    refreshRides={fetchRides}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
