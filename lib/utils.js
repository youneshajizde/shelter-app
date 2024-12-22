import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const discountedPrice = (price, discount) => {
  const discountedAmount = (price * discount) / 100;
  const finalPrice = price - discountedAmount;
  return finalPrice;
};

export const flatItOut = (price) => {
  return price;
};

export const finalCheckoutPrice = (price) => {
  const finalPrice = 12 + 5 + Number(price);

  return finalPrice;
};

export const finalCheckOutPriceDynamic = (
  price,
  shipping = 0,
  discount = 0
) => {
  // Ensure inputs are numbers
  const numericPrice = Number(price);
  const numericShipping = Number(shipping);
  const numericDiscount = Number(discount);

  if (isNaN(numericPrice) || isNaN(numericShipping) || isNaN(numericDiscount)) {
    throw new Error(
      "Invalid input: price, shipping, and discount must be numbers."
    );
  }

  // Calculate the discounted price if a valid discount is provided
  const discountedPrice =
    numericDiscount > 0
      ? numericPrice - (numericPrice * numericDiscount) / 100
      : numericPrice;

  // Add shipping cost
  return discountedPrice + numericShipping;
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function calculateCheckoutPrice(items) {
  if (!items || items.length === 0)
    return { subtotal: 0, totalShipping: 0, total: 0 };

  const { subtotal, totalShipping } = items.reduce(
    (acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      const hasShipping = item.shipping || false;

      // Apply discounts

      acc.subtotal += price * quantity;

      // Add shipping fee if applicable
      if (hasShipping) {
        acc.totalShipping += 15 * quantity;
      }

      return acc;
    },
    { subtotal: 0, totalShipping: 0 }
  );

  const total = subtotal + totalShipping;

  return { subtotal, totalShipping, total };
}
