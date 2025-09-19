"use server";

import { db } from "@/lib/db";
import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema";

export const editBlog = async (values: BlogSchemaType, blogId: string) => {
  try {
    const validatedFields = BlogSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    if (!blogId) return { error: "BlogId is required!" };

    const blog = await db.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) return { error: "No blog found!" };

    await db.blog.update({
      where: { id: blogId },
      data: {
        ...validatedFields.data,
      },
    });

    return { success: "Blog edited successfully!" };
  } catch (error) {
    console.log("Error in editBlog!" + error);
    return { error: "Failed to edit blog!" };
  }
};
