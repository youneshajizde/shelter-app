import React from "react";
import { CreditCard, RocketIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { discountedPrice } from "@/lib/utils";
import useActionCart from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";

export const detailSkeleton = (
  <div className="flex flex-col justify-between space-y-10 h-full"></div>
);

function ProductDetail({
  id,
  name,
  price,
  discount,
  category,
  loading,
  shipping,
}) {
  const { token } = useAuthStore();
  const { addToCart } = useActionCart();
  const router = useRouter();
  const buyItNow = () => {
    if (!token) {
      router.push("/sign-up");
    } else {
      const finalPrice = discount
        ? Math.floor(discountedPrice(price, discount))
        : price;
      const params = new URLSearchParams({
        id,
        name,
        price: finalPrice,
        discount,
      }).toString();

      router.push(`/checkout?${params}`);
    }
  };

  const handleCart = () => {
    if (!token) {
      router.push("/sign-up");
    } else {
      const finalPrice = discount
        ? Math.floor(discountedPrice(price, discount))
        : price;
      addToCart({
        name,
        price: finalPrice,
        category,
        discount,
        shipping,
      });
    }
  };

  if (loading) {
    return detailSkeleton;
  }

  return (
    <div className="flex flex-col justify-between space-y-10 h-full">
      <div className="p-details flex flex-col space-y-8">
        <h1 className="text-2xl font-medium">{name}</h1>
        <h1 className="rounded-full border-[1px] border-black px-3 py-1 w-24 text-center text-sm">
          {category}
        </h1>
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the CLI.
          </AlertDescription>
        </Alert>
        <span className="flex items-center gap-5 text-lg">
          <p className="font-medium text-4xl">
            {discount ? Math.floor(discountedPrice(price, discount)) : price}
            .00$
          </p>
          <p className="text-gray-400 line-through">
            {discount ? `${price}.00$` : ""}
          </p>
        </span>
      </div>

      <div className="flex items-center w-full gap-3">
        <Button
          onClick={() => handleCart()}
          className="px-5 py-2 bg-stone-800 hover:bg-black"
        >
          Add to cart <ShoppingCart />
        </Button>
        <Button
          onClick={() => buyItNow()}
          className="px-5 py-2 bg-transparent border-stone-800 border-[1px] hover:bg-black text-black hover:text-white"
        >
          Buy it now <CreditCard />
        </Button>
      </div>
    </div>
  );
}

export default ProductDetail;
