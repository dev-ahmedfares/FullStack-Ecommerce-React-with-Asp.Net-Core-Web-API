import { z } from "zod";

const changePasswordSchema = z.object({
  userName: z.string().optional(),
  email: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 character" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/^(?=.*[A-Z])(?=.*[\W]).+$/, {
      message:
        "password must contain at least one special character and one Capital letter",
    }),
});

type TChangePasswordForm = z.infer<typeof changePasswordSchema>;

export { changePasswordSchema, type TChangePasswordForm };
