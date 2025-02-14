"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { uploadImage } from "@/lib/api/image";

interface InputProfileImageProps {
  currentImage: string;
  onImageChange: (file: File, previewUrl: string) => void;
}

export default function InputProfileImage({
  currentImage,
  onImageChange,
}: InputProfileImageProps) {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setImagePreview(currentImage || "/images/common/no_profile.svg");
  }, [currentImage]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validExtensions.includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("최대 5MB 이하의 파일만 업로드 가능합니다.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    onImageChange(file, previewUrl);

    // 이미지 업로드 로직 추가
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImage(file); // 이미지 업로드 API 호출
      onImageChange(file, uploadedUrl); // 업로드된 URL 전달
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ 이미지 업로드 실패:", error);
        alert("이미지 업로드 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => imageRef.current?.click()}
      className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[164px] lg:h-[164px] rounded-full overflow-hidden border border-gray-300 cursor-pointer"
    >
      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Image
            src={imagePreview || "/images/common/no_profile.svg"}
            layout="fill"
            className="object-cover"
            alt="프로필 이미지"
          />
          {isHover && (
            <div className="flex items-center justify-center absolute inset-0 bg-purple-100 bg-opacity-30">
              <Icon
                name="photo"
                size={40}
                viewBox="0 0 24 24"
                className="text-white"
              />
            </div>
          )}
        </>
      )}
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
