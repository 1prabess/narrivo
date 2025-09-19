"use server";

import { db } from "@/lib/db";

export const getPublishedBlogs = async ({ page = 1, limit = 5 }) => {
  const skip = (page - 1) * limit;

  try {
    const blogs = await db.blog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      where: { isPublished: true },

      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    const totalBlogs = await db.blog.count({
      where: {
        isPublished: true,
      },
    });

    const hasMore = totalBlogs > page * limit;

    return { success: { blogs, hasMore } };
  } catch (error) {
    console.log("Error in getPublishedBlogs!");
    return { error: "Failed to fetch blogs" };
  }
};
