"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { fetchWineById, updateWine } from "@/lib/api/wine";
import ModalWineAdd from "@/components/Modal/ModalWineAdd/ModalWineAdd";
import { AxiosError } from "axios";
import { showToast } from "@/components/Toast/Toast";

// 와인 데이터 타입 정의
type WineData = {
  name: string;
  price: number;
  region: string; // 서버에서 기대하는 필드 이름은 description 일 수 있음
  type: "RED" | "WHITE" | "SPARKLING";
  image: string; // 서버에서 기대하는 필드 이름은 imageUrl 일 수 있음
  avgRating?: number;
};

// 실제 와인 데이터에 id 추가
type Wine = WineData & {
  id: number;
};

export default function WineEditPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [wineToEdit, setWineToEdit] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth(); // isLoading 제거

  const wineId = 802; // 테스트용 wineId (수정해야함)

  // 와인 정보 로딩
  useEffect(() => {
    if (!wineId || !user) return; // user가 없으면 실행 중단

    async function fetchWine() {
      try {
        const wine = await fetchWineById(wineId.toString());
        setWineToEdit(wine);
      } catch (error) {
        console.error("와인 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    }

    fetchWine();
  }, [wineId, user]); // user로만 상태 판단

  // 와인 수정 요청
  const handleWineSubmit = async (wineData: WineData) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 수정 요청 ID 및 데이터 로그 출력
    console.log("🔍 수정 요청 ID:", wineId);
    console.log("🔍 수정 요청 데이터:", wineData); // id를 제외한 데이터

    try {
      await updateWine(wineId.toString(), wineData); // id를 제외한 데이터만 전달
      showToast("와인 정보가 수정되었습니다.", "success");
      // alert("👌🏻 와인 정보가 수정되었습니다.");
      router.push(`/`); // 수정 후 페이지 이동
    } catch (error) {
      if (error instanceof AxiosError) {
        // AxiosError일 때 response.data를 확인
        if (error.response) {
          // 서버에서 반환한 응답 메시지
          console.error("서버 오류:", error.response.data);
          alert(
            `서버 오류: ${error.response.data.message || "알 수 없는 오류"}`
          );
        } else {
          // 네트워크 오류나 응답이 없는 경우
          console.error("네트워크 오류 또는 응답 없음:", error.message);
          alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    }
  };

  // 로딩 중 상태
  if (!user) return <div>사용자 정보를 불러오는 중입니다...</div>;
  if (loading) return <div>와인 정보를 불러오는 중입니다...</div>;
  if (!wineToEdit) return <div>와인 정보를 불러올 수 없습니다.</div>;

  return (
    <ModalWineAdd
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleWineSubmit}
      wineToEdit={wineToEdit || undefined}
      isEditMode={true}
    />
  );
}
