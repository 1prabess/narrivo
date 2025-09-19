import { getBlogById } from "@/actions/blog/getBlogById";
import BlogForm from "@/components/blog/BlogForm";
import Container from "@/components/layout/Container";
import { Alert, AlertTitle } from "@/components/ui/alert";

const EditBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

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
    <div>
      <Container>
        <BlogForm blog={blog} />
      </Container>
    </div>
  );
};

export default EditBlog;
