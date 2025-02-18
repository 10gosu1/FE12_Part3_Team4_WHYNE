"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button/button";
import { Input, InputFile, InputSelect, Label } from "@/components/Input";
import { uploadImage } from "@/lib/api/image";

type ModalWineFormProps = {
  initialData?: {
    id?: number;
    name: string;
    price: number;
    region: string;
    type: "RED" | "WHITE" | "SPARKLING";
    image: string;
    avgRating: number;
  };
  onSubmit: (data: {
    name: string;
    price: number;
    region: string;
    type: "RED" | "WHITE" | "SPARKLING"; // 타입을 string에서 제한된 값으로 수정
    image: string;
    avgRating: number;
  }) => Promise<void>;
  onClose: () => void;
  isEditMode: boolean;
};

export default function ModalWineAddForm({
  initialData = {
    name: "",
    price: 0,
    region: "",
    type: "RED",
    image: "",
    avgRating: 0,
  },
  onSubmit,
  onClose,
  isEditMode,
}: ModalWineFormProps) {
  // 수정된 부분
  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEditMode && initialData.image) {
      setFormData((prevData) => ({
        ...prevData,
        image: initialData.image,
        avgRating: initialData.avgRating,
      }));
    }
  }, [isEditMode, initialData]);

  const handleFileChange = (name: string, file: File | null) => {
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, image: initialData.image });
    }
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
      // POST 요청일 때는 imageUrl 포함해서 보내기
      const wineData = {
        id: initialData.id, // ✅ 수정 시 ID 포함
        name: formData.name,
        price: formData.price || 0,
        region: formData.region,
        type: formData.type,
        image: imageUrl,
        avgRating: formData.avgRating, // ✅ avgRating 추가
      };

      // 수정인 경우 PATCH, 새로운 등록일 경우 POST
      await onSubmit(wineData);

      // 성공적으로 저장되면 상세 페이지로 리디렉션 (POST 요청이 완료되면 상세 페이지로 이동)
      //router.push("/");
      onClose();
    } catch (error) {
      console.error("와인 정보 저장 실패", error);
    }
  };

  // 필수 입력값 체크
  const isFormValid =
    formData.name &&
    formData.name.trim() !== "" &&
    formData.price > 0 &&
    formData.region &&
    formData.region.trim() !== "" &&
    formData.type &&
    formData.type.trim() !== "" &&
    (file !== null || formData.image !== "");

  const isFormChanged =
    JSON.stringify(formData) !== JSON.stringify(initialData);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-[24px] md:gap-[32px]"
    >
      <div>
        <Label htmlFor="name">
          와인 이름 <sup className="text-purple-100">*</sup>
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="와인 이름을 입력해주세요"
          required
        />
      </div>
      <div>
        <Label htmlFor="price">
          가격 (단위:원) <sup className="text-purple-100">*</sup>
        </Label>
        <Input
          id="price"
          type="text"
          value={formData.price ? formData.price.toLocaleString() : ""}
          onChange={(e) => {
            // 숫자만 입력 가능하도록
            const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자는 제거
            // 쉼표 없이 숫자만 저장
            const numericValue = value ? Number(value) : 0;
            setFormData({ ...formData, price: numericValue });
          }}
          placeholder="가격을 입력해주세요"
          required
        />
      </div>
      <div>
        <Label htmlFor="region">
          원산지 <sup className="text-purple-100">*</sup>
        </Label>
        <Input
          id="region"
          type="text"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          placeholder="원산지를 입력해주세요"
          required
        />
      </div>
      <div>
        <Label htmlFor="type">
          타입 <sup className="text-purple-100">*</sup>
        </Label>
        <InputSelect
          id="type"
          options={["RED", "WHITE", "SPARKLING"]}
          selectedValue={formData.type}
          onChange={(value: "RED" | "WHITE" | "SPARKLING") =>
            setFormData({ ...formData, type: value })
          }
        />
      </div>
      <div>
        <Label htmlFor="image">
          와인 사진 <sup className="text-purple-100">*</sup>
        </Label>
        <InputFile
          id="image"
          name="image"
          value={file}
          onChange={handleFileChange}
          initialData={{ image: formData.image }} // 수정 모드일 때 이미지 전달
        />
      </div>
      <div className="flex justify-between gap-[3%] h-[54px]">
        <Button
          className="w-[27%] h-full bg-purple-10 text-purple-100  hover:bg-white hover:border hover:border-purple-100"
          onClick={() => onClose()}
        >
          취소
        </Button>
        <Button
          variant="modal"
          className="w-[70%] h-full hover:text-purple-100 hover:border hover:border-purple-100 hover:bg-white"
          disabled={!isFormValid || !isFormChanged}
        >
          {isEditMode ? "수정하기" : "와인 등록하기"}
        </Button>
      </div>
    </form>
  );
}
