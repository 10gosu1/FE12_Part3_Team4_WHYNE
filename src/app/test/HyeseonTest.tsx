"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
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
import { createWine, fetchWineById, updateWine } from "@/lib/api/wine";
import { useRouter } from "next/navigation"; // 라우팅 추가
import { fetchMyWines } from "@/lib/api/user";

export default function HyeseonTest() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userWines, setUserWines] = useState<any[]>([]); // 사용자가 등록한 와인 목록
  const [wineToEdit, setWineToEdit] = useState<any>(null); // 수정할 와인 데이터
  const router = useRouter(); // useRouter를 올바르게 선언

  useEffect(() => {
    if (user) {
      fetchMyWines(1) // 10개의 와인 목록 가져옴
        .then((data) => {
          if (data && data.list && data.list.length > 0) {
            setUserWines(data.list); // list 배열에서 와인 목록 설정

            // 와인 목록에 포함된 image 데이터 확인
            console.log("불러온 와인 목록:", data.list);
            data.list.forEach((wine: any) => {
              console.log("와인 ID:", wine.id);
              console.log("와인 이미지 URL:", wine.image); // imageUrl 확인
            });
          } else {
            console.log("사용자가 만든 와인이 없습니다.");
          }
        })
        .catch((error) => {
          console.error(
            "내가 만든 와인 목록을 불러오는 중 오류가 발생했습니다.",
            error
          );
        });
    }
  }, [user]);

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

  useEffect(() => {
    if (isEditMode && wineToEdit) {
      // 수정 모드일 때 와인 데이터를 불러와서 해당 이미지 URL을 설정
      setFile(wineToEdit.imageUrl || null); // wineToEdit.imageUrl은 이미지 URL을 저장한 필드
    } else {
      setFile(null); // 수정 모드가 아니면 파일 초기화
    }
  }, [isEditMode, wineToEdit]);

  const handleWineSubmit = async (data: any) => {
    try {
      console.log("전송되는 데이터:", JSON.stringify(data, null, 2));

      if (isEditMode && wineToEdit?.id) {
        const { id, ...validData } = data; // ID 제거 후 요청
        console.log("수정할 와인 ID:", wineToEdit.id);
        console.log("PATCH 요청 바디:", validData);
        await updateWine(wineToEdit.id, validData);
        alert("와인 정보가 수정되었습니다.");
      } else {
        await createWine(data);
        alert("새로운 와인이 등록되었습니다.");
      }

      setIsModalOpen(false);
      setWineToEdit(null);
      router.push("/");
    } catch (error: any) {
      console.error(
        "❌ 와인 처리 중 오류:",
        error.response?.data || error.message
      );
      alert(
        "와인 처리 중 오류가 발생했습니다. 상세 오류: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // ModalWineAdd 테스트용
  const handleWineModalOpen = (editMode: boolean) => {
    if (!user) {
      // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      router.push("/signin"); // 로그인 페이지로 이동
      return;
    }
    setIsEditMode(editMode);
    setIsModalOpen(true);

    if (editMode && userWines.length > 0) {
      // 수정 모드일 때, userWines에서 수정할 와인 데이터를 찾아 설정
      const wineToEdit = userWines[0]; // 첫 번째 와인 데이터 사용
      setWineToEdit(wineToEdit);
    } else {
      // 새로운 와인 등록 시 빈 데이터
      setWineToEdit(null);
    }
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
          value={file} // 부모에서 관리하는 file 상태
          onChange={handleFileChange}
        />

        <br />
        <Label htmlFor="file">프로필 사진 업로드</Label>
        <InputProfileImage />
      </div>
      <div className="mt-[40px]">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
          onClick={() => handleWineModalOpen(false)} // 와인 등록 모드
          disabled={!user} // 로그인되지 않으면 버튼 비활성화
        >
          와인 등록하기
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => handleWineModalOpen(true)} // 와인 수정 모드
          disabled={!user} // 로그인되지 않으면 버튼 비활성화
        >
          수정하기
        </button>
        <ModalWineAdd
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setWineToEdit(null); // 모달 닫을 때 수정 데이터 초기화
          }}
          wineToEdit={wineToEdit} // 수정할 와인 데이터 전달
          onSubmit={handleWineSubmit} // onSubmit 함수 전달
          isEditMode={isEditMode} // 수정 모드 여부 전달
        />
      </div>
    </>
  );
}
