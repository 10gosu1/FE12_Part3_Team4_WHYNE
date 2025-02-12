"use client";
import { useState } from "react";
import CardDetail from "@/components/Card/CardDetail";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";
import { useParams } from "next/navigation";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  // id 값이 배열일 경우 첫 번째 요소를 가져옴
  const wineId = Array.isArray(id) ? id[0] : id;

  return (
    <div>
      와인 상세 페이지입니다. ID:{id}
      <CardDetail id={wineId} />
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          모달 열기
        </button>
        <ModalReviewAdd
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
