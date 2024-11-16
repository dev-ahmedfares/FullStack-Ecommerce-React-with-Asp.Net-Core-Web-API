import { z } from "zod";

const signInSchema = z.object({
    userName: z.string().min(1, { message: "username is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
  });


  type signInType = z.infer<typeof signInSchema>


  export {type signInType,signInSchema}