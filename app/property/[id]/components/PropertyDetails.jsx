"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Bath, BedDouble, CalendarIcon, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useAuthStore from "@/stores/authStore";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useToast } from "@/hooks/useToaster";
import PropertySkeleton from "./PropertySkeleton";
function PropertyDetails({ property, loading, reservedStatus }) {
  const [date, setDate] = useState();
  const { token, user } = useAuthStore();
  const { successToast } = useToast();
  const router = useRouter();

  const failedToAddToBookingsToast = () => {
    toast.error("Failed to reserve", {
      description: `Something happened to the reservation process!`,
    });
  };

  const addToBookings = async () => {
    if (!token) {
      router.push("/sign-up");
      return;
    }

    if (!user?.id || !property?.id) {
      alert("User or property information is missing.");
      return;
    }

    try {
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert([
          {
            user_id: user?.id,
            house_id: property?.id,
          },
        ]);

      if (bookingError) {
        console.error("Booking insertion failed:", bookingError);
        failedToAddToBookingsToast();
        return;
      }

      console.log("Booking added:", bookingData);

      const { data: houseData, error: houseError } = await supabase
        .from("houses")
        .update({ reserved_status: "non-confirmed" })
        .eq("id", property?.id);
      successToast("added to bookings", property?.name, "requests");

      if (houseError) {
        console.error("House status update failed:", houseError);
        failedToAddToBookingsToast();
        return;
      }

      console.log("House updated:", houseData);
    } catch (error) {
      console.error("Unexpected error:", error);
      failedToAddToBookingsToast();
    }
  };

  return loading ? (
    <PropertySkeleton />
  ) : (
    <section className="w-full flex flex-col space-y-10">
      <span className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold">{property?.name}</h1>
        <p className="text-xs text-gray-500">{property?.address}</p>
      </span>

      <span>
        <h1 className="text-xl font-semibold">
          ${property?.price} /
          <span className="text-sm text-gray-500"> Night</span>
        </h1>
      </span>

      <HoverCard>
        <HoverCardTrigger className="hover-trigger-style">
          <CalendarIcon className="font-bold" />
          Check availability
        </HoverCardTrigger>
        <HoverCardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => {
              // Disable unavailable dates
              return property?.availability.some(
                (range) =>
                  date >= new Date(range.check_in) &&
                  date <= new Date(range.check_out)
              );
            }}
            initialFocus
          />
        </HoverCardContent>
      </HoverCard>

      <span className="flex items-center gap-10 font-medium text-stone-800 text-sm">
        <h1 className="flex flex-col space-y-1">
          <Users />
          Guests
        </h1>

        <h1 className="flex flex-col space-y-1">
          <BedDouble />
          Beds
        </h1>

        <h1 className="flex flex-col space-y-1">
          <Bath />
          Bathrooms
        </h1>
      </span>

      <p className="text-sm font-medium text-stone-800">{property?.desc}</p>

      <ul className="flex items-center gap-5 font-medium text-sm text-gray-400">
        {property?.options.map((opt, index) => (
          <li key={index}>{opt}</li>
        ))}
      </ul>
      <Button
        disabled={reservedStatus === "confirmed" ? true : false}
        onClick={addToBookings}
        className="w-[140px] rounded-xl"
      >
        {reservedStatus === "confirmed" ? "It is reserved" : "Reserve"}
      </Button>
      <span className="flex items-center gap-3">
        <h1 className="flex items-center gap-2 font-bold text-2xl">
          <Star className="text-black" fill="true" />
          4.64
        </h1>
        •<h1 className="text-stone-400 text-2xl">3 Reviews</h1>
      </span>

      <div className="reviews flex flex-col space-y-10">
        <div className="flex flex-col space-y-5">
          <span className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="flex flex-col space-y-1 text-sm font-medium">
              Kaveh
              <span className="text-xs text-gray-500">23 April , 2024</span>
            </h1>
          </span>

          <p className="text-sm font-medium text-gray-500">
            The house gives a modern look which is tremendous in recent years.
            It is actually an essential commodity that people somehow ignore
            when it comes to architecture!
          </p>
        </div>
        <div className="flex flex-col space-y-5">
          <span className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="flex flex-col space-y-1 text-sm font-medium">
              Kaveh
              <span className="text-xs text-gray-500">23 April , 2024</span>
            </h1>
          </span>

          <p className="text-sm font-medium text-gray-500">
            The house gives a modern look which is tremendous in recent years.
            It is actually an essential commodity that people somehow ignore
            when it comes to architecture!
          </p>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;
