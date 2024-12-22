import { create } from "zustand";

const useNavCatStore = create((set) => ({
  navFilters: null,

  catChange: (cat) => set({ navFilters: cat }),
  clearCat: () => set({ navFilters: null }),
}));

export default useNavCatStore;
