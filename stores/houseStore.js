import { create } from "zustand";

const useReserveHouse = create((set) => ({
  reservedHouses: [],

  addToReserved: (item) =>
    set((state) => ({
      reservedHouses: [...state.reservedHouses, item],
    })),
}));

export default useReserveHouse;
