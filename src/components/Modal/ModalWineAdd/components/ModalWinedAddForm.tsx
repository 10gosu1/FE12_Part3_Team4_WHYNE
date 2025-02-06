"use client";

import Button from "@/components/Button/button";
import { Input, InputFile, InputSelect, Label } from "@/components/Input";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  //const [image, setImage] = useState("");

  // InputFile 테스트용
  const [image, setImage] = useState<File | null>(null);
  const handleFileChange = (name: string, file: File | null) => {
    setImage(file);
    console.log("선택한 파일:", file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, price: price === "" ? 0 : price, region, type, image });
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="와인 이름 입력"
          required
        />
      </div>
      <div>
        <Label htmlFor="price">가격</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="가격 입력"
          required
        />
      </div>
      <div>
        <Label htmlFor="region">원산지</Label>
        <Input
          id="region"
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="원산지 입력"
          required
        />
      </div>
      <div>
        <Label htmlFor="type">타입</Label>
        <InputSelect
          id="type"
          options={["Red", "White", "Sparkling"]}
          selectedValue={type}
          onChange={setType}
        />
      </div>
      <div>
        <Label htmlFor="image">와인 사진</Label>
        <InputFile
          id="image"
          name="image"
          value={image}
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
