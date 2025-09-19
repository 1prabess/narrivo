import Image from "next/image";
import { BlogWithUser } from "./ListBlogs";
import Link from "next/link";
import UserSummary from "./UserSummary";
import Tag from "../common/Tag";
import Reactions from "./Reactions";

interface BlogCardProps {
  blog: BlogWithUser;
  isUserProfile: boolean;
}

const BlogCard = ({ blog, isUserProfile }: BlogCardProps) => {
  return (
    <div className="border-b border-slate-300 dark:border-slate-700 py-6 cursor-pointer">
      <UserSummary user={blog.user} createdDate={blog.createdAt} />

      <div className="my-2 flex justify-between gap-6">
        <div className="flex flex-col justify-between w-full">
          <Link
            href={`/blog/${blog.id}`}
            className="text-2xl sm:text-5xl font-bold"
          >
            {blog.title}
          </Link>

          {!!blog.tags.length && (
            <div className="flex flex-wrap gap-2 mt-1">
              {blog.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <Reactions />
        </div>

        {blog.coverImage && (
          <Link
            href={`/blog/${blog.id}`}
            className="relative overflow-hidden  flex-shrink-0 w-[120px] sm:w-[200px] h-[80px] sm:h-[120px]"
          >
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
