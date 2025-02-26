"use client";

import { useEffect, useState } from "react";
import MyList from "@/components/Card/Mylist/MyList"; // 개별 와인 카드

import { fetchMyWines } from "@/lib/api/newUser"; // API 요청 함수 🛑 수정한 부분
import { WineData } from "@/lib/api/newWine"; // 기존 WineData 타입 가져오기 🛑 수정한 부분

// 기존 WineData를 확장하는 새로운 타입 생성 (userId 포함)
interface WineDataWithUserId extends WineData {
  userId: number;
}

export default function MyWines() {
  const [wines, setWines] = useState<WineDataWithUserId[]>([]);

  const fetchWinesData = async () => {
    try {
      const response = await fetchMyWines(10);

      if (!response || !response.list) {
        console.error("❌ API 응답이 올바르지 않습니다:", response);
        return;
      }
      setWines(response.list);
    } catch (error) {
      console.error("❌ 내가 등록한 와인 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchWinesData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {wines.length === 0 ? (
        <p className="text-gray-500">등록한 와인이 없습니다.</p>
      ) : (
        wines.map((wine) => (
          <MyList
            key={wine.id}
            wine={wine}
            onDeleteSuccess={fetchWinesData} // 삭제 후 리스트 업데이트 함수 전달
          />
        ))
      )}
    </div>
  );
}
