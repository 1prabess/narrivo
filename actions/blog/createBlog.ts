"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/lib/user";
import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema";

export const createBlog = async (values: BlogSchemaType) => {
  const validatedFields = BlogSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid Fields!" };

  const { userId, isPublished } = validatedFields.data;

  const user = await getUserById(userId);

  if (!user) return { error: "No user found!" };

  await db.blog.create({ data: { ...validatedFields.data } });

  if (isPublished) return { success: "Blog published!" };

  return { success: "Blog saved" };
};
