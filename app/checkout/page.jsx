"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import ProductSummary from "./steps/ProductSummary";
import ShippingDetails from "./steps/ShippingDetails";
import PaymentGateway from "./steps/PaymentGateway";
import Confirmation from "./steps/Confirmation";
import { useRouter, useSearchParams } from "next/navigation";
import useBoughtBasket from "@/stores/boughtStore";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import useActionCart from "@/stores/cartStore";

function page() {
  const token = useCheckAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutItems, setCheckoutItems] = useState();
  const [isCartCheckout, setIsCartCheckout] = useState(false);

  const handleStepper = () => {
    setCurrentStep(currentStep + 1);
  };

  const { cart, cartTotalPrice } = useActionCart();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const quantity = searchParams.get("quantity");
  const discounts = searchParams.get("discount");
  const fromCart = searchParams.get("fromCart") === "true";
  console.log("this is my cart : ", cart);
  useEffect(() => {
    if (fromCart) {
      setIsCartCheckout(true);
      setCheckoutItems(cart);
    } else {
      setIsCartCheckout(false);
      setCheckoutItems([
        {
          id,
          name,
          price,
          quantity,
          discounts,
        },
      ]);
    }
  }, []);

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
        <PaymentGateway items={checkoutItems} handleStepper={handleStepper} />
      );
      break;

    case 4:
      renderedStep = (
        <Confirmation
          name={name}
          price={price}
          quantity={quantity}
          handleStepper={handleStepper}
        />
      );
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

export default page;
