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

import { GnbLayout } from "@/components/Gnb";

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

  return (
    <>
      <GnbLayout />
      <div>
        <Label htmlFor="email">Input</Label>
        <Input type="email" placeholder="whyne@email.com" />
        <br />
        <br />
        <Label htmlFor="select">InputSelect</Label>
        <InputSelect
          options={["Option 1", "Option 2", "Option 3"]}
          selectedValue=""
        >
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
    </>
  );
}
