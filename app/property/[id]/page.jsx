"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import PropertyDetails from "./components/PropertyDetails";
import PropertyImages from "./components/PropertyImages";
import { supabase } from "@/lib/supabase";

function Page({ params }) {
  const [particularProperty, setParticularProperty] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = params;

  const getParticularProperty = async () => {
    try {
      const { data: propertyData, error: propertyError } = await supabase
        .from("houses")
        .select("*")
        .eq("id", id)
        .single();

      if (propertyError) throw propertyError;

      const { data: availabilityData, error: availabilityError } =
        await supabase
          .from("availability")
          .select("check_in, check_out")
          .eq("house_id", id);

      if (availabilityError) throw availabilityError;

      setParticularProperty({
        ...propertyData,
        availability: availabilityData,
      });
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParticularProperty();
  }, []);

  return (
    <section>
      <Navbar />
      <div className="w-[90%] mx-auto">
        <BreadCrumbs />
      </div>
      <main className="property-main-page">
        {error && !loading ? (
          <div className="flex flex-col items-center justify-center mt-10 bg-red-100 text-red-600 border border-red-400 rounded-lg p-6">
            <p className="text-lg font-semibold">
              Something went wrong while fetching property details.
            </p>
          </div>
        ) : (
          <>
            <PropertyDetails
              loading={loading}
              property={particularProperty}
              availability={particularProperty?.availability}
              reservedStatus={particularProperty?.reserved_status}
            />
            <PropertyImages
              loading={loading}
              propertyImg1={particularProperty?.images[0]?.url}
              propertyImg2={particularProperty?.images[1]?.url}
              propertyImg3={particularProperty?.images[2]?.url}
              houseName={particularProperty?.name}
            />
          </>
        )}
      </main>

      <Footer />
    </section>
  );
}

export default Page;
