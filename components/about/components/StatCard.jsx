"use client";
import React from "react";
import { motion } from "framer-motion";
function StatCard({ title, description }) {
  return (
    <motion.div
    whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        background: "bg-stone-700",
        padding: "1rem",
        borderRadius: "20px",
        display: "inline-block",
      }}
    className="card bg-gray-100 w-full h-48 rounded-3xl font-medium p-5 flex items-center justify-center text-left hover:bg-stone-700 hover:text-white transition-all cursor-help">
      <div className="flex flex-col space-y-5 font-semibold">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default StatCard;
