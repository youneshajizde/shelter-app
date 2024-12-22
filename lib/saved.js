"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import ProductSummary from "./steps/ProductSummary";
import ShippingDetails from "./steps/ShippingDetails";
import PaymentGateway from "./steps/PaymentGateway";
import Confirmation from "./steps/Confirmation";
import { useSearchParams } from "next/navigation";
import useBoughtBasket from "@/stores/boughtStore";
import useActionCart from "@/stores/cartStore";

function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isCartCheckout, setIsCartCheckout] = useState(false);

  const { cart, cartTotalPrice } = useActionCart(); // Access cart state
  const searchParams = useSearchParams();

  // Extract query parameters for "Buy It Now"
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const quantity = searchParams.get("quantity");
  const discount = searchParams.get("discount");
  const fromCart = searchParams.get("fromCart") === "true";

  useEffect(() => {
    // Check if it's a "Cart Checkout" or "Buy It Now"
    if (fromCart) {
      setIsCartCheckout(true);
      setCheckoutItems(cart); // Use cart items for checkout
    } else {
      setIsCartCheckout(false);
      // Use "Buy It Now" product details for checkout
      setCheckoutItems([
        {
          id,
          name,
          price,
          quantity,
          discount,
        },
      ]);
    }
  }, [fromCart, cart, id, name, price, quantity, discount]);

  const handleStepper = () => {
    setCurrentStep(currentStep + 1);
  };

  // Determine the step content
  let renderedStep = "";
  switch (currentStep) {
    case 1:
      renderedStep = (
        <ProductSummary
          items={checkoutItems}
          totalPrice={isCartCheckout ? cartTotalPrice() : price * quantity}
          handleStepper={handleStepper}
        />
      );
      break;
    case 2:
      renderedStep = <ShippingDetails handleStepper={handleStepper} />;
      break;
    case 3:
      renderedStep = (
        <PaymentGateway
          items={checkoutItems}
          totalPrice={isCartCheckout ? cartTotalPrice() : price * quantity}
          handleStepper={handleStepper}
        />
      );
      break;
    case 4:
      renderedStep = <Confirmation handleStepper={handleStepper} />;
      break;
    default:
      break;
  }

  return (
    <section>
      <Navbar />
      <div className="w-[90%] mx-auto flex items-center justify-center pt-[150px] flex-col space-y-5">
        <ul className="checkout-steps">
          <li className={`${currentStep === 1 ? "text-black" : ""}`}>
            Summary
          </li>
          <li className={`${currentStep === 2 ? "text-black" : ""}`}>
            Details
          </li>
          <li className={`${currentStep === 3 ? "text-black" : ""}`}>
            Payment
          </li>
          <li className={`${currentStep === 4 ? "text-black" : ""}`}>
            Confirmation
          </li>
        </ul>

        {renderedStep}
      </div>
      <Footer />
    </section>
  );
}

export default CheckoutPage;