import Gnb from "@/components/Gnb";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full bg-[#F2F4F8]">
      <div className="w-[1140px]">
        <header className="h-[70px] mt-[24px] my-[390px] mb-[80px]">
          <Gnb />
        </header>

        {/* 메인 이미지 섹션 */}
        <section className="relative h-[535px] rounded-[16px] bg-[#171A21] flex justify-center items-center">
          <Image
            src="/images/home/lg_01.png"
            alt="홈 메인 이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            quality={100}
          />
        </section>

        <div className="flex flex-col items-center mt-[160px]">
          <section className="flex flex-wrap justify-center items-center gap-x-[29.5px] gap-y-[96px]">
            <div className="relative w-[640px] h-[320px] flex justify-center items-center">
              <Image
                src="/images/home/lg_02.png"
                alt="와인 추천"
                width={640}
                height={320}
                quality={100}
                className="rounded-lg"
              />
            </div>

            <div className="relative w-[640px] h-[320px] flex justify-center items-center">
              <Image
                src="/images/home/lg_03.png"
                alt="맞춤 와인"
                width={640}
                height={320}
                quality={100}
                className="rounded-lg"
              />
            </div>

            <div className="relative w-[640px] h-[320px] flex justify-center items-center">
              <Image
                src="/images/home/lg_04.png"
                alt="리뷰 시스템"
                width={1140}
                height={320}
                quality={100}
                className="rounded-lg"
              />
            </div>
          </section>

          <span className="w-[279px] h-[50px] bg-[#6A42DB] text-white flex justify-center items-center rounded-[100px] mt-[104px] mx-[820.5px] mb-[109px] cursor-pointer">
            <Link href="/winelist">와인 보러가기</Link>
          </span>
        </div>
      </div>
    </main>
  );
}
