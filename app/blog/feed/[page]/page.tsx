import { getPublishedBlogs } from "@/actions/blog/getPublishedBlogs";
import ListBlogs from "@/components/blog/ListBlogs";
import { Alert, AlertTitle } from "@/components/ui/alert";
import React from "react";

const Feed = async ({ params }: { params: Promise<{ page: string }> }) => {
  const { page } = await params;
  const currentPage = Number(page);

  const { success, error } = await getPublishedBlogs({
    page: currentPage,
    limit: 5,
  });

  if (error)
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Fetching blogs</AlertTitle>
      </Alert>
    );

  if (!success)
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Fetching blogs</AlertTitle>
      </Alert>
    );

  const { blogs, hasMore } = success;
  return (
    <div>
      <ListBlogs blogs={blogs} hasMore={hasMore} currentPage={currentPage} />
    </div>
  );
};

export default Feed;
