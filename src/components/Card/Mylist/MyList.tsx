"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchMyWines } from "@/lib/api/user";

type MyListProps = {
  limit: number;
  cursor?: string;
};

export default function MyList({ limit, cursor }: MyListProps) {
  const [wine, setWine] = useState({
    name: "",
    price: 0,
    region: "",
    image: "",
  });

  useEffect(() => {
    const fetchWine = async () => {
      try {
        const fetchedWine = await fetchMyWines(limit, cursor);
        console.log("wine:", fetchedWine);
        setWine(fetchedWine);
      } catch (error) {
        console.error("와인데이터 로딩 실패:", error);
      }
    };
    fetchWine();
  }, [id]);

  const imageSrc = wine.image.startsWith("http")
    ? wine.image
    : "/images/wine/wine1.png";

  return (
    <div className="flex flex-wrap items-center max-w-[1140px] w-full h-auto sm:h-[260px] border border-[#CFDBEA] rounded-[16px] shadow-md sm:p-4">
      {/* 와인 이미지 */}
      <div className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px]">
        <Image
          src={imageSrc}
          alt="와인 이미지"
          width={220}
          height={220}
          className="w-full h-auto"
        />
      </div>

      {/* 와인 정보 */}
      <div className="flex flex-col gap-3 sm:gap-5 ml-6">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
          {wine.name}
        </p>
        <p className="text-sm sm:text-[14px] md:text-[16px] text-gray-500 font-normal">
          {wine.region}
        </p>

        {/* 가격 태그 */}
        <p
          style={{ backgroundColor: "#F1EDFC", color: "#6A42DB" }}
          className="inline-flex items-center justify-center px-3 sm:px-4 py-1 rounded-[12px] text-[16px] sm:text-[18px] font-bold"
        >
          {`₩ ${wine.price.toLocaleString("ko-KR")}`}
        </p>
      </div>
    </div>
  );
}
