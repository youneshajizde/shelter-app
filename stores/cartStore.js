import { create } from "zustand";
import { persist } from "zustand/middleware";

const useActionCart = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (cartItem) => cartItem.name === item.name
          );

          if (existingItemIndex !== -1) {
            // Update quantity of existing item
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += item.quantity || 1;
            return { cart: updatedCart };
          }

          // Add new item with default quantity 1
          return {
            cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
          };
        }),

      // Remove a specific item from the cart
      removeCartItem: (name) =>
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.name !== name),
        })),

      // Clear the entire cart
      clearCart: () =>
        set(() => ({
          cart: [],
        })),

      // Calculate the total price of the cart
      cartTotalPrice: () => {
        const { cart } = get(); // Access the current state
        return cart.reduce((total, item) => {
          const price = Number(item.price) || 0; // Ensure price is a number
          const quantity = Number(item.quantity) || 1; // Use quantity or default to 1
          return total + price * quantity;
        }, 0); // Start with a total of 0
      },
    }),

    {
      name: "cart-store",
      partialize: (state) => ({ cart: state.cart }), // Persist only the cart
    }
  )
);

export default useActionCart;
