// store/authStore.js
import { supabase } from "@/lib/supabase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Stores the user data
      token: null, // Stores the authentication token

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      signUp: async ({ email, password, username }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        });

        if (error) {
          console.error("Sign-up error:", error.message);
          return { success: false, error: error.message };
        }

        set({ user: data.user });
        return { success: true, data: data.user };
      },

      signIn: async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          set({ user: data.user, token: data.session.access_token });
        } catch (error) {
          console.error("Sign-in error:", error.message);
          set({ error: error.message });
        }
      },

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-store", // Key for localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // Persist only 'user' and 'token'
    }
  )
);

export default useAuthStore;
