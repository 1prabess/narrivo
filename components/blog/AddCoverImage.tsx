"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { ImageIcon, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface AddCoverImageProps {
  setUploadedCover: (cover: string) => void;
  replaceUrl?: string;
}

const AddCoverImage = ({
  setUploadedCover,
  replaceUrl,
}: AddCoverImageProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleButtonClick = () => imageInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const res = await edgestore.publicFiles.upload({
        file,
        options: replaceUrl ? { replaceTargetUrl: replaceUrl } : undefined,
      });

      if (res.url) setUploadedCover(res.url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className={cn(!replaceUrl && "mt-10")}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={imageInputRef}
        className="hidden"
      />

      <button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="flex items-center gap-2"
        type="button"
      >
        {isUploading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <ImageIcon size={20} />
            <span>{replaceUrl ? "Change cover" : "Add cover"}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AddCoverImage;
