"use client";

import { useRouter } from "next/navigation";
import Gnb from "@/components/Gnb";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center w-full bg-[#F2F4F8]">
      <div className="w-full max-w-[1140px] px-4 sm:max-w-full">
        {/* ✅ 네비게이션 바 */}
        <header className="h-[70px] mt-[24px] mb-[40px] md:mb-[80px]">
          <Gnb />
        </header>

        {/* 메인 이미지 섹션 */}
        <section className="relative h-auto md:h-[535px] rounded-[16px] bg-[#171A21] flex justify-center items-center">
          <Image
            src="/images/home/lg_01.png"
            alt="홈 메인 이미지"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            quality={100}
          />
        </section>

        <div className="flex flex-col items-center mt-[80px] md:mt-[160px]">
          {/* ✅ 모바일에서는 1개씩, 큰 화면에서는 2개씩 표시 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-6 md:gap-y-12 w-full">
            <div className="w-full flex justify-center">
              <Image
                src="/images/home/lg_02.png"
                alt="와인 추천"
                width={640}
                height={320}
                quality={100}
                className="rounded-lg w-full max-w-[640px] sm:max-w-full"
              />
            </div>

            <div className="w-full flex justify-center">
              <Image
                src="/images/home/lg_03.png"
                alt="맞춤 와인"
                width={640}
                height={320}
                quality={100}
                className="rounded-lg w-full max-w-[640px] sm:max-w-full"
              />
            </div>

            {/* ✅ 리뷰 시스템 (모바일에서는 한 줄, 데스크탑에서는 2줄) */}
            <div className="w-full flex justify-center md:col-span-2">
              <Image
                src="/images/home/lg_04.png"
                alt="리뷰 시스템"
                width={1140}
                height={320}
                quality={100}
                className="rounded-lg w-full max-w-[1140px] sm:max-w-full"
              />
            </div>
          </section>

          {/* ✅ 버튼 중앙 정렬 */}
          <button
            onClick={() => router.push("/winelist")}
            className="w-full md:w-[279px] h-[50px] bg-[#6A42DB] text-white flex justify-center items-center rounded-[100px] mt-[40px] md:mt-[104px] mb-[40px] md:mb-[109px]"
          >
            와인 보러가기
          </button>
        </div>
      </div>
    </main>
  );
}
