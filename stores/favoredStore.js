import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAddFavorites = create(
  persist(
    (set) => ({
      favorites: [],

      addToFavor: (item) =>
        set((state) => ({
          favorites: [...state.favorites, item],
        })),
      removeFromFavor: (item) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== item),
        })),
    }),

    {
      name: "favorite-store",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

export default useAddFavorites;
