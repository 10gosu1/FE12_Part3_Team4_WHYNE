"use client";
import { useState } from "react";
import CardDetail from "@/components/Card/CardDetail";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";
import { useParams } from "next/navigation";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  if(id === undefined){
    return <div>로딩중 입니다 ...</div>
  }

  // id 값이 배열일 경우 첫 번째 요소를 가져옴
  const wineId = Array.isArray(id) ? id[0] : id;

  return (
    <div>
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
          initialReviewId={1620}
        />
      </div>
    </div>
  );
}
