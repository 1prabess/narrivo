import { db } from "@/lib/db";
import { success } from "zod";

export const getBlogById = async (blogId: string) => {
  try {
    if (!blogId) return { error: "blogId is required" };

    const blog = await db.blog.findFirst({
      where: {
        id: blogId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!blog) return { error: "Blog not found" };

    return { success: { blog } };
  } catch (error) {
    console.log("Error in getBlogById");
    return { error: "Error fetching the blog!" };
  }
};
