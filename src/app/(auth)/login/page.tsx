"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.ok) {
        console.log("Login Successfull");
        localStorage.setItem("token", res.token);

        if (res.role === "CUSTOMER") {
          router.push("/customer/home");
        } else if (res.role === "DRIVER") {
          router.push("/driver/home");
        } else {
          router.push("/");
        }

        reset();
      } else {
        alert(res.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="flex items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-10 pb-16 rounded-lg shadow-md max-w-md mx-auto -mt-40 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
