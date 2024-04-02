import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),

  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SignupSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Enter valid email",
    }),
  password: z.string().min(6, {
    message: "Minimum password length required is 6",
  }),
});
