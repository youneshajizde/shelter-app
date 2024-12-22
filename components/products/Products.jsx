"use client";

import React, { useState } from "react";
import Product from "./Product";
import { Button } from "../ui/button";
import { useGetProducts } from "@/hooks/useGetProducts";
import { productCategories } from "@/lib/constants";
import { Skeleton } from "../ui/skeleton";

function Products() {
  const [selected, setSelected] = useState("bags");
  const [productLimit, setProductLimit] = useState(3);

  const { products, loading, error, hasMore } = useGetProducts(
    productLimit,
    selected
  );

  const increaseProductRender = () => {
    setProductLimit((prevLimit) => prevLimit + 3);
  };

  const handleCategoryChange = (category) => {
    setSelected(category);
    setProductLimit(3); // Reset the limit when category changes
  };

  const SkeletonItems = Array.from({ length: productLimit }).map((_, index) => (
    <Skeleton
      key={index}
      className="w-full h-[450px] rounded-3xl bg-gray-200"
    />
  ));

  const ProductItems = products?.map((product, index) => (
    <Product
      key={index}
      id={product?.id}
      name={product?.name}
      price={product?.price}
      img={product?.images[0]?.url}
    />
  ));

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <div className="text-2xl font-semibold flex flex-col space-y-5">
        <h1>Shelter Products</h1>

        <ul className="flex items-center space-x-2 md:space-x-5">
          {productCategories.map((cat, index) => (
            <li
              onClick={() => handleCategoryChange(cat.value)}
              key={index}
              className={`${
                cat.value === selected
                  ? "bg-stone-700 text-white"
                  : "text-stone-700"
              } category-style`}
            >
              {cat.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="product-skeleton-container">
        {loading ? SkeletonItems : ProductItems}
      </div>

      {!loading && hasMore && (
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={increaseProductRender}
            className="rounded-xl bg-stone-800 hover:bg-stone-900 mt-5"
          >
            Show more
          </Button>
        </div>
      )}
    </section>
  );
}

export default Products;
