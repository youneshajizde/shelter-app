"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import useAddFavorites from "@/stores/favoredStore";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import { useToast } from "@/hooks/useToaster";

function Product({ name, price, id, img }) {
  const { addToFavor, removeFromFavor, favorites } = useAddFavorites();
  const [favored, setFavored] = useState(false);
  const router = useRouter();
  const { token } = useAuthStore();
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    setFavored(favorites.includes(name));
  }, [favorites, name]);

  const toggleFavorite = () => {
    if (favored) {
      removeFromFavor(name);
      errorToast(name, "favorites");
    } else {
      addToFavor(name);
      successToast("Added to Favorites", name, "favorites");
    }
    setFavored(!favored);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (token) {
      toggleFavorite();
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <Link
      href={`/products/${id}`}
      className="min-h-[450px] rounded-3xl flex flex-col space-y-3"
    >
      <div className="w-full h-[80%] relative border-gray-200 border-[1px] rounded-3xl group">
        <Image
          src={img}
          alt={`${name} image`}
          width={1000}
          height={1000}
          className="w-full h-full object-cover absolute rounded-3xl transform transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={handleHeartClick}
          aria-label={favored ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
            favored ? "bg-red-500" : "bg-gray-300"
          } text-white cursor-pointer`}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="house-info flex flex-col space-y-1 font-medium">
        <h1 className="text-lg">{name}</h1>
        <h1 className="text-base text-gray-400">${price}.00</h1>
      </div>
    </Link>
  );
}

export default Product;
