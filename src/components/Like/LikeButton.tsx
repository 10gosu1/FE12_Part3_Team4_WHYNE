import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon/Icon";
import { likeReview, unlikeReview } from "@/lib/api/review";

interface LikeButtonProps {
  reviewId: number;
  initialLiked: boolean;
  userId: number; // 해당 리뷰를 작성한 사용자 ID
}

const LikeButton: React.FC<LikeButtonProps> = ({
  reviewId,
  initialLiked,
  userId,
}) => {
  // 좋아요 상태를 관리하는 state, 초기값은 initialLiked에서 받아옴
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  // 로그인한 유저의 ID를 localStorage에서 가져옴
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setLoggedInUserId(Number(storedUserId));
    }
  }, []);

  // 본인이 작성한 리뷰인지 확인
  const isOwner = loggedInUserId === userId;

  // 좋아요 토글 시 실행되는 함수
  const handleLikeToggle = async () => {
    if (isOwner) {
      alert("본인의 리뷰에는 좋아요를 누를 수 없습니다.");
      return;
    }

    try {
      if (isLiked) {
        await unlikeReview(reviewId); // 좋아요 취소 API 호출
      } else {
        await likeReview(reviewId); // 좋아요 추가 API 호출
      }
      setIsLiked(!isLiked); // API 성공 시 상태 변경
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생", error);
    }
  };

  return (
    <button onClick={handleLikeToggle} disabled={isOwner}>
      {/* 좋아요 상태에 따라 다른 아이콘 표시 */}
      <Icon
        name={isLiked ? "liked" : "like"}
        size={38}
        className={isLiked ? "text-red-500" : "text-gray-500"}
      />
    </button>
  );
};

export default LikeButton;
