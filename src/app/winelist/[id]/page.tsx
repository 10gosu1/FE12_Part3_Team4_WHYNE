"use client";
import CardDetail from "@/components/Card/CardDetail";
import { useParams } from "next/navigation";
import ReviewStats from "./components/ReviewStats";

export default function Page() {
  const { id } = useParams();

  if (id === undefined) {
    return <div>로딩중 입니다 ...</div>;
  }

  // id 값이 배열일 경우 첫 번째 요소를 가져옴
  const wineId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="flex flex-col">
      <div className="mt-[30px] mb-[40px] md:mt-[62px] md:mb-[60px]">
        <CardDetail id={wineId} />
      </div>
      <div>
        <div>
          <p className="text-[20px] font-bold">리뷰 목록</p>
        </div>
        <ReviewStats wineId={wineId} />
      </div>
    </div>
  );
}
