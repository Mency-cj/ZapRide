"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
type AddVehicleFormProps = {
  onSuccess: () => void;
};

export default function VehicleForm({ onSuccess }: AddVehicleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to add a vehicle");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("vehicleNo", data.vehicleNo);
      formData.append("licenseNo", data.licenseNo);
      formData.append("vehicleType", data.vehicleType);
      if (data.vehicleModel) formData.append("vehicleModel", data.vehicleModel);
      if (data.idProof && data.idProof[0])
        formData.append("idProof", data.idProof[0]);
      if (data.profilePhoto && data.profilePhoto[0])
        formData.append("profilePhoto", data.profilePhoto[0]);
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.error || "Failed to add vehicle");

      setMessage(" Vehicle added successfully!");
      reset();
      onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMessage(` ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-xl p-6 space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add Vehicle</h2>

      <input
        type="text"
        placeholder="Vehicle Number"
        {...register("vehicleNo", { required: "Vehicle number is required" })}
        className="w-full border p-2 rounded-md"
      />
      {errors.vehicleNo && (
        <p className="text-red-500 text-sm">
          {String(errors.vehicleNo.message)}
        </p>
      )}

      <input
        type="text"
        placeholder="License Number"
        {...register("licenseNo", { required: "License number is required" })}
        className="w-full border p-2 rounded-md"
      />
      {errors.licenseNo && (
        <p className="text-red-500 text-sm">
          {String(errors.licenseNo.message)}
        </p>
      )}

      <input
        type="text"
        placeholder="Vehicle Type (Car, Bike, etc.)"
        {...register("vehicleType", { required: "Vehicle type is required" })}
        className="w-full border p-2 rounded-md"
      />
      {errors.vehicleType && (
        <p className="text-red-500 text-sm">
          {String(errors.vehicleType.message)}
        </p>
      )}

      <input
        type="text"
        placeholder="Vehicle Model (Optional)"
        {...register("vehicleModel")}
        className="w-full border p-2 rounded-md"
      />
      <label className="block">
        ID Proof (Image)
        <input
          type="file"
          accept="image/*"
          {...register("idProof")}
          className="w-full border p-2 rounded-md mt-1"
        />
      </label>

      <label className="block">
        Profile Photo (Image)
        <input
          type="file"
          accept="image/*"
          {...register("profilePhoto")}
          className="w-full border p-2 rounded-md mt-1"
        />
      </label>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Add Vehicle"}
      </Button>

      {message && (
        <p
          className={`text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
