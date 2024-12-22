import { calculateCheckoutPrice } from "@/lib/utils";
import React from "react";

function ProductSummary({ items, handleStepper }) {
  const { subtotal, totalShipping, total } = calculateCheckoutPrice(items);

  const readyToBuyItems = items?.map((item, index) => (
    <li key={index} className="flex items-center justify-between border-b pb-4">
      <div>
        <p className="font-medium text-gray-800">{item?.name}</p>
        <p className="text-sm text-gray-600">Quantity: {item?.quantity}</p>
      </div>
      <p className="font-medium text-gray-800">${item?.price}.00</p>
    </li>
  ));

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Products</h3>
        <ul className="product-detail-style">{readyToBuyItems}</ul>
      </div>

      <div className="pt-6 mb-6">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>${totalShipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="w-full py-3 text-white bg-stone-800 hover:bg-stone-900 rounded-lg font-medium transition"
        onClick={handleStepper}
      >
        Continue
      </button>
    </div>
  );
}

export default ProductSummary;
