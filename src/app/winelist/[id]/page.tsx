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

export default function Page() {
  const [reviewsId, setReviewsId] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (!wineId) return;
    fetchReviewsId();
  }, [wineId, reviewsId]);

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
