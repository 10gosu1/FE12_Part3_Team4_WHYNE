"use client";

import { useEffect, useState } from "react";
import { fetchWines } from "@/lib/api/wine";
import WineCard from "./WineCard";

type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: { content: string } | null; // ✅ null 허용 추가
};

export default function WineList() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getWines() {
      try {
        const response = await fetchWines({ limit: 10 });
        setWines(response.list);
        setLoading(false);
      } catch (error) {
        console.error("⚠️ 와인 목록을 불러오지 못했습니다.", error);
        setError("와인 목록을 가져올 수 없습니다.");
        setLoading(false);
      }
    }
    getWines();
  }, [error]); // ✅ error를 의존성 배열에 추가

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 gap-[62px]">
      {wines.map((wine) => (
        <WineCard
          key={wine.id}
          wine={{
            ...wine,
            recentReview: wine.recentReview ?? undefined, // ✅ null을 undefined로 변환
          }}
        />
      ))}
    </div>
  );
}
