"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon/Icon";

type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: {
    content: string;
  };
};

// ✅ props로 wine 데이터를 받아오기
export default function WineCard({ wine }: { wine: Wine }) {
  const router = useRouter();

  return (
    <div
      className="w-[800px] h-[375px] rounded-[16px] border border-[#CFDBEA] bg-white flex flex-col p-6 cursor-pointer hover:shadow-md transition relative"
      onClick={() => router.push(`/winelist/${wine.id}`)}
    >
      {/* ✅ 상단: 와인 정보 */}
      <div className="flex">
        {/* ✅ 와인 이미지 */}
        <div className="w-[60px] h-[208px] min-w-[60px] ml-[36px]">
          <Image
            src={wine.image}
            alt={wine.name}
            width={60}
            height={208}
            quality={100}
            unoptimized={true}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ✅ 와인 상세 정보 */}
        <div className="ml-[81px] flex flex-col justify-between w-full">
          <div className="flex justify-between">
            {/* ✅ 와인 이름과 국가 */}
            <div>
              <h2 className="text-[#2D3034] font-semibold text-[32px] leading-[42px] w-[360px]">
                {wine.name}
              </h2>
              <p className="text-[#9FACBD] font-normal text-[16px] leading-[26px] pt-[20px]">
                {wine.region}
              </p>
            </div>

            {/* ✅ 평점, 가격 & 후기 개수 */}
            <div className="flex  items-center justify-between pr-[30px] pb-[30px]">
              {/* 평점 & 별점 */}
              <div className="flex flex-col gap-[8px]">
                <span className="text-black font-bold text-[32px] leading-[42px]">
                  {wine.avgRating.toFixed(1)}
                </span>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`text-lg ${
                        index < Math.floor(wine.avgRating)
                          ? "text-purple-600"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className=" text-gray-500 text-sm">
                  {wine.reviewCount}개의 후기
                </span>
              </div>
            </div>
          </div>

          {/* ✅ 가격 & 화살표 (절취선 위로 이동) */}
          <div className="flex items-center justify-between">
            <div className="bg-[#F1EDFC] w-[114px] h-[42px] rounded-[12px] flex items-center justify-center px-4">
              <span className="text-[#6A42DB] font-bold text-[18px] leading-[26px] whitespace-nowrap">
                ₩ {wine.price.toLocaleString()}
              </span>
            </div>
            <div className="w-[36px] h-[36px] flex items-center justify-center text-gray-400 text-[24px] mr-[30px]">
              <Icon
                name="right"
                size={300}
                className="cursor-pointer scale-150"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 절취선 */}
      <div className="border-t border-gray-200 mt-4"></div>

      {/* ✅ 최신 후기 */}
      <div className="w-[680px] h-[88px] mt-[19.5px] mx-[60px]">
        <h3 className="text-black font-semibold text-[16px] leading-[26px] mb-[10px]">
          최신 후기
        </h3>
        <p className="text-gray-600 text-[16px] leading-[26px]">
          {wine.recentReview?.content || "아직 후기가 없습니다."}
        </p>
      </div>
    </div>
  );
}
