"use client";

import React, { useEffect, useState } from "react";
import House from "./House";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "../ui/skeleton";
import { Element } from "react-scroll";
import useNavCatStore from "@/stores/navCatStore";
import useBasicFilters from "@/stores/basicFilterStore";
import { formatDate } from "@/lib/utils";

function Houses({ title }) {
  const [shelters, setShelters] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [productLimit, setProductLimit] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  let { navFilters } = useNavCatStore();
  let { countyFilter, checkInFilter } = useBasicFilters();

  const getShelters = async () => {
    try {
      let query = supabase
        .from("houses")
        .select("*", { count: "exact" })
        .limit(productLimit)
      if (navFilters) {
        query = query.eq("type", navFilters);
      }

      // Apply county filter
      if (countyFilter) {
        query = query.eq("county", countyFilter);
      }

      // Handle check-in filter by fetching matching house IDs from the availability table
      if (checkInFilter) {
        const formattedCheckInDate = formatDate(checkInFilter);

        const { data: availabilityData, error: availabilityError } =
          await supabase
            .from("availability")
            .select("house_id")
            .eq("check_in", formattedCheckInDate);

        if (availabilityError) {
          console.error("Error fetching availability data:", availabilityError);
          setError("Failed to filter by check-in date.");
          return;
        }

        const houseIds = availabilityData.map((item) => item.house_id);

        if (houseIds.length > 0) {
          query = query.in("id", houseIds);
        } else {
          setShelters([]);
          setHasMore(false);
          setLoading(false);
          return;
        }
      }

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching houses:", error);
        setError("Failed to fetch shelters...");
      } else {
        setShelters(data);
        setHasMore(data.length < count);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementShelters = () => {
    setProductLimit((prevLimit) => prevLimit + 3);
  };

  const skeletonItems = Array.from({ length: productLimit }).map((_, index) => (
    <Skeleton key={index} className={"min-h-[300px] rounded-3xl"}></Skeleton>
  ));

  useEffect(() => {
    getShelters();
  }, [productLimit, navFilters, countyFilter, checkInFilter]);

  const shelterItems = shelters?.map((shelter, index) => (
    <House
      id={shelter?.id}
      key={index}
      region={shelter?.region}
      address={shelter?.name}
      price={shelter?.price}
      type={shelter?.type}
      imgUrls={shelter?.images?.map((img) => img.url)}
    />
  ));
  return (
    <Element name="houses-section">
      <div className="text-2xl font-semibold">
        <h1>{title}</h1>
      </div>

      <div className="houses-container">
        {!loading ? shelterItems : skeletonItems}
      </div>

      <div className="w-full flex items-center justify-center">
        {error && error}
        {!loading && hasMore && (
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={handleIncrementShelters}
              className="rounded-xl bg-stone-800 hover:bg-stone-900 mt-5"
            >
              Show more
            </Button>
          </div>
        )}
      </div>
    </Element>
  );
}

export default Houses;
