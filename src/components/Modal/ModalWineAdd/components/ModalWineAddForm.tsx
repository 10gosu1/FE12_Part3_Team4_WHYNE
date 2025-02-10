"use client";

import { useState } from "react";
import Button from "@/components/Button/button";
import { Input, InputFile, InputSelect, Label } from "@/components/Input";
import { uploadImage } from "@/lib/api/image";
import { createWine } from "@/lib/api/wine";

type ModalWineFormProps = {
  onSubmit: (data: {
    name: string;
    price: number;
    region: string;
    type: string;
    image: string;
  }) => void;
  onClose: () => void;
};

export default function ModalWineAddForm({
  onSubmit,
  onClose,
}: ModalWineFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "" as number | "",
    region: "",
    type: "",
    image: "", // 최종적으로 URL을 저장할 필드
  });

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (name: string, file: File | null) => {
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image; // 기존 URL 사용

    if (file) {
      try {
        imageUrl = await uploadImage(file);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        return;
      }
    }

    try {
      await createWine({
        name: formData.name,
        region: formData.region,
        image: imageUrl,
        price: formData.price === "" ? 0 : formData.price,
        type: formData.type.toUpperCase(),
      });

      onSubmit({
        ...formData,
        price: formData.price === "" ? 0 : formData.price,
        image: imageUrl, // 최종적으로 업로드 된 이미지 URL 저장
      });
    } catch (error) {
      console.error("와인 등록 실패", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-[24px] md:gap-[32px]"
    >
      <div>
        <Label htmlFor="name">와인 이름</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="와인 이름 입력"
          required
        />
      </div>
      <div>
        <Label htmlFor="price">가격</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          placeholder="가격 입력"
          required
        />
      </div>
      <div>
        <Label htmlFor="region">원산지</Label>
        <Input
          id="region"
          type="text"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          placeholder="원산지 입력"
          required
        />
      </div>
      <div>
        <Label htmlFor="type">타입</Label>
        <InputSelect
          id="type"
          options={["Red", "White", "Sparkling"]}
          selectedValue={formData.type}
          onChange={(value) => setFormData({ ...formData, type: value })}
        />
      </div>
      <div>
        <Label htmlFor="image">와인 사진</Label>
        <InputFile
          id="image"
          name="image"
          value={file}
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-between gap-[3%] h-[54px]">
        <Button
          variant="modalCancel"
          className="w-[27%] h-full !bg-purple-10 text-purple-100 border-none"
          onClick={() => onClose()}
        >
          취소
        </Button>
        <Button variant="modal" className="w-[70%] h-full">
          와인 등록하기
        </Button>
      </div>
    </form>
  );
}
