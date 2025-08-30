import z from "zod";

export const BlogSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .nonempty({ message: "Title cannot be empty!" })
    .min(5, { message: "Title is too short!" })
    .max(55, { message: "Title is too long!" }),
  content: z.string().nonempty({ message: "Content cannot be empty!" }),
  coverImage: z.string().optional(),
  isPublished: z.boolean(),
  tags: z
    .array(z.string())
    .nonempty({ message: "Please select a tleast one tag!" }),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
