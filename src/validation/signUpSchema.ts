import { z } from "zod";

const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(1, { message: "username is required" })
      .regex(/^\S+$/, { message: "username must not contain any space" }),
    email: z.string().min(1, { message: "Email address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .regex(/^(?=.*[A-Z])(?=.*[\W]).+$/, {
        message:
          "password must contain at least one special character and one Capital letter",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

type TFormInputs = z.infer<typeof signUpSchema>;

export { signUpSchema, type TFormInputs };
