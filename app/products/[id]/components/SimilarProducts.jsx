"use client";

import Product from "@/components/products/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

export const relatedSkeleton = Array.from({ length: 3 }).map((_, index) => (
  <Skeleton
    key={index}
    className="w-full h-[450px] rounded-3xl bg-gray-200"
  ></Skeleton>
));

function SimilarProducts({ category }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getSimilarProducts = async () => {
    setLoading(true);
    setError(false); // Reset error state before fetching
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .limit(3);

      if (error) {
        console.error("Supabase error:", error);
        setError("An error occurred while fetching similar products.");
      } else {
        setSimilarProducts(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSimilarProducts();
  }, [category]);

  if (loading && similarProducts.length === 0) {
    return <>{relatedSkeleton}</>;
  }

  if (error) {
    return <div className="w-full text-center text-red-500">{error}</div>;
  }

  

  const threeSimilarProducts = similarProducts.map((product, index) => (
    <Product
      key={index}
      id={product?.id}
      name={product?.name}
      price={product?.price}
      img={product?.images[0]?.url}
    />
  ));

  return <>{threeSimilarProducts}</>;
}

export default SimilarProducts;
