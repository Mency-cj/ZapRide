"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-300">
      <nav className="flex items-center justify-between p-5 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <Link href="/">
            <h1>
              <strong>Zap</strong>Ride
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center text-lg space-x-5">
          <Link href="/">
            <h5 className="hover:text-gray-700">Home</h5>
          </Link>
          <Link href="/customer/home">
            <h5 className="hover:text-gray-700">Ride</h5>
          </Link>
          <Link href="/driver/home">
            <h5 className="hover:text-gray-700">Drive & Earn</h5>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Link href="/login">
            <Button className="rounded-full" variant="ghost">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full">Sign Up</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-gray-200 px-5 pb-5 space-y-3">
          <Link href="/">
            <h5 className="hover:text-gray-700">Home</h5>
          </Link>
          <Link href="/customer/home">
            <h5 className="hover:text-gray-700">Ride</h5>
          </Link>
          <Link href="/driver/home">
            <h5 className="hover:text-gray-700">Drive & Earn</h5>
          </Link>
          <div className="flex flex-col space-y-2 mt-2">
            <Link href="/login">
              <Button className="w-full rounded-full" variant="ghost">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="w-full rounded-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
