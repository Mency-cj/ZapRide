"use client";

import VehicleForm from "@/components/VehicleForm";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Driver() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    fetchVehicles();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>

      <VehicleForm onSuccess={fetchVehicles} />

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Your Vehicles</h2>
        {vehicles.length === 0 ? (
          <p>No vehicles registered yet.</p>
        ) : (
          vehicles.map((v) => (
            <div
              key={v.id}
              className="border rounded-xl p-4 shadow-md flex justify-between items-center"
            >
              {v.profilePhoto && (
                <Image
                  src={v.profilePhoto}
                  alt="Profile"
                  width={64} 
                  height={64}
                  className="rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">
                  {v.vehicleType} - {v.vehicleNo}
                </p>
                <p className="text-sm text-gray-500">License: {v.licenseNo}</p>
                <p
                  className={`text-sm mt-1 font-semibold ${
                    v.isEnabled ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {v.isEnabled ? " Verified" : " Pending Verification"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
