/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import VehicleForm from "@/components/VehicleForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function Driver() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  async function fetchVehicles() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      setVehicles(resData.vehicles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function fetchRides() {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    const driverId = localStorage.getItem("driverId");

    try {
      const response = await fetch(`/api/rides/driver/${driverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      console.log("fetchRides", resData);
      setRides(resData.rides || []);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchVehicles();
    fetchRides();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  async function updateStatus(
    rideId: number,
    status: "ACCEPTED" | "CANCELLED"
  ) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      const response = await fetch(`/api/rides/${rideId}`, {
        method: "PATCH",
        body: JSON.stringify({ rideId, status }),
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await response.json();
      console.log("updateRideStatus", resData);
      if (!response.ok) throw new Error(resData.error);
      setRides((prev) =>
        prev.map((ride) => (ride.id === rideId ? resData.ride : ride))
      );
    } catch (err: any) {
      console.error(err.message);
    }
  }
  return (
    <div className="m-12">
      <div className="m-12">
        <h2 className="text-2xl font-bold pb-10 text-center">
          Your Booked Rides
        </h2>

        {rides.length === 0 ? (
          <p className="text-gray-500 text-center">No rides booked yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white border rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
              >
                <div className="text-center mb-4">
                  <p className="font-semibold text-lg">
                    {ride.pickupLocation} → {ride.dropLocation}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pickup Time: {new Date(ride.pickupTime).toLocaleString()}
                  </p>
                </div>

                <p className="text-sm mb-2">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      ride.status === "PENDING"
                        ? "text-yellow-600"
                        : ride.status === "ACCEPTED"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {ride.status}
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  Customer: {ride.customer.name} <br /> Phone:{" "}
                  {ride.customer.phone}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm font-medium">
                    Vehicle: {ride.vehicle?.vehicleType || "Not Assigned yet"}{" "}
                    {ride.vehicle?.vehicleNo && `- ${ride.vehicle.vehicleNo}`}
                  </p>
                  {ride.vehicle?.profilePhoto && (
                    <Image
                      src={ride.vehicle.profilePhoto}
                      alt="Vehicle"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  )}
                </div>

                {ride.status === "PENDING" && (
                  <div className="flex justify-center gap-3 mt-6">
                    <Button
                      onClick={() => updateStatus(ride.id, "ACCEPTED")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => updateStatus(ride.id, "CANCELLED")}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="m-12 pt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Vehicles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {vehicles.length === 0 ? (
            <p className="text-gray-500 text-center">
              No vehicles registered yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="bg-white border rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  {v.profilePhoto && (
                    <Image
                      src={v.profilePhoto}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full object-cover mb-4"
                    />
                  )}
                  <p className="font-semibold text-lg mb-2">{v.userName}</p>{" "}
                  <p className="text-gray-700 font-medium">
                    {v.vehicleType} - {v.vehicleNo}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    License No: {v.licenseNo}
                  </p>
                  <span
                    className={`mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                      v.isEnabled
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {v.isEnabled ? "Verified" : "Pending Verification"}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div
            onClick={() => setShowForm(true)}
            className="cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <FiPlus className="w-10 h-10 text-gray-400 mb-2" />
            <p className="font-semibold text-gray-600">Add New Vehicle</p>
          </div>
          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-semibold mb-4 text-center">
                  Add New Vehicle
                </h3>

                <VehicleForm
                  onSuccess={() => {
                    fetchVehicles();
                    setShowForm(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
