"use client";

import { useState } from "react";
import {
  Input,
  InputFile,
  InputPassword,
  InputSelect,
  InputSearch,
  InputTextarea,
  Label,
} from "@/components/Input";

import Gnb from "@/components/Gnb";
import Link from "next/link";

export default function HyeseonTest() {
  // InputSearch 테스트용
  const handleSearch = (keyword?: string) => {
    console.log("Search keyword:", keyword);
  };

  // InputFile 테스트용
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (name: string, file: File | null) => {
    setFile(file); // 상태 업데이트
    console.log("선택한 파일:", file);
  };

  return (
    <>
      <Gnb />
      <div>
        <Label htmlFor="email">Input</Label>
        <Input type="email" placeholder="whyne@email.com" />
        <br />
        <br />
        <Label htmlFor="select">InputSelect</Label>
        <InputSelect options={["RED", "WHITE", "SPARKLING"]}>
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
          value={file} // 부모에서 관리하는 file 상태
          onChange={handleFileChange}
        />
        <br />
        <br />
        <Label htmlFor="file">프로필 사진 업로드</Label>
        {/* <InputProfileImage /> */}
      </div>
      <div className="mt-8">
        <Link
          href="/test/wineadd"
          className="p-3 rounded bg-purple-100 text-white text-lg-16px-bold"
        >
          와인등록하기 모달 테스트 페이지로 이동
        </Link>
      </div>
    </>
  );
}
