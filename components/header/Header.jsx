"use client";

import React from "react";
import Image from "next/image";
import homeImg2 from "@/public/assets/homePhoto2.jpg";
import homeImg3 from "@/public/assets/homePhoto3.jpg";
import adminImg1 from "@/public/assets/admin1.jpg";
import adminImg2 from "@/public/assets/admin2.jpg";
import adminImg3 from "@/public/assets/admin3.jpg";
import BasicFilters from "../filters/BasicFilters";
import { motion } from "framer-motion";

function Header() {
  const stackedImages = [adminImg1, adminImg2, adminImg3];
  const double_divs = [
    { title: "Desert houses", imgUrl: homeImg2 },
    { title: "Private islands", imgUrl: homeImg3 },
  ];
  const stackedUsers = stackedImages.map((imgUrl, index) => (
    <Image
      key={index}
      alt="admin"
      src={imgUrl}
      width={1000}
      height={1000}
      className="stacked-images"
    />
  ));

  const doubleDivs = double_divs.map((div, index) => (
    <div key={index} className="double-divs-style">
      <Image
        alt="home"
        src={div.imgUrl}
        width={1000}
        height={1000}
        className="absolute w-full h-full rounded-3xl object-cover"
      />
      <div className="w-full h-full absolute z-30 p-4 flex items-end">
        <h1 className="text-white font-medium text-2xl">{div.title}</h1>
      </div>
    </div>
  ));
  return (
    <section className="mt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* First div : search - title - co founders */}
        <motion.div className="flex flex-col space-y-16">
          <h1 className="font-bold text-7xl sm:text-8xl">
            Inspiring locations to lodge
          </h1>

          <p className="font-medium text-gray-400 w-[400px]">
            Create memorable travel moments by choosing a designer house with a
            warm ambience as your accommodations
          </p>

          <BasicFilters />
          {/* Stacked profile images */}
          <div className="flex items-center mt-6">
            <div className="flex -space-x-4">{stackedUsers}</div>
            <span className="ml-4 text-gray-600 font-medium">
              Know about the founders
            </span>
          </div>
        </motion.div>

        {/* Second div : grid system for a video and images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          <div className="bg-img rounded-3xl w-full h-[400px] bg-black relative">
            <video
              autoPlay
              loop
              muted
              alt="home photo"
              src={"/videos/vid2.mp4"}
              className="absolute w-full h-full rounded-3xl object-cover"
            />
          </div>
          <div className="statistics-style">
            <h1>2,000 +</h1>
            <h1>Unique Places</h1>
          </div>
          <div className="grid grid-cols-2 gap-5">{doubleDivs}</div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Header;
