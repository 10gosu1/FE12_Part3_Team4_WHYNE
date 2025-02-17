"use client";
import MoreMenu from "@/components/Moremenu/MoreMenu";
import Image from "next/image";

type WineData = {
  name: string;
  price: number;
  region: string;
  image: string;
  reviewId: number;
  userId: number;
};

export default function MyList({ wine }: { wine: WineData }) {
  const imageSrc =
    wine.image && wine.image.startsWith("http")
      ? wine.image
      : "/images/wine/wine2.png";

  return (
    <div className="relative flex flex-wrap items-center max-w-[1140px] w-full h-auto sm:h-[260px] border border-[#CFDBEA] rounded-[16px] shadow-md sm:p-4">
      {/* 와인 이미지 */}

      <div className="relative flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px]">
        {
          <Image
            src={imageSrc}
            alt="와인 이미지"
            width={60}
            height={60}
            className="object-cover rounded-lg mx-auto"
          />
        }
      </div>
      <div className="absolute md:top-[30px] md:right-[40px] sm:top-[20px] sm:right-[20px]">
        <MoreMenu reviewId={wine.reviewId} userId={wine.userId} />
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
