import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const useGetProducts = (productLimit, selected) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data, error, count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .eq("category", selected)
        .limit(productLimit);

      if (error) throw error;

      setProducts(data || []);
      setHasMore(data.length < count); // Check if there are more products to load
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to fetch the products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [productLimit, selected]);

  return { products, loading, error, hasMore };
};
