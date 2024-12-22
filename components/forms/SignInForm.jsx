import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { signInSchema } from "@/lib/schemas";
import CustomField from "../CustomField";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";

function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuthStore();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await signIn(values.email, values.password);
      router.push("/");
    } catch (error) {
      alert("error happened");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          name={"email"}
          label={"Email"}
          placeHolder={"Jonas@gmail.com"}
          controls={form.control}
        />
        <CustomField
          name={"password"}
          label={"Password"}
          placeHolder={"12356"}
          controls={form.control}
        />
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
