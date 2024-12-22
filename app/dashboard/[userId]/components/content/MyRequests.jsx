"use client";

import React, { useEffect, useState } from "react";
import ReservedHouse from "./ReservedHouse";
import { supabase } from "@/lib/supabase";
import useAuthStore from "@/stores/authStore";
import { Skeleton } from "@/components/ui/skeleton";

function MyRequests() {
  const [reservedHouse, setReservedHouses] = useState();
  const [selectedCat, setSelectedCat] = useState("non-confirmed");
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const getAllBookingsOfUser = async () => {
    setLoading(true);
    try {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user?.id);

      const houseIds = bookings?.map((booking) => booking.house_id);

      const { data: houses, error: housesError } = await supabase
        .from("houses")
        .select("*")
        .in("id", houseIds)
        .eq("reserved_status", selectedCat);

      setReservedHouses(houses);
      setLoading(false);

      if (error) {
        console.error(error);
      } else {
        console.log(bookings);
        console.log(houses);
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading is false even on error
    }
  };

  useEffect(() => {
    getAllBookingsOfUser();
  }, [selectedCat]);

  const reservedHouseItems = reservedHouse?.map((house, index) => (
    <ReservedHouse
      houseId={house?.id}
      img={house?.images[0]?.url}
      name={house?.name}
      region={house?.region}
      address={house?.address}
      price={house?.price}
      key={index}
      reservedStatus={house?.reserved_status}
      state={house?.reserved_status}
    />
  ));

  return (
    <section className="flex flex-col space-y-8">
      <div className="flex items-center space-x-10 text-[0.65rem] sm:text-xs md:text-sm">
        <span
          onClick={() => setSelectedCat("non-confirmed")}
          className={`border-[1px] border-gray-300 rounded-lg py-2 px-2 cursor-pointer transition-all ${
            selectedCat === "non-confirmed"
              ? "text-blue-700 border-blue-700"
              : "text-gray-300 hover:text-blue-500"
          }`}
        >
          Non-confirmed
        </span>
        <span
          onClick={() => setSelectedCat("confirmed")}
          className={`border-[1px] border-gray-300 rounded-lg py-2 px-2 cursor-pointer transition-all ${
            selectedCat === "confirmed"
              ? "text-blue-700 border-blue-700"
              : "text-gray-300 hover:text-blue-500"
          }`}
        >
          Confirmed
        </span>
      </div>

      <div className="cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-[300px] bg-gray-200 rounded-lg"
            />
          ))
        ) : reservedHouse?.length > 0 ? (
          reservedHouseItems
        ) : (
          <div className="col-span-full text-left text-gray-500 ">
            There are no reserved houses.
          </div>
        )}
      </div>
    </section>
  );
}

export default MyRequests;
