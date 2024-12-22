import React from "react";
import { Pyramid } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white py-16 px-8 text-gray-800 shadow-lg border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between space-y-12 lg:space-y-0">
        {/* Logo and Main Title */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <div className="flex items-center space-x-4">
            <Pyramid size={50} />
            <h1 className="text-6xl font-extrabold tracking-widest">SHELTER</h1>
          </div>
          <p className="text-gray-500 text-center lg:text-left">
            Discover a sanctuary of inspiration and guidance.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex justify-center lg:justify-start space-x-16">
          <div>
            <h2 className="text-xl font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact and Social Section */}
        <div className="flex flex-col items-center lg:items-start space-y-6">
          <h2 className="text-xl font-semibold">Stay Connected</h2>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-600"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.36 5.64a9 9 0 11-12.72 0M12 7v8m0 0l-3.6-3.6m3.6 3.6l3.6-3.6"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16.32 3.32a9 9 0 11-8.64 0"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Shelter Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
