"use client";

import Image from "next/image";
import AddCoverImage from "./AddCoverImage";
import { X } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url: string;
  setUploadedCover: (cover: string | undefined) => void;
  isEditor?: boolean;
}

const CoverImage = ({ url, setUploadedCover, isEditor }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();

  const handleRemoveCover = async (url: string) => {
    try {
      await edgestore.publicFiles.delete({ url });

      setUploadedCover(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-[35vh] group">
      <Image fill src={url} alt="Cover Image" className="object-cover" />
      {isEditor && (
        <div className="absolute top-8 right-5 py-1 text-sm px-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all dark:bg-neutral-800 bg-neutral-50 flex items-center gap-x-2 ">
          <AddCoverImage setUploadedCover={setUploadedCover} replaceUrl={url} />

          <button
            type="button"
            onClick={() => handleRemoveCover(url)}
            className="flex items-center border-l pl-2"
          >
            <X />
            <span>Remove</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
