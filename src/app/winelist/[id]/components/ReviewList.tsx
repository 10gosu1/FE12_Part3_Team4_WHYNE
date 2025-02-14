import CardReview from "@/components/Card/CardReview/CardReview";
import { useEffect, useState } from "react";
import { fetchReviewById } from "@/lib/api/review";
import Image from "next/image";

interface User {
  id: number;
  nickname: string;
  image: string;
}

interface ReviewData {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  isLiked: boolean;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}

type ReviewListProps = {
  wineId: string;
  reviewsId: number[];
};

export default function ReviewList({ reviewsId }: ReviewListProps) {
  const [reviewData, setReviewData] = useState<ReviewData[] | null>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 모든 리뷰 ID에 대해 개별적으로 fetchReviewById 호출
        const reviewPromises = reviewsId.map((id) => fetchReviewById(id));
        const reviews = await Promise.all(reviewPromises);
        setReviewData(reviews); // 배열로 저장
      } catch (error) {
        console.error("리뷰 데이터 가져오기 실패:", error);
      }
    };

    if (reviewsId.length > 0) {
      fetchReviews();
    }
  }, [reviewsId]);
  return (
    <div className="flex flex-col gap-[22px]">
      <p className="text-[20px] font-bold">리뷰 목록</p>
      {reviewData ? (
        reviewData.map((review) => (
          <CardReview key={review.id} review={review} />
        ))
      ) : (
        <Image
          src={"/images/common/review-empty.svg"}
          alt="비어있는 리뷰"
          width={150}
          height={186}
        />
      )}
    </div>
  );
}
