import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username can't be more than 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export const paymentSchema = z.object({
  cardholderName: z
    .string()
    .min(1, "Cardholder's name is required")
    .max(50, "Name cannot exceed 50 characters"),
  cardNumber: z
    .string()
    .length(16, "Card number must be exactly 16 digits")
    .regex(/^\d+$/, "Card number must be numeric"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format"
    ),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "CVV must be numeric"),
});
