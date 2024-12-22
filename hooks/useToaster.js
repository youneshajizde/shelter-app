import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";

export const useToast = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const successToast = (title, item, tab) => {
    toast.success(title, {
      description: `You just added the ${item} to your ${tab} tab in the dashboard!`,
      action: {
        label: "Dashboard",
        onClick: () => router.push(`/dashboard/${user?.id}/${tab}`),
      },
    });
  };

  const errorToast = (item, tab) => {
    toast.error(`Removed from ${tab}`, {
      description: `You just removed the ${item} from your ${tab} tab!`,
    });
  };

  return { successToast, errorToast };
};
