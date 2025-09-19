import { getBlogById } from "@/actions/blog/getBlogById";
import { auth } from "@/auth";
import BlogEditorWrapper from "@/components/blog/editor/BlockEditorWrapper";

import Reactions from "@/components/blog/Reactions";
import UserSummary from "@/components/blog/UserSummary";
import Tag from "@/components/common/Tag";
import Container from "@/components/layout/Container";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import Link from "next/link";

const BlogContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const { success, error } = await getBlogById(id);

  if (error || !success) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Fetching blogs</AlertTitle>
      </Alert>
    );
  }

  const blog = success.blog;

  return (
    <div className="flex max-w-[950px] px-4 sm:px-0 w-full mx-auto flex-col m-auto">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-[25vh] md:h-[30vh]">
          <Image
            src={blog.coverImage}
            fill
            alt="Cover Image"
            className="object-cover "
          />
        </div>
      )}

      {/* User Summary + Edit Link */}
      <div className="flex justify-between items-center my-4">
        {blog.user && (
          <UserSummary user={blog.user} createdDate={blog.createdAt} />
        )}
        {session?.user.userId === blog.userId && (
          <Link className="text-orange-400" href={`/blog/edit/${blog.id}`}>
            Edit
          </Link>
        )}
      </div>

      {/* Reactions */}
      <div className="flex flex-col gap-2 mb-2">
        <Separator />
        <Reactions />
        <Separator />
      </div>

      {/* Title */}
      <h2 className="text-5xl sm:text-6xl md:text-7xl mt-4 font-bold">
        {blog.title}
      </h2>

      {/* Tags */}
      {!!blog.tags.length && (
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          {blog.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <Separator />

      {/* Blog Content */}
      <div className="mt-4">
        <BlogEditorWrapper content={blog.content} />
      </div>
    </div>
  );
};

export default BlogContent;
