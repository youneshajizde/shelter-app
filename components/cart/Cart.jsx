"use client";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingBag } from "lucide-react";
import CartProduct from "./CartProduct";
import useActionCart from "@/stores/cartStore";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function Cart() {
  const { cart, cartTotalPrice } = useActionCart(); // Zustand favorites array
  const [addedProducts, setAddedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleCheckoutCart = () => {
    if (cart.length > 0) {
      router.push("/checkout?fromCart=true");
    }
  };

  // Extract names from the cart array
  const cartNames = cart?.map((item) => item.name) || [];

  const getAddedProducts = async () => {
    setLoading(true);
    try {
      // Fetch products whose names match the favorites array
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("name", cartNames);

      if (error) {
        console.error("Error fetching favorite products:", error);
      } else {
        setAddedProducts(data || []);
      }
    } catch (error) {
      console.error("Unexpected error fetching favorite products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddedProducts();
  }, [cart]);

  const addedItems = addedProducts?.map((product, index) => {
    // Find matching cart item to get quantity
    const cartItem = cart.find((item) => item.name === product.name);
    return (
      <CartProduct
        key={index}
        name={product?.name}
        img={product?.images[0]?.url}
        category={product?.category}
        discount={product?.discount}
        shipping={product?.shipping}
        quantity={cartItem?.quantity || 1} // Pass quantity
      />
    );
  });

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <ShoppingBag className="text-gray-400" />
        <div className="bg-red-500 text-white absolute top-0 left-[-7px] rounded-full px-1 text-xs ">
          {cart?.length || 0}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[350px]">
        <div className="w-full flex flex-col space-y-5">
          <span className="flex items-center justify-between">
            <h1 className="font-medium">My Cart ({cart?.length || 0})</h1>
            <span className="text-blue-500 font-medium text-sm">View all</span>
          </span>

          <hr className="mt-3" />

          {/* Scrollable Products Container */}
          <div className="products flex flex-col space-y-5 max-h-[300px] ">
            {loading ? (
              <p>Loading...</p>
            ) : addedItems.length > 0 ? (
              addedItems
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          <div
            className={`${
              addedItems.length <= 0 ? "hidden" : "block"
            } mt-5 flex flex-col space-y-5`}
          >
            <hr />
            <span className="text-sm text-gray-500 flex items-center gap-2">
              Total :{" "}
              <h1 className="text-black font-medium">${cartTotalPrice()}.00</h1>
            </span>
            <hr />
            <Button onClick={handleCheckoutCart} className="!mt-5">
              purchase all
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Cart;
