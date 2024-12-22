import useBasicFilters from "@/stores/basicFilterStore";
import useNavCatStore from "@/stores/navCatStore";

const { supabase } = require("@/lib/supabase");
const { useState } = require("react");

export const useGetHouses = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();
  const [houses, setHouses] = useState();
  let { navFilters } = useNavCatStore();
  let { countyFilter, checkInFilter } = useBasicFilters();

  const getHouses = async () => {
    setLoading(true);
    try {
      let query = supabase.from("products").select("*").eq();

      if (housesError) throw error;

      if (navFilters) {
        query = query.eq("type", navFilters);
      }

      setHouses(houses);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHouses();
  }, []);
};
