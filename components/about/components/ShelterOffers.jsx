"use client";

import { MapPinHouse } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Slider from "react-slick";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

function ShelterOffers() {
  const [randomizedShelters, setRandomizedShelters] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    waitForAnimate: false,
  };

  const getRandomizedShelters = async () => {
    try {
      const { data, error } = await supabase.from("houses").select("*");
      if (error) console.error(error);
      else
        setRandomizedShelters(data.sort(() => 0.5 - Math.random()).slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomizedShelters();
  }, []);

  const randomizedSlides = randomizedShelters?.map((shelter, index) => (
    <div
      className="relative w-full h-[50vh] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer"
      key={index}
      onClick={() => router.push(`/property/${shelter?.id}`)}
    >
      <Image
        width={1000}
        height={1000}
        src={shelter?.images[0]?.url}
        alt="House"
        className="object-cover w-full h-full"
      />

      <div className="absolute top-2 left-2 md:top-4 md:left-4">
        <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-5xl">
          {shelter?.name}
        </h1>
      </div>

      <div className="overlay-div"></div>

      <div className="shelter-offer-description">
        <span className="flex items-center gap-1 md:gap-2">
          <MapPinHouse size={16} /> {shelter?.region}
        </span>
        <span>{shelter?.price}$/night</span>
      </div>
    </div>
  ));

  return (
    <div className="about-style">
      {loading ? (
        <div className=" w-full h-full">
          <Skeleton className="h-[50vh] md:h-[400px] w-full rounded-3xl" />
        </div>
      ) : (
        <Slider {...settings}>{randomizedSlides}</Slider>
      )}
    </div>
  );
}

export default ShelterOffers;
