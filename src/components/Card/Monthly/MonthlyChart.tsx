"use client";

import { useEffect, useState } from "react";
import { fetchRecommendedWines } from "@/lib/api/wine";
import Image from "next/image";

type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
};

export default function MonthlyChart() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);

  const limit = 10; // ✅ limit 값을 명확하게 지정

  useEffect(() => {
    async function getWines() {
      try {
        console.log(`🛠 MonthlyChart에서 API 요청 | limit=${limit}`);
        const recommendedWines = await fetchRecommendedWines(limit);
        setWines(recommendedWines);
        setLoading(false);
      } catch {
        setLoading(false); // ✅ `error` 변수를 사용하지 않음
      }
    }
    getWines();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {wines.length === 0 ? (
        <div className="text-gray-500 text-center w-full">
          추천 와인이 없습니다.
        </div>
      ) : (
        wines.map((wine) => (
          <div
            key={wine.id}
            className="w-[232px] h-[185px] bg-white rounded-lg flex justify-center items-end"
          >
            {/* ✅ 와인 이미지 */}
            <div className="flex">
              <div className="w-[44px] h-[161px] flex-shrink-0 min-w-[44px] min-h-[161px]">
                <Image
                  src={wine.image}
                  alt={wine.name}
                  width={44}
                  height={161}
                  quality={100}
                  unoptimized={true}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ✅ 평점 & 와인 정보 */}
              <div className="w-[100px] h-[143px] flex flex-col justify-between ml-[28px] mb-[18px]">
                {/* 평점 */}
                <div className="text-black text-[36px] font-extrabold leading-[42.96px]">
                  {wine.avgRating.toFixed(1)}
                </div>

                {/* 별점 UI */}
                <div className="flex justify-start w-[90px] h-[18px]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < Math.floor(wine.avgRating)
                          ? "text-purple-600 text-lg"
                          : "text-gray-300 text-lg"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* 와인 이름 & 빈티지 */}
                <div className="w-[100px] h-[72px] text-[#9FACBD] text-[12px] leading-[18px]">
                  {wine.name}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
>>>>>>> 8d9d8d1792c91a08a8e19a7cabf2c932e6e93da6
