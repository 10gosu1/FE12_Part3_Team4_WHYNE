import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center w-full px-[16px] md:px-0 h-screen bg-gray-100">
      <section className="flex flex-col items-center gap-[24px] w-full md:w-[496px] px-[20px] md:px-[48px] py-[56px] md:py-[64px] lg:py-[80px] bg-white border border-gray-300 rounded-[16px]">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <div className="text-center">
          <h2 className="text-2xl-24px-semibold text-gray-600 mb-1">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-500">요청하신 페이지가 존재하지 않습니다</p>
        </div>
        <Link
          href="/"
          className="text-lg-16px-semibold px-6 py-3 bg-purple-100 text-white rounded-lg hover:bg-purple-10 hover:text-purple-100 transition"
        >
          메인 페이지로 돌아가기
        </Link>
      </section>
    </main>
  );
}
