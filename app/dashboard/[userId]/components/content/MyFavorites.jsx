"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Product from "@/components/products/Product";
import { supabase } from "@/lib/supabase";
import useAddFavorites from "@/stores/favoredStore";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function MyFavorites() {
  const { favorites } = useAddFavorites(); // Zustand favorites array
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavoriteProducts = async () => {
    setLoading(true);
    try {
      // Fetch products whose names match the favorites array
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("name", favorites); // Filter products by the 'name' column and Zustand favorites

      if (error) {
        console.error("Error fetching favorite products:", error);
      } else {
        setFavoriteProducts(data || []); // Update state with fetched data
      }
    } catch (error) {
      console.error("Unexpected error fetching favorite products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (favorites.length > 0) {
      getFavoriteProducts();
    } else {
      setFavoriteProducts([]); // Clear if no favorites
      setLoading(false);
    }
  }, [favorites]);

  return (
    <section className="flex flex-col space-y-8">
      {/* Search bar */}
      <div className="search flex items-center gap-1 bg-white rounded-xl px-2 w-full md:w-[400px]">
        <Search />
        <Input
          placeholder="Search between products..."
          className="border-none bg-transparent"
        />
      </div>

      {/* Favorite Products */}
      <div className="cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              {/* Skeleton for Image */}
              <Skeleton className="w-full h-64 rounded-3xl" />
              {/* Skeleton for Text */}
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))
        ) : favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              img={product?.images[0]?.url}
            />
          ))
        ) : (
          <p className="text-gray-500">No favorite products found.</p>
        )}
      </div>
    </section>
  );
}

export default MyFavorites;
