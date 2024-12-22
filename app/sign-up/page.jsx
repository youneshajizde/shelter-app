"use client";

import SignInForm from "@/components/forms/SignInForm";
import SignUpForm from "@/components/forms/SignUpForm";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Sign In

  return (
    <>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Sign Up" : "Sign In"}</DialogTitle>
        </DialogHeader>

        {/* Render SignUpForm or SignInForm based on state */}
        {isSignUp ? <SignUpForm /> : <SignInForm />}

        {/* Toggle between Sign Up and Sign In forms */}
        <p className="text-sm text-gray-500">
          {isSignUp ? (
            <>
              Do you have an account?{" "}
              <span
                onClick={() => setIsSignUp(false)}
                className="text-blue-500 cursor-pointer"
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setIsSignUp(true)}
                className="text-blue-500 cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </DialogContent>
    </>
  );
}
