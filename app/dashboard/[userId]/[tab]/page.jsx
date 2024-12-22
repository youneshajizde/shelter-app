"use client";

import React, { useEffect } from "react";
import {
  LogOut,
  Pyramid,
  FileHeart,
  PackageSearch,
  List,
  LayoutPanelLeft,
} from "lucide-react";
import Link from "next/link";
import MyRequests from "../components/content/MyRequests";
import MyProducts from "../components/content/MyProducts";
import MyFavorites from "../components/content/MyFavorites";
import { usePathname, useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import useAuthStore from "@/stores/authStore";
import DashNav from "../components/content/DashNav";

function page() {
  const token = useCheckAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const selectedTab = pathname.split("/")[3] || "request";
  const renderTabContent = () => {
    switch (selectedTab.toLowerCase()) {
      case "requests":
        return <MyRequests />;
      case "products":
        return <MyProducts />;
      case "favorites":
        return <MyFavorites />;
      default:
        return <div>Invalid tab</div>;
    }
  };
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className=" border-r-[1px] border-gray-300 text-stone-900 w-16 md:w-1/5 fixed h-full flex flex-col items-start justify-between py-8 px-2 md:px-4">
        {/* Logo */}
        <div className="text-green-800 flex items-center gap-2 mb-8 pl-4 font-bold">
          <Link href="/">
            <Pyramid size={25} />
          </Link>
          <span className="hidden md:inline">SHELTER</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-col items-start justify-center space-y-8 w-full pl-4">
          <Link
            href={`/dashboard/${user?.id}/requests`}
            className={`flex items-center space-x-3 transition-all ${
              selectedTab === "requests" ? "" : "text-gray-400"
            }`}
          >
            <List
              className={`w-6 h-6 ${
                selectedTab === "requests" ? "bg-green-700" : "bg-gray-300"
              }  text-white p-1 rounded-md`}
            />
            <span className="hidden md:inline text-sm font-semibold ">
              Requests
            </span>
          </Link>

          <Link
            href={`/dashboard/${user?.id}/products`}
            className={`flex items-center space-x-3 transition-all ${
              selectedTab === "products" ? "" : "text-gray-400"
            }`}
          >
            <PackageSearch
              className={`w-6 h-6 ${
                selectedTab === "products" ? "bg-blue-700" : "bg-gray-300"
              }  text-white p-1 rounded-md`}
            />
            <span className="hidden md:inline text-sm font-semibold">
              Products
            </span>
          </Link>

          <Link
            href={`/dashboard/${user?.id}/favorites`}
            className={`flex items-center space-x-3 transition-all ${
              selectedTab === "favorites" ? "" : "text-gray-400"
            }`}
          >
            <FileHeart
              className={`w-6 h-6 ${
                selectedTab === "favorites" ? "bg-pink-700" : "bg-gray-300"
              }  text-white p-1 rounded-md`}
            />
            <span className="hidden md:inline text-sm font-semibold">
              Favorites
            </span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="flex flex-col items-start space-y-5">
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-3 text-stone-900 hover:text-green-500 transition pl-4 mb-4"
          >
            <LayoutPanelLeft className="w-5 h-5" />
            <span className="hidden md:inline text-sm font-semibold">Home</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-stone-900 hover:text-red-500 transition pl-4 mb-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline text-sm font-semibold">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-16 md:ml-[20%] w-[calc(100%-4rem)] md:w-[80%] bg-gray-50 p-8 overflow-y-auto">
        <DashNav />
        {/* Render the correct content based on the tab */}
        {renderTabContent()}
      </main>
    </div>
  );
}

export default page;
