import { z } from "zod";

const addRoleSchema = z.object({
    email: z.string().min(1, { message: "Email address is required" }).email(),
});

type TAddRole = z.infer<typeof addRoleSchema>;

export { addRoleSchema, type TAddRole };
