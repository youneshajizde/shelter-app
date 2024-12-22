"use client";

import Image from "next/image";
import testImg from "@/public/assets/test.jpg";
import { supabase } from "@/lib/supabase";
import Testimonial from "./Testimonial";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Make sure you have the ShadCN Skeleton component

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase.from("testimonials").select("*");
        if (error) {
          console.error("Error fetching testimonials:", error);
        } else {
          setTestimonials(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const testimonialItems = testimonials.map((test, index) => (
    <Testimonial key={index} opinion={test.testimonial} />
  ));

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    gap: 3,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <h1 className="font-light text-3xl ">
        What our <span className="text-gray-400">Clients</span> say about us
      </h1>

      <div className="mt-10">
        {loading ? (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-[400px] w-full  rounded-3xl"
              />
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {testimonialItems}
            <div className="bg-green-300 h-[400px] rounded-3xl relative">
              <Image
                src={testImg}
                width={1000}
                height={1000}
                className="object-cover w-full h-full absolute rounded-3xl"
                alt="Testimonial Background"
              />
            </div>
          </Slider>
        )}
      </div>
    </section>
  );
}
