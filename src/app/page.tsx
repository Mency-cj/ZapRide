"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
const services = [
  { name: "Bike", svg: "/bike.svg" },
  { name: "Auto", svg: "/auto.svg" },
  { name: "Cab Economy", svg: "/car-economy.svg" },
  { name: "Car Premium", svg: "/car.svg" },
  { name: "EV Rides", svg: "/ev-car.svg" },
];

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center py-10 bg-white px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col items-center gap-6 w-full max-w-xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
            Your Ride Just a Zap Away
          </h1>
          <input
            type="text"
            placeholder="Pickup location"
            className="w-full px-4 py-3 rounded-2xl border-2 text-center focus:outline-1"
          />
          <input
            type="text"
            placeholder="Drop-off location"
            className="w-full px-4 py-3 rounded-2xl border-2 text-center focus:outline-1"
          />
          <Link href={"/register"}>
            <Button className="rounded-full p-6 text-lg">Book Ride</Button>
          </Link>
        </div>
      </div>
      <div className="py-16 px-6 sm:py-20 sm:px-12 md:px-16 lg:px-20 xl:px-32 2xl:px-40 max-w-[1600px] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold relative inline-block mb-8">
          Our Services
          <span className="absolute left-0 bottom-0 w-3/4 h-[2px] bg-black"></span>
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {services.map((service) => {
            return (
              <div
                key={service.name}
                className="flex flex-col items-center bg-blue-50 rounded-xl p-6 sm:w-48 sm:p-0 md:w-52"
              >
                <div className="w-32 h-32 relative mb-4 sm:w-32 sm:h-32 lg:w-36 lg:h-36">
                  <Image
                    src={service.svg as string}
                    alt={service.name}
                    fill
                    className="object-contain"
                  />{" "}
                </div>
                <span className="text-black font-semibold text-center">
                  {service.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
