"use client";

import { useState } from "react";
import { createWine } from "@/lib/api/wine";
import { useAuth } from "@/context/AuthProvider";
import ModalWineAdd from "@/components/Modal/ModalWineAdd/ModalWineAdd";

import { showToast } from "@/components/Toast/Toast";

type WineData = {
  name: string;
  price: number;
  region: string;
  type: "RED" | "WHITE" | "SPARKLING";
  image: string;
};

export default function ModalWineAddMode() {
  const [isModalOpen, setIsModalOpen] = useState(true); // 항상 생성 모드로 열림
  const { user } = useAuth(); // ⛔️ 로그인한 사용자 정보를 가져옵니다. -> 페이지 전체에 이미 있다면 생략가능?

  const handleWineSubmit = async (wineData: WineData) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formattedWineData = {
      name: wineData.name,
      region: wineData.region,
      image: wineData.image,
      price: wineData.price,
      type: wineData.type,
    };

    try {
      await createWine(formattedWineData);
      showToast("새로운 와인이 등록되었습니다.", "success");

      //alert("🍷 새로운 와인이 등록되었습니다.");
    } catch (error) {
      console.error("❌ 와인 생성 중 문제가 발생했습니다.:", error);
      if (error instanceof Error) {
        showToast("와인 생성 중 문제가 발생했습니다.", "error");

        //alert("❌ 와인 생성 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <ModalWineAdd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleWineSubmit}
        isEditMode={false}
      />
    </>
  );
}
