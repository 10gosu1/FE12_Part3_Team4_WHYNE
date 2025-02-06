"use client";

import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

interface InputFileProps {
  id: string;
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

export default function InputFile({
  id,
  name,
  value,
  onChange,
}: InputFileProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      onChange(name, file);
      e.target.value = ""; // 같은 파일 연속 선택 가능하도록 초기화
    }
  };

  const handleRemoveImage = () => {
    onChange(name, null);
  };

  return (
    <div className="flex gap-2">
      <label
        htmlFor={id}
        className="flex items-center justify-center w-[120px] md:w-[140px] h-[120px] md:h-[140px] border border-gray-300 rounded-2xl cursor-pointer hover:bg-purple-100 hover:opacity-30"
      >
        <Icon
          name="photo"
          size={32}
          viewBox="0 0 24 24"
          className="text-gray-300"
        />
      </label>
      <input
        id={id}
        type="file"
        name={name}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      {preview && (
        <div className="relative w-[120px] md:w-[140px] h-[120px] md:h-[140px] border border-gray-300 rounded-2xl overflow-hidden">
          <Image src={preview} alt="미리보기" fill className="object-contain" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-[24px] h-[24px] absolute top-[6px] right-[6px] text-gray-300"
          >
            <Icon
              name="close"
              size={24}
              viewBox="0 0 24 24"
              className="text-gray-300 w-full h-full"
            />
          </button>
        </div>
      )}
    </div>
  );
}
