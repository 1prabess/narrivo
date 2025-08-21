import z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must be minimum of 4 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must have minimum of 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password must match!",
      path: ["confirmPassword"],
    }
  );

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
