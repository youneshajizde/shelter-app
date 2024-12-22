import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Testimonial({ opinion }) {
  return (
    <div className="bg-gray-100 w-full h-[400px] rounded-3xl p-5 flex flex-col space-y-7">
      <div className="flex items-center justify-between">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <span className="border-[1px] border-gray-400 rounded-full px-3 py-1 text-xs text-gray-500">
          Premium
        </span>
      </div>

      <span className="font-bold text-3xl text-gray-500 ">“</span>

      <p className="font-medium text-xl text-ellipsis overflow-hidden line-clamp-5">
        {opinion}
      </p>

      <span className="flex flex-col space-y-2 font-medium text-sm">
        <h1>Denis Casablanca</h1>
        <h1 className="text-gray-400">CTO</h1>
      </span>
    </div>
  );
}

export default Testimonial;
