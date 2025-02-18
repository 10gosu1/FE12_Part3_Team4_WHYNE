"use client";

import MoreMenu from "@/components/Moremenu/MoreMenu";
import Rating from "@/components/Card/Rating/Rating";
import CardText from "@/components/Card/CardText/CardText";

interface User {
  id: number;
  nickname: string;
  image: string;
}

interface Wine {
  id: number;
  name: string;
  image?: string;
  avgRating?: number;
}

interface ReviewData {
  id: number;
  rating: number;
  wineName: string;
  content: string;
  updatedAt: string;
  user: User;
  wine: Wine;
}

interface CardMyReviewProps {
  review: ReviewData;
  onDeleteSuccess?: () => void; // ✅ 삭제 후 UI 업데이트를 위한 프롭 추가
  onUpdateSuccess?: () => void; // ✅ 수정 후 UI 업데이트를 위한 프롭 추가
}

const formatTimeAgo = (updatedAt: string) => {
  const updatedDate = new Date(updatedAt);
  const now = new Date();
  const diffInMs = now.getTime() - updatedDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInDays < 30) return `${diffInDays}일 전`;
  if (diffInMonths < 12) return `${diffInMonths}개월 전`;
  return `${diffInYears}년 전`;
};

const CardMyReview = ({
  review,
  onDeleteSuccess,
  onUpdateSuccess,
}: CardMyReviewProps) => {
  return (
    <div className="flex flex-col w-full max-w-[800px] p-4 border rounded-lg shadow bg-white space-y-4">
      {/* 1. 평점 + 작성 시간 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rating rating={review.rating} />
          <span className="text-gray-500 text-sm">
            {formatTimeAgo(review.updatedAt)}
          </span>
        </div>
        <MoreMenu
          reviewId={review.id}
          wineId={review.wine?.id}
          userId={review.user.id}
          onDeleteSuccess={onDeleteSuccess}
          onUpdateSuccess={onUpdateSuccess}
          editType="editReview"
        />
      </div>

      {/* 2. 와인 이름 */}
      <h3 className="lg-16px-medium text-gray-500">
        {review.wineName || "이름 없음"}
      </h3>

      {/* 3. 리뷰 내용 */}
      <CardText className="text-gray-800 font-medium break-words whitespace-normal w-full">
        {review.content}
      </CardText>
    </div>
  );
};

export default CardMyReview;
