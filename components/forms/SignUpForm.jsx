"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomField from "../CustomField";
import { signUpSchema } from "@/lib/schemas";
import useAuthStore from "@/stores/authStore";

function SignUpForm() {
  const { signUp } = useAuthStore(); // Access the signUp method
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { success, error } = await signUp(values);
    if (success) {
      console.log("Sign-up successful!");
    } else {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          name="username"
          label="Username"
          placeHolder="Jonas Miscavige"
          controls={form.control}
        />
        <CustomField
          name="email"
          label="Email"
          placeHolder="Jonas@gmail.com"
          controls={form.control}
        />
        <CustomField
          name="password"
          label="Password"
          placeHolder="12356"
          controls={form.control}
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
