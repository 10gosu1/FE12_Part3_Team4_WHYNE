"use client";

import { useState } from "react";

const RatingFilter = ({ selectedRating: externalSelectedRating, setSelectedRating: externalSetSelectedRating }) => {
  // ✅ 내부 상태 추가 (부모가 안 넘겨주면 사용)
  const [internalSelectedRating, setInternalSelectedRating] = useState("all");

  // ✅ 부모가 상태를 넘겨주면 사용, 안 넘겨주면 내부 상태 사용
  const selectedRating = externalSelectedRating ?? internalSelectedRating;
  const setSelectedRating = externalSetSelectedRating ?? setInternalSelectedRating;

  const ratings = [
    { label: "전체", value: "all" },
    { label: "4.8 - 5.0", value: "4.8-5.0" },
    { label: "4.5 - 4.8", value: "4.5-4.8" },
    { label: "4.0 - 4.5", value: "4.0-4.5" },
    { label: "3.0 - 4.0", value: "3.0-4.0" },
  ];

  return (
    <div className="w-[98px] space-y-2">
      <div className="w-[98px] h-[32px] text-[20px] font-bold text-[#2D3034] leading-[32px]" style={{ fontFamily: "Pretendard" }}>
        RATING
      </div>
      {ratings.map((item) => (
        <label key={item.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={item.value}
            checked={selectedRating === item.value}
            onChange={() => setSelectedRating(item.value)} // ✅ setSelectedRating이 항상 함수가 되도록 보장
            className="hidden"
          />
          <div
            className={`w-[20px] h-[20px] border border-[#6A42DB] rounded-md flex items-center justify-center 
              ${selectedRating === item.value ? "bg-[#EDEBFE] border-2 border-[#6A42DB]" : "bg-white border-[#6A42DB]"}`}
          >
            {selectedRating === item.value && <div className="w-[12px] h-[12px] bg-[#6A42DB] rounded-md"></div>}
          </div>
          <span className="text-[16px] font-medium leading-[26px] text-[#2D3034]" style={{ fontFamily: "Pretendard" }}>
            {item.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RatingFilter;
