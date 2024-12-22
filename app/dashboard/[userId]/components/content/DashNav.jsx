import Cart from "@/components/cart/Cart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function DashNav({ title }) {
  return (
    <section className="flex items-center justify-between">
      <h1 className="text-gray-800 text-2xl font-semibold">{title}</h1>

      <div className="flex items-center gap-5">
        <Cart />

        <Avatar>
          <AvatarImage
            src="https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
            alt="@shadcn"
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}

export default DashNav;
