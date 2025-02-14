"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchWines } from "@/lib/api/wine";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getWines() {
      try {
        const response = await fetchWines({ limit: 100 });
        const shuffledWines = response.list
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
        setWines(shuffledWines);
        setLoading(false);

        // ✅ 페이지 로드 후 버튼 상태 업데이트 (렌더링 후 실행)
        setTimeout(updateScrollButtons, 100);
      } catch {
        setLoading(false);
      }
    }
    getWines();
  }, []);

  // ✅ 스크롤 가능 여부 업데이트 함수
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // ✅ 좌우 스크롤 이동
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300); // ✅ 애니메이션 후 버튼 상태 업데이트
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300); // ✅ 애니메이션 후 버튼 상태 업데이트
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons); // ✅ 윈도우 크기 변경 시 업데이트
      setTimeout(updateScrollButtons, 100); // ✅ 초기 버튼 상태 강제 업데이트

      return () => {
        scrollContainer.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative w-full bg-[#F2F4F8] p-6 rounded-lg overflow-hidden">
      <h2 className="text-[20px] font-bold text-[#2D3034] mb-4">
        이번 달 추천 와인
      </h2>

      {/* 왼쪽 버튼 (필요할 때만 표시) */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-[20px] top-[130px] w-[70px] h-[70px] p-0 z-10 flex items-center justify-center border-none bg-transparent"
        >
          <Image
            src="/images/common/Frame left.png"
            alt="Frame 68"
            width={40}
            height={40}
            className="w-full h-full object-cover"
            priority
            unoptimized
          />
        </button>
      )}

      {/* 오른쪽 버튼 (필요할 때만 표시) */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute left-[1010px] top-[130px] w-[70px] h-[70px] p-0 z-10 flex items-center justify-center border-none bg-transparent"
        >
          <Image
            src="/images/common/Frame 68.png"
            alt="Frame 68"
            width={40}
            height={40}
            className="w-full h-full object-cover"
            priority
            unoptimized
          />
        </button>
      )}

      {/* 와인 리스트 (가로 스크롤, 스크롤바 숨김) */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar space-x-6 scrollbar-hide"
        style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
      >
        {wines.map((wine) => (
          <div
            key={wine.id}
            className="w-[232px] h-[185px] bg-white rounded-lg flex justify-center items-end cursor-pointer"
            onClick={() => router.push(`/winelist/${wine.id}`)}
          >
            <div className="w-[44px] h-[161px] flex-shrink-0 min-w-[44px] min-h-[161px] mx-[30px]">
              <Image
                src={wine.image}
                alt={wine.name}
                width={60}
                height={140}
                quality={100}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[100px] h-[143px] flex flex-col justify-between ml-[28px] mb-[18px]">
              <div className="text-black text-[36px] font-extrabold leading-[42.96px]">
                {wine.avgRating.toFixed(1)}
              </div>
              <div className="flex justify-start w-[90px] h-[18px]">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`text-lg ${index < Math.floor(wine.avgRating) ? "text-purple-600" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="w-[100px] h-[72px] text-[#9FACBD] text-[12px] leading-[18px]">
                {wine.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
