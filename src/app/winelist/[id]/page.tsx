"use client";
import CardDetail from "@/components/Card/CardDetail";
import { useParams } from "next/navigation";
import ReviewStats from "./components/ReviewStats";
import ReviewList from "./components/ReviewList";
import { useState, useEffect } from "react";
import { fetchWineById } from "@/lib/api/wine";
import Image from "next/image";
import Button from "@/components/Button/button";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const [reviewsId, setReviewsId] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useAuth(); // 현재 로그인된 사용자 정보 가져오기
  const router = useRouter();
  const { id } = useParams();

  // id 값이 배열일 경우 첫 번째 요소를 가져옴
  const wineId: string = Array.isArray(id) ? id[0] : id || "";

  // 리뷰 id 가져오기
  const fetchReviewsId = async () => {
    try {
      const data = await fetchWineById(wineId);
      if (data.reviews) {
        setReviewsId(data.reviews.map((review: { id: number }) => review.id));
      }
    } catch (error) {
      console.error("리뷰 id가져오기 실패:", error);
    }
  };

  const handleSuccess = (newReviewId: number) => {
    console.log("새로운 리뷰 ID:", newReviewId);
    setReviewsId((prevReviewId) => [newReviewId, ...prevReviewId]);
  };

  useEffect(() => {
    if (!isLoading && !user) {
      // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!wineId) return;
    fetchReviewsId();
  }, [wineId, reviewsId]);

  if (isLoading) {
    return <p>로딩 중...</p>; // 로그인 상태 확인 중일 때 로딩 UI
  }

  if (!user) {
    return null; // 로그인 상태가 아니면 페이지 내용 렌더링 안 함 (리다이렉트 대기)
  }

  return (
    <div className="flex flex-col max-w-[1140px] w-full mx-auto">
      <div className="w-full mt-[30px] mb-[40px] md:mt-[62px] md:mb-[60px]">
        <CardDetail id={wineId} />
      </div>
      {/* 리뷰가 1개라도 있어야 데이터 보여줌. */}
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
              onClick={() => setIsModalOpen(true)}
            >
              리뷰 남기기
            </Button>
            <ModalReviewAdd
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}
