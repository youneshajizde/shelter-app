import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBoughtBasket = create(
  persist(
    (set) => ({
      basket: [],

      addToBasket: (items) =>
        set((state) => ({
          basket: [...state.basket, items],
        })),
    }),
    {
      name: "bought-basket",
    }
  )
);

export default useBoughtBasket;
