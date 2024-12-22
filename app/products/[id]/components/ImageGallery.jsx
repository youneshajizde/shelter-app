"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ImageGallery({ imgs }) {
  const imgUrls = imgs?.map((img) => img.url) || [];
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (imgUrls.length > 0 && mainImage === null) {
      setMainImage(imgUrls[0]); // Only set the initial main image
    }
  }, [imgUrls, mainImage]); // Depend on mainImage to prevent resetting unnecessarily

  const handleImageClick = (url) => {
    setMainImage(url);
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row-reverse">
      {/* Main Image */}
      <div className="flex-1 h-[550px]">
        {mainImage ? (
          <Image
            width={1000}
            height={1000}
            src={mainImage}
            alt="Main Product"
            className="w-full h-full rounded-2xl border-[1px] border-gray-200 object-cover"
          />
        ) : (
          <Skeleton className="w-full h-full rounded-2xl" />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex flex-row lg:flex-col space-x-5 lg:space-x-0 lg:space-y-5">
        {imgUrls.length > 0
          ? imgUrls.map((url, index) => (
              <Image
                key={index}
                width={1000}
                height={1000}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 cursor-pointer rounded-xl object-cover border-[1px] ${
                  mainImage === url ? "border-gray-500" : "border-gray-200"
                } hover:border-gray-500 transition-all`}
                onClick={() => handleImageClick(url)}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-20 h-20 rounded-xl border-[1px] border-gray-200"
              />
            ))}
      </div>
    </div>
  );
}

export default ImageGallery;
