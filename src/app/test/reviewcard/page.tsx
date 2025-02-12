import React from "react";
import CardReview from "@/components/Card/CardReview/CardReview"; // ✅ 올바른 경로 확인

const ReviewCardTestPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-10 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold">📌 리뷰 카드 테스트</h1>

      {/* ✅ CardReview 컴포넌트 여러 개 렌더링 (예제) */}
      <CardReview />
      <CardReview />
      <CardReview />
    </div>
  );
};

export default ReviewCardTestPage;
