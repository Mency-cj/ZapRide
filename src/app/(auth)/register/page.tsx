"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const role = watch("role");
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (!response.ok) {
        console.log("Signup error:", res.error);
        // return;
      }
       if (res.token) {
      localStorage.setItem("token", res.token);
      setIsLoggedIn(true);
    }
      if (res.role === "CUSTOMER") {
        router.push("/customer/home");
      } else if (res.role === "DRIVER") {
        router.push("/driver/home");
      } else {
        router.push("/");
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center w-auto py-13 bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-10 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Signup</h2>

          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded p-2"
          />
          {errors.name?.message && (
            <p className="text-red-500">{String(errors.name.message)}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded p-2"
          />
          {errors.email?.message && (
            <p className="text-red-500">{String(errors.email.message)}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full border rounded p-2"
          />
          {errors.password?.message && (
            <p className="text-red-500">{String(errors.password.message)}</p>
          )}

          <input
            type="text"
            placeholder="Phone"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border rounded p-2"
          />
          {errors.phone?.message && (
            <p className="text-red-500">{String(errors.phone.message)}</p>
          )}

          <select
            {...register("role", { required: "role is required" })}
            defaultValue=""
            className={`w-full border rounded p-2 ${
              role === "" ? "text-gray-400" : "text-black"
            }`}
          >
            <option value="" disabled hidden>
              -- Signup As --
            </option>
            <option value="CUSTOMER">Customer</option>
            <option value="DRIVER">Driver</option>
          </select>
          {errors.role?.message && (
            <p className="text-red-500">{String(errors.role.message)}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Signup
          </button>
          <p className="p-2 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
