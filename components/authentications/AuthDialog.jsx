"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import SignUpForm from "../forms/SignUpForm";
import SignInForm from "../forms/SignInForm"; // Assuming this component exists

function AuthDialog() {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Sign In

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-stone-900 rounded-full text-white text-[0.50rem] md:text-sm font-light"
        >
          SIGN UP
        </Button>
      </DialogTrigger>
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
    </Dialog>
  );
}

export default AuthDialog;
