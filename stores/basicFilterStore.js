import { create } from "zustand";

const useBasicFilters = create((set) => ({
  checkInFilter: "",
  countyFilter: "",

  setCheckInFilter: (filter) =>
    set(() => ({
      checkInFilter: filter,
    })),

  setCountyFilter: (filter) =>
    set(() => ({
      countyFilter: filter, // Fixed: Properly returning the object
    })),

  clearCountyFilter: () =>
    set(() => ({
      countyFilter: "",
    })),

  clearCheckInFilter: () =>
    set(() => ({
      checkInFilter: "",
    })),
}));

export default useBasicFilters;
