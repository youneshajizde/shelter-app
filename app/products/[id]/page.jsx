"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import ProductDetail from "./components/ProductDetail";
import BreadCrumbs from "@/components/BreadCrumbs";
import { supabase } from "@/lib/supabase";
import SimilarProducts from "./components/SimilarProducts";

function Page({ params }) {
  const [particularProduct, setParticularProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  const getParticularProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching product:", error);
        setError(true);
      } else {
        setParticularProduct(data[0]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParticularProduct();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Failed to load product. Please try again later.</p>
      </div>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="w-[90%] mx-auto">
        <BreadCrumbs />
      </div>
      <div className="flex flex-col space-y-20 mt-24">
        <main className="grid grid-cols-1 md:grid-cols-2 w-[90%] mx-auto mt-10 gap-4">
          <ImageGallery imgs={particularProduct?.images} />
          <ProductDetail
            loading={loading}
            id={particularProduct?.id}
            name={particularProduct?.name}
            price={particularProduct?.price}
            discount={particularProduct?.discount}
            category={particularProduct?.category}
            shipping={particularProduct?.shipping}
          />
        </main>
        <main className="w-[90%] mx-auto flex flex-col space-y-8">
          <h1 className="text-2xl font-semibold">Similar Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
            <SimilarProducts category={particularProduct?.category} />
          </div>
        </main>
      </div>
      <Footer />
    </section>
  );
}

export default Page;
