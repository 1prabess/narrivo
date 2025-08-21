import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must have minimum of 6 characters" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
