"use client";

import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import AddCoverImage from "./AddCoverImage";
import { useEffect, useState } from "react";
import CoverImage from "./CoverImage";
import { tags } from "@/lib/tags";
import dynamic from "next/dynamic";
import "@blocknote/mantine/style.css";
import Button from "../common/Button";

const BlockNoteEditor = dynamic(
  () => import("../blog/editor/BlockNoteEditor"),
  { ssr: false }
);

const BlogForm = () => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [uploadedCover, setUploadedCover] = useState<string>();
  const [content, setContent] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      userId,
      isPublished: false,
      coverImage: "",
      content: "",
      tags: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (uploadedCover)
      setValue("coverImage", uploadedCover, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
  }, [uploadedCover]);

  useEffect(() => {
    if (content)
      setValue("content", content, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
  }, [content]);

  const onContentChange = (value: string) => {
    setContent(value);
  };

  const onSubmit = (data: BlogSchemaType) => {
    console.log("Form data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between m-auto min-h-[100vh]"
    >
      <div>
        {uploadedCover && (
          <CoverImage
            url={uploadedCover}
            isEditor
            setUploadedCover={setUploadedCover}
          />
        )}

        {!uploadedCover && (
          <AddCoverImage setUploadedCover={setUploadedCover} />
        )}

        <FormField
          id="title"
          placeholder="Blog Title"
          register={register}
          errors={errors}
          inputClassNames="border-none text-7xl text-black dark:text-white font-bold bg-transparent px-0"
        />

        <fieldset className="flex flex-col border-y mb-4 py-2">
          <legend className="mb-2 pr-2">Select Tags</legend>
          <div className="flex gap-4 flex-wrap w-full">
            {tags.map((tag) => {
              if (tag === "All") return null;
              return (
                <label key={tag} className="flex items-center space-x-2">
                  <input type="checkbox" value={tag} {...register("tags")} />
                  <span>{tag}</span>
                </label>
              );
            })}
          </div>
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </fieldset>

        <BlockNoteEditor onChange={onContentChange} />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="border-t pt-2">
        <div className="flex items-center justify-between gap-6">
          <div>
            <Button type="button" label="Delete" outlined />
          </div>
          <div className="flex gap-4">
            <Button type="button" label="Save as Draft" outlined />
            <Button type="submit" label="Publish" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
