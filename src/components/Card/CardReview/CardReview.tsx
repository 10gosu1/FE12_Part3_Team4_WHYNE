import React from "react";

const CardReview = () => {
  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
      {/* ✅ 상단: 프로필, 닉네임, 좋아요 아이콘, 더보기 버튼 */}
      <div className="flex justify-between items-center">
        {/* 프로필 & 닉네임 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-semibold">와인리뷰</p>
            <p className="text-xs text-gray-500">10시간 전</p>
          </div>
        </div>
        {/* 좋아요 & 더보기 버튼 */}
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-red-500">❤️</button>
          <button className="text-gray-400 hover:text-gray-600">⋮</button>
        </div>
      </div>

      {/* ✅ 평점 (하트 아래) */}
      <div className="flex justify-end">
        <div className="bg-purple-100 text-purple-600 px-3 py-1 text-sm font-bold rounded-full">
          ⭐ 5.0
        </div>
      </div>

      {/* ✅ 태그 */}
      <div className="flex gap-2 flex-wrap">
        <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">
          체리
        </span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">
          오크
        </span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">
          카라멜
        </span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">
          시트러스
        </span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">
          꽃
        </span>
      </div>

      {/* ✅ 리뷰 설명 텍스트 */}
      <p className="text-gray-700 text-sm">
        Deep maroon color, tasting notes of blackberry, dark chocolate, plum.
        Super jammy and bold with some smoky after notes. Big flavor. Amazing
        value (would pay three times the price for it), well-balanced flavor.
        Could drink all day everyday with or without food. I need more
        immediately.
      </p>

      {/* ✅ 맛 슬라이더 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="bg-gray-200 px-2 py-1 rounded">바디감</span>
          <span>가벼워요</span>
          <div className="w-2/4 bg-gray-200 h-1 relative">
            <div className="bg-purple-500 h-1 w-1/3 absolute left-0"></div>
          </div>
          <span>진해요</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="bg-gray-200 px-2 py-1 rounded">타닌</span>
          <span>부드러워요</span>
          <div className="w-2/4 bg-gray-200 h-1 relative">
            <div className="bg-purple-500 h-1 w-1/2 absolute left-0"></div>
          </div>
          <span>떫어요</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="bg-gray-200 px-2 py-1 rounded">당도</span>
          <span>드라이해요</span>
          <div className="w-2/4 bg-gray-200 h-1 relative">
            <div className="bg-purple-500 h-1 w-1/4 absolute left-0"></div>
          </div>
          <span>달아요</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="bg-gray-200 px-2 py-1 rounded">산미</span>
          <span>안셔요</span>
          <div className="w-2/4 bg-gray-200 h-1 relative">
            <div className="bg-purple-500 h-1 w-2/3 absolute left-0"></div>
          </div>
          <span>많이셔요</span>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
