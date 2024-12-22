"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CircleCheck, Ellipsis, MapPin, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabase";

function ReservedHouse({ state, name, img, address, region, price, houseId }) {
  const [loading, setLoading] = useState(false); // State to manage loading

  let stateColor = "";
  let customBtn = "";

  const cancelHandle = async () => {
    setLoading(true); // Set loading to true when the button is clicked
    try {
      // Update the house's reserved status to "available"
      const { data: houseData, error: houseError } = await supabase
        .from("houses")
        .update({ reserved_status: "available" }) // Update reserved_status to "available"
        .eq("id", houseId); // Use the houseId for filtering

      if (houseError) {
        console.error(
          "Error canceling reservation in houses table:",
          houseError
        );
        return;
      }

      console.log("Reservation canceled successfully:", houseData);

      // Remove the corresponding row from the bookings table
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .delete()
        .eq("house_id", houseId);

      if (bookingError) {
        console.error("Error removing booking record:", bookingError);
      } else {
        console.log("Booking record removed successfully:", bookingData);
      }
    } catch (error) {
      console.error("Unexpected error canceling reservation:", error);
    } finally {
      setLoading(false); // Set loading to false after the operation
    }
  };

  const confirmHandle = async () => {
    setLoading(true); // Set loading to true when the button is clicked
    try {
      const { data, error } = await supabase
        .from("houses")
        .update({ reserved_status: "confirmed" }) // Update reserved_status to "confirmed"
        .eq("id", houseId);

      if (error) {
        console.error("Error confirming reservation:", error);
      } else {
        console.log("Reservation confirmed successfully:", data);
      }
    } catch (error) {
      console.error("Unexpected error confirming reservation:", error);
    } finally {
      setLoading(false); // Set loading to false after the operation
    }
  };

  switch (state) {
    case "non-confirmed":
      stateColor = "bg-yellow-500";
      customBtn = (
        <button
          onClick={confirmHandle}
          disabled={loading} // Disable the button while loading
          className={`bg-blue-50 font-medium text-sm w-full !mt-4 py-2 px-3 rounded-lg flex items-center gap-2 justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin text-blue-300" />
          ) : (
            <>
              <CircleCheck className="text-blue-300" />
              <span className="text-blue-600">Confirm</span>
            </>
          )}
        </button>
      );
      break;

    case "confirmed":
      stateColor = "bg-green-500";
      customBtn = (
        <button
          onClick={cancelHandle}
          disabled={loading} // Disable the button while loading
          className={`bg-red-50 font-medium text-sm w-full !mt-4 py-2 px-3 rounded-lg flex items-center gap-2 justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin text-red-300" />
          ) : (
            <>
              <CircleCheck className="text-red-300" />
              <span className="text-red-600">Cancel</span>
            </>
          )}
        </button>
      );
      break;

    default:
      break;
  }

  return (
    <div className="border-[1px] border-gray-200 rounded-3xl w-full h-[380px] bg-white overflow-hidden transition-transform transform hover:shadow-lg hover:-translate-y-2">
      <div className="relative h-[40%] w-full">
        <Image
          alt="img"
          src={img}
          fill
          className="rounded-t-3xl object-cover"
        />
        <span className="absolute left-0 top-0 z-30 flex items-center justify-between w-full p-3">
          <h1 className={`${stateColor} text-white rounded-lg p-2 text-xs`}>
            {state}
          </h1>
          <Popover>
            <PopoverTrigger>
              <Ellipsis size={25} className="text-white" />
            </PopoverTrigger>
            <PopoverContent className="rounded-2xl bg-white p-2 shadow-lg w-[200px]">
              <div className="w-full flex items-center justify-center flex-col space-y-2 text-center rounded-2xl py-3 px-2 text-sm font-medium">
                <div className="flex flex-col items-center space-y-5">
                  <h1 className="cursor-pointer">View House</h1>
                  <h1 className="cursor-pointer">Message Office</h1>
                </div>
                {customBtn}
              </div>
            </PopoverContent>
          </Popover>
        </span>
      </div>

      {/* Content section */}
      <div className="py-5 px-5 h-[55%] ">
        <div className="flex flex-col space-y-7 md:space-y-4 lg:space-y-5 xl:space-y-7">
          <span className="name-and-location flex flex-col space-y-5">
            <h1 className="font-medium text-xl">{name}</h1>
            <p className="flex gap-2 text-gray-500 font-medium text-xs">
              <MapPin size={15} />
              {region} - {address}
            </p>
          </span>

          <hr />

          <span className="flex flex-col space-y-3 text-xs text-gray-400 font-medium">
            <h1>
              Number of days :{" "}
              <span className="text-black">Call the agent</span>
            </h1>
            <h1>
              Price : <span className="text-black">{price}$ / day</span>
            </h1>

            <h1>
              Payment detail : <span className="text-black">unpaid</span>
            </h1>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReservedHouse;
