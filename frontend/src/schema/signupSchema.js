import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });