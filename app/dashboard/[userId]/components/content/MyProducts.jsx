"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from ShadCN
import { supabase } from "@/lib/supabase";
import useBoughtBasket from "@/stores/boughtStore";
import { PackageCheck, Search, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";

function MyProducts() {
  const { basket } = useBoughtBasket();
  const [loading, setLoading] = useState(true);
  console.log("this is the basket ", basket);
  const flattenedBasket = basket.flat();
  console.log("this is flattened basket : ", flattenedBasket);

  setTimeout(() => {
    setLoading(false);
  }, 1500);
  useEffect(() => {}, [basket]);

  return (
    <section className="flex flex-col space-y-8">
      <div className="search flex items-center gap-1 bg-white rounded-xl px-2 w-full md:w-[400px]">
        <Search />
        <Input
          placeholder="Search between products..."
          className="border-none bg-transparent"
        />
      </div>

      <div className="cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          // Skeleton placeholders while loading
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-40 w-full rounded-lg bg-gray-200"
            />
          ))
        ) : flattenedBasket.length > 0 ? (
          flattenedBasket.map((product, index) => (
            <div
              key={index}
              className="product-card p-4 border border-gray-200 rounded-lg shadow-md bg-white"
            >
              <h3 className="font-bold text-lg">{product}</h3>

              <div className="delivery-status flex items-center gap-2 mt-4">
                <div className="flex flex-col items-center text-yellow-500">
                  <Truck />
                  <span className="text-xs mt-1">Shipped</span>
                </div>

                {/* Green Line */}
                <div className="h-1 w-full bg-green-500 flex-grow" />

                <div className="flex flex-col items-center text-green-500">
                  <PackageCheck />
                  <span className="text-xs mt-1">Delivered</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </section>
  );
}

export default MyProducts;
