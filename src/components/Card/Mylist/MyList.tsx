"use client";
import MoreMenu from "@/components/Moremenu/MoreMenu";
import Image from "next/image";
import { WineData } from "@/lib/api/wine"; // WineData 가져오기

// ✅ WineDataWithUserId 타입 정의 (WineData를 확장)
interface WineDataWithUserId extends WineData {
  userId: number;
}

interface MyListProps {
  wine: WineDataWithUserId; // WineDataWithUserId 타입 사용
  onDeleteSuccess?: () => void; // 삭제 후 리스트 업데이트 함수 추가
}

export default function MyList({ wine, onDeleteSuccess }: MyListProps) {
  return (
    <div className="relative flex flex-wrap items-center max-w-[1140px] w-full h-auto sm:h-[260px] border border-[#CFDBEA] rounded-[16px] shadow-md sm:p-4">
      {/* 와인 이미지 */}
      <div className="w-[200px] h-[200px] overflow-hidden rounded-lg">
        <Image
          src={wine.image}
          alt={wine.name}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute md:top-[30px] md:right-[40px] sm:top-[20px] sm:right-[20px]">
        <MoreMenu
          reviewId={wine.id}
          userId={wine.userId} // userId 유지
          wineData={wine}
          editType="editWine"
          onDeleteSuccess={onDeleteSuccess} // 삭제 후 리스트 갱신 함수 전달
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
        <p
          style={{ backgroundColor: "#F1EDFC", color: "#6A42DB" }}
          className="inline-flex items-center justify-center w-[120px] sm:w-[140px] md:w-[160px] px-3 sm:px-4 py-1 rounded-[12px] text-[16px] sm:text-[18px] font-bold text-right"
        >
          {`₩ ${wine.price.toLocaleString("ko-KR")}`}
        </p>
      </div>
    </div>
  );
}
