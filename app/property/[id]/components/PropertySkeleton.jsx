import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PropertySkeleton = () => (
  <section className="w-full flex flex-col space-y-10">
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-6 w-1/4" />

    <div className="w-[40%] rounded-full min-h-[60px] ">
      <Skeleton className="h-12 w-full rounded-full" />
    </div>

    <span className="flex items-center gap-10">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
    </span>

    <Skeleton className="h-20 w-full" />
    <div className="flex gap-5">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-12 w-36" />
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-32" />
    </div>

    <div className="reviews flex flex-col space-y-10">
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="flex flex-col space-y-5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
    </div>
  </section>
);

export default PropertySkeleton;
