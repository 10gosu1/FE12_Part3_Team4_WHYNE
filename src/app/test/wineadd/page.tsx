"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import ModalWineAdd from "@/components/Modal/ModalWineAdd/ModalWineAdd";
import { fetchMyWines } from "@/lib/api/user";
import { createWine, updateWine } from "@/lib/api/wine";

type WineData = {
  name: string;
  price: number;
  region: string;
  type: "RED" | "WHITE" | "SPARKLING";
  image: string;
  avgRating?: number; // avgRating 추가
};

type Wine = WineData & {
  id: number;
};

export default function WineAdd() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userWines, setUserWines] = useState<Wine[]>([]); // 사용자가 등록한 와인 목록
  const [wineToEdit, setWineToEdit] = useState<Wine | null>(null); // 수정할 와인 데이터
  const router = useRouter(); // useRouter를 올바 르게 선언
  //const [file, setFile] = useState<File | null>(null); // 파일 상태 추가

  useEffect(() => {
    if (user) {
      fetchMyWines(1) // 10개의 와인 목록 가져옴
        .then((data) => {
          if (data && data.list && data.list.length > 0) {
            setUserWines(data.list); // list 배열에서 와인 목록 설정
            // 와인 목록에 포함된 image 데이터 확인
            console.log("불러온 와인 목록:", data.list);
            data.list.forEach((wine: Wine) => {
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

  //   useEffect(() => {
  //     if (isEditMode && wineToEdit) {
  //       // 수정 모드일 때 와인 데이터를 불러와서 해당 이미지 URL을 설정
  //       setFile(null); // 이미지는 File 객체가 아닌 URL이므로, File 상태를 null로 설정
  //     } else {
  //       setFile(null); // 수정 모드가 아니면 파일 초기화
  //     }
  //   }, [isEditMode, wineToEdit]);

  const handleWineSubmit = async (wineData: WineData) => {
    try {
      const validData: WineData = {
        name: wineData.name,
        region: wineData.region,
        image: wineData.image,
        price: Number(wineData.price),
        type: wineData.type,
      };

      if (isEditMode && wineToEdit?.id) {
        const wineDataToSend = {
          ...validData,
          avgRating: wineToEdit.avgRating ?? 0, // 수정 모드일 때 avgRating 처리
        };
        await updateWine(String(wineToEdit.id), wineDataToSend);
        alert("👌🏻 와인 정보가 수정되었습니다.");
      } else {
        await createWine(validData);
        alert("🍷 새로운 와인이 등록되었습니다.");
      }

      setIsModalOpen(false);
      setWineToEdit(null);
      router.push(`/wine/${wineToEdit?.id}`); // 수정한 후 해당 와인 페이지로 이동
    } catch (error) {
      console.error("와인 처리 중 오류:", error);
      alert(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
    }
  };

  // ModalWineAdd 테스트용
  const handleWineModalOpen = (editMode: boolean) => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setIsEditMode(editMode);
    setIsModalOpen(true);

    if (editMode && userWines.length > 0) {
      const wineToEdit = userWines[0]; // 첫 번째 와인 데이터 사용
      setWineToEdit(wineToEdit);
    } else {
      setWineToEdit(null);
    }
  };

  return (
    <>
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
          wineToEdit={wineToEdit ?? undefined} // 수정할 와인 데이터 전달
          onSubmit={handleWineSubmit} // onSubmit 함수 전달
          isEditMode={isEditMode} // 수정 모드 여부 전달
        />
      </div>
    </>
  );
}
