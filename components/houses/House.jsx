import Image from "next/image";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import Lucide icons

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-1 rounded-full flex items-center justify-center"
    onClick={onClick}
  >
    <ChevronLeft size={20} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-1 rounded-full flex items-center justify-center"
    onClick={onClick}
  >
    <ChevronRight size={20} />
  </button>
);

function House({ id, region, address, price, type, imgUrls }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true, // Enable fade effect
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />, // Custom Previous Button
    nextArrow: <CustomNextArrow />, // Custom Next Button
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }} className="absolute w-full text-center">
        <ul className="dots">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-[5px] h-[5px] bg-white rounded-full hover:bg-gray-600"></div>
    ),
  };

  return (
    <Link
      href={`/property/${id}`}
      className="min-h-[230px] rounded-3xl flex flex-col space-y-3"
    >
      <div className="img-container w-full h-[230px] relative overflow-hidden">
        {/* Slider with house images */}
        <Slider {...settings} className="h-full">
          {imgUrls.map((img, index) => (
            <div
              key={index}
              className="h-[230px] w-full flex items-center justify-center overflow-hidden"
            >
              <Image
                src={img}
                alt={`House image ${index + 1}`}
                width={1000}
                height={300}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          ))}
        </Slider>

        {/* Type badge */}
        <span className="absolute top-4 right-4 bg-stone-800 text-white px-4 py-1 rounded-full text-xs font-semibold z-10">
          {type}
        </span>

        {/* Price tag */}
        <span className="absolute bottom-4 left-4 bg-gray-200 px-3 py-1 rounded-full z-10">
          <span className="text-sm font-semibold">{price}$</span> /
          <span className="text-xs text-gray-600"> night</span>
        </span>
      </div>

      {/* House information */}
      <div className="house-info flex flex-col space-y-1 font-medium">
        <h1 className="text-xs">{address}</h1>
        <h1 className="text-xs text-gray-400">{region}</h1>
      </div>
    </Link>
  );
}

export default House;
