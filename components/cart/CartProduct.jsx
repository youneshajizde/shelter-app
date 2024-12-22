"use client";

import useActionCart from "@/stores/cartStore";
import { CircleX, Truck } from "lucide-react";
import Image from "next/image";
import React from "react";
function CartProduct({
  name,
  img,
  category,
  discount = null,
  shipping = null,
  quantity,
}) {
  const { removeCartItem } = useActionCart();
  return (
    <div className="cart-product flex gap-2 items-start">
      <Image
        alt="cart img"
        src={img}
        width={100}
        height={100}
        className="rounded-xl object-cover"
      />
      <span className="flex flex-col space-y-2 w-full">
        <h1 className="text-sm font-medium">
          {name}{" "}
          <span className="count bg-stone-800 rounded-md px-2 text-xs text-white">
            x{quantity}
          </span>
        </h1>
        <h1 className="text-gray-300 font-medium text-xs">{category}</h1>
        <span className="flex items-center gap-2">
          {!shipping ? (
            ""
          ) : (
            <h1 className="flex items-center gap-1 bg-blue-200 rounded-lg text-blue-500 text-xs py-1 px-2">
              <Truck size={15} />
              {shipping}
            </h1>
          )}
          {!discount ? (
            ""
          ) : (
            <h1 className="flex items-center gap-1 bg-orange-200 rounded-lg text-orange-500 text-xs py-1 px-2">
              {`%${discount} Disc`}
            </h1>
          )}
        </span>
      </span>
      {/* Add Delete Icon */}
      <button className="text-gray-500 hover:text-red-500">
        <CircleX size={20} onClick={() => removeCartItem(name)} />
      </button>
    </div>
  );
}
export default CartProduct;
