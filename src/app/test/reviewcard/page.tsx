"use client";

import ReviewCard from "@/components/Card/CardReview/CardReview";

const testReview = {
  id: 1668,
  rating: 4.5,
  aroma: ["체리", "오크", "바닐라"],
  content: "이 와인은 체리와 오크 향이 강하게 느껴져요",
  createdAt: "2025-02-14T02:52:22.425Z",
  updatedAt: "2025-02-14T11:58:30.947Z",
  user: {
    id: 964, // 가짜 사용자 ID
    nickname: "와인러버",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/962/1739410730136/001001000878.png", // 기본 프로필 이미지
  },
  isLiked: false,
  lightBold: 7,
  smoothTannic: 3,
  drySweet: 4,
  softAcidic: 2,
};

const ReviewTest = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <ReviewCard review={testReview} />
    </div>
  );
};

export default ReviewTest;
