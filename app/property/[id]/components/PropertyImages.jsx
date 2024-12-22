"use client";

import React from "react";
import Image from "next/image";
import placeholder from "@/public/assets/placeholder.webp"; // Placeholder image
import { Skeleton } from "@/components/ui/skeleton";
import PropertyMap from "./PropertyMap";

function PropertyImages({
  propertyImg1,
  propertyImg2,
  propertyImg3,
  loading,
  houseName,
  coordinates = [51.505, -0.09],
}) {
  const skeletons = (
    <div className="w-full h-[80vh] sticky top-10 flex flex-col gap-5">
      <div className="w-full min-h-[50%] rounded-3xl overflow-hidden group">
        <Skeleton className="w-full h-full"></Skeleton>
      </div>

      <div className="sgrid grid-cols-2 min-h-[25%] gap-5">
        <div className="w-full min-h-[100%] rounded-3xl overflow-hidden group">
          <Skeleton className="w-full h-full"></Skeleton>
        </div>
        <div className="w-full min-h-[100%] rounded-3xl overflow-hidden group">
          <Skeleton className="w-full h-full"></Skeleton>
        </div>
      </div>

      {/* Skeleton for the Map Div */}
      <div className="w-full h-44 bg-gray-300 rounded-3xl"></div>
    </div>
  );

  return (
    <div>
      {loading ? (
        skeletons
      ) : (
        <section className="w-full h-[90vh] sticky top-10 flex flex-col gap-5">
          <div className="w-full min-h-[50%] rounded-3xl overflow-hidden group">
            <Image
              alt="House Image"
              src={propertyImg1 || placeholder} // Fallback to placeholder if no image
              width={1000}
              height={1000}
              className="main-property-images"
            />
          </div>

          <div className="grid grid-cols-2 min-h-[25%] gap-5">
            <div className="min-h-[100%] w-full rounded-3xl overflow-hidden group">
              <Image
                alt="House Image"
                src={propertyImg2 || placeholder} 
                width={1000}
                height={1000}
                className="two-property-below-images"
              />
            </div>
            <div className="min-h-[100%] w-full rounded-3xl overflow-hidden group">
              <Image
                alt="House Image"
                src={propertyImg3 || placeholder} 
                width={1000}
                height={1000}
                className="two-property-below-images"
              />
            </div>
          </div>

          <PropertyMap houseName={houseName} coordinates={coordinates} />
        </section>
      )}
    </div>
  );
}

export default PropertyImages;
