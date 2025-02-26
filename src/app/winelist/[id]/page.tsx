"use client";

import CardDetail from "@/components/Card/CardDetail";
import { useParams } from "next/navigation";
import ReviewStats from "./components/ReviewStats";
import ReviewList from "./components/ReviewList";
import { useState, useEffect } from "react";
import { fetchWineById } from "@/lib/api/newWine"; // 🛑 수정함
import Image from "next/image";
import Button from "@/components/Button/button";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";
import { useSession } from "next-auth/react"; // 🛑 수정함
import { useRouter } from "next/navigation";

export default function Page() {
  const [reviewsId, setReviewsId] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session, status } = useSession(); // 🛑 수정함
  const router = useRouter();

  const params = useParams(); // 🛑 수정함

  // 상세페이지 wineId // 🛑 수정함
  const wineId: number = Array.isArray(params?.id)
    ? parseInt(params.id[0] ?? "", 10)
    : parseInt(params?.id ?? "", 10) || 0;

  console.log("와인아이디", wineId);
  console.log("리뷰아이디들", reviewsId);

  // 와인의 리뷰ID들을 reviewsId에 저장
  const fetchWineReviews = async () => {
    try {
      const wineData = await fetchWineById(wineId);
      setReviewsId(wineData.reviews.map((review: { id: number }) => review.id)); // api 요청으로 가져온 리뷰 아이디들을 상태값으로 변경
    } catch (error) {
      console.error("페이지 리뷰를 가져오는데 실패했습니다", error);
    }
  };

  // 로그인 상태 확인 후, 와인 데이터를 가져오는 useEffect // 🛑 수정함
  useEffect(() => {
    if (status === "loading") {
      return; // 로딩 중이면 아무 작업도 하지 않음
    }

    if (!session) {
      router.push("/signin"); // 로그인 상태가 아니면 리다이렉트
      return;
    }

    fetchWineReviews(); // 로그인 상태가 맞으면 와인 리뷰 데이터 가져오기
  }, [status, session, wineId, router]);

  if (status === "loading" || !session) {
    return <p>로딩 중...</p>; // 로그인 상태 확인 중일 때 로딩 UI
  }

  return (
    <div className="flex flex-col max-w-[1140px] w-full mx-auto">
      <div className="w-full mt-[30px] mb-[40px] md:mt-[62px] md:mb-[60px]">
        <CardDetail id={wineId} />
      </div>
      {/* 리뷰가 1개라도 있어야 데이터 보여줌 */}
      {reviewsId.length > 0 ? (
        <div className="flex flex-col gap-[60px] justify-between lg:flex-row">
          <div className="flex-1 w-full order-last lg:order-first">
            <ReviewList wineId={wineId} reviewsId={reviewsId} />
          </div>
          <div className="order-first lg:order-last">
            <ReviewStats wineId={wineId} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <p className="text-left text-[20px] font-bold">리뷰 목록</p>
          <div className="flex flex-col items-center justify-center mx-auto gap-5">
            <Image
              src="/images/common/review-empty.svg"
              alt="리뷰 비어있음"
              width={150}
              height={186}
            />
            <Button
              className="w-[150px]"
              size="sm"
              variant="modal"
              onClick={() => {
                  setIsModalOpen(true);
                }
              }
            >
              리뷰 남기기
            </Button>
            <ModalReviewAdd
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSuccess={(newReviewId) => {
                setReviewsId((prevReviewsId) => [
                  newReviewId,
                  ...prevReviewsId,
                ]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
