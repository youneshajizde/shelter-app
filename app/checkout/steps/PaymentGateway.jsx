"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomField from "@/components/CustomField";
import useBoughtBasket from "@/stores/boughtStore";
import useActionCart from "@/stores/cartStore";
import { paymentSchema } from "@/lib/schemas";
import CreditCard from "@/components/CreditCard";

function PaymentGateway({ handleStepper, items }) {
  const { addToBasket } = useBoughtBasket();
  const { clearCart } = useActionCart();

  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: "John Doe",
      cardNumber: "1234567890123456",
      expirationDate: "12/25",
      cvv: "123",
    },
  });

  const onSubmit = (values) => {
    handleStepper();
    const itemNames = items.map((item) => item.name);
    addToBasket(itemNames);
    clearCart();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Payment Details
        </h2>

        <CreditCard />
        <CustomField
          name="cardholderName"
          label="Cardholder's Name"
          placeholder="John Doe"
          controls={form.control}
        />

        <CustomField
          name="cardNumber"
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          controls={form.control}
        />

        <div className="grid grid-cols-2 gap-6">
          <CustomField
            name="expirationDate"
            label="Expiration Date (MM/YY)"
            placeholder="MM/YY"
            controls={form.control}
          />

          <CustomField
            name="cvv"
            label="CVV"
            placeholder="123"
            controls={form.control}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-stone-800 hover:bg-stone-900"
        >
          Submit Payment
        </Button>
      </form>
    </Form>
  );
}

export default PaymentGateway;
