"use client";

import { useState } from "react";

import {
  Input,
  InputFile,
  InputPassword,
  InputSelect,
  InputSearch,
  InputProfileImage,
  InputTextarea,
  Label,
} from "@/components/Input";

import ModalWineAdd from "@/components/Modal/ModalWineAdd/ModalWineAdd";
import Gnb from "@/components/Gnb";

export default function HyeseonTest() {
  // InputSearch 테스트용
  const handleSearch = (keyword?: string) => {
    console.log("Search keyword:", keyword);
  };

  // InputFile 테스트용
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (name: string, file: File | null) => {
    setFile(file);
    console.log("선택한 파일:", file);
  };

  // ModalWineAdd 테스트용
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Gnb />
      <div>
        <Label htmlFor="email">Input</Label>
        <Input type="email" placeholder="whyne@email.com" />
        <br />
        <br />
        <Label htmlFor="select">InputSelect</Label>
        <InputSelect options={["Red", "White", "Sparkling"]} selectedValue="">
          선택하세요
        </InputSelect>
        <br />
        <Label htmlFor="password">비밀번호</Label>
        <InputPassword />
        <br />
        <Label htmlFor="search">검색</Label>
        <InputSearch searchByKeyword={handleSearch} />
        <br />
        <Label htmlFor="textarea">내용 입력</Label>
        <InputTextarea />
        <br />
        <br />
        <Label htmlFor="file">이미지 업로드</Label>
        <InputFile
          id="file"
          name="file"
          value={file}
          onChange={handleFileChange}
        />
        <br />
        <Label htmlFor="file">프로필 사진 업로드</Label>
        <InputProfileImage />
      </div>
      <div className="mt-[40px]">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          모달 열기
        </button>
        <ModalWineAdd
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
