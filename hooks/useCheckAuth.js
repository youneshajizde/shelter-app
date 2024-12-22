import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCheckAuth = (redirectPath = "/") => {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push(redirectPath);
    }
  }, [token, router, redirectPath]);

  return token;
};
