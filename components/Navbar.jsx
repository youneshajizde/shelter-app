"use client";

import React from "react";
import { Pyramid } from "lucide-react";
import { links } from "@/lib/constants";
import NextLink from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Cart from "./cart/Cart";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import useNavCatStore from "@/stores/navCatStore";
import useAuthStore from "@/stores/authStore";
import { Button } from "./ui/button";
import useAddFavorites from "@/stores/favoredStore";
import useBoughtBasket from "@/stores/boughtStore";

function Navbar() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { catChange } = useNavCatStore();
  const { favorites } = useAddFavorites();
  const { basket } = useBoughtBasket();
  return (
    <section className="fixed z-50 bg-white w-full mx-auto py-6">
      <main className="w-[90%] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NextLink href={"/"}>
              <Pyramid size={25} />
            </NextLink>
            <h1 className="text-base font-medium ml-3">SHELTER</h1>
          </div>

          <ul className="navbar-links-big-screen">
            {links.map((link, index) => (
              <ScrollLink
                key={index}
                to="houses-section"
                spy={true}
                smooth={true}
                offset={-100} // Adjust this value to match your Navbar height
                duration={500}
                onClick={() => catChange(link.value)}
                className="cursor-pointer hover:text-stone-800 transition-all"
              >
                {link.label}
              </ScrollLink>
            ))}
          </ul>

          {/* Avatar and Cart */}
          <div className="flex items-center gap-5">
            {!user ? (
              <Button
                onClick={() => router.push("/sign-up")}
                className="bg-stone-800 text-white rounded-full"
              >
                SIGN UP
              </Button>
            ) : (
              <>
                <Cart className="text-red-600" />
                <Avatar
                  className={`${
                    favorites.length === 0 && basket.length === 0
                      ? ""
                      : "border-[3px] border-blue-500 transition-all"
                  } cursor-pointer`}
                  onClick={() => router.push(`/dashboard/${user?.id}/requests`)}
                >
                  <AvatarImage
                    src={
                      user?.profileImage || // Use user's profile image if available
                      "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
                    }
                    alt={user?.name || "@user"}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        </div>

        <ul className="navbar-links-small-screen">
          {links.map((link, index) => (
            <ScrollLink
              key={index}
              to="houses-section"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={() => catChange(link.value)}
              className="hover:text-black transition-all cursor-pointer"
            >
              {link.label}
            </ScrollLink>
          ))}
        </ul>
      </main>
    </section>
  );
}

export default Navbar;
