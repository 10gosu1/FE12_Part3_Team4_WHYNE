"use client";

import { useRef } from "react";

const PriceSlider = ({ minPrice = 0, maxPrice = 100000, setMinPrice, setMaxPrice }) => {
  const sliderRef = useRef(null);

  const handleMouseDown = (type) => (event) => {
    event.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseMove = (moveEvent) => {
      const rect = slider.getBoundingClientRect();
      const offsetX = moveEvent.clientX - rect.left;
      const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
      let newValue = Math.round(percentage * 100000);
      
      // 1000 단위로 반올림
      newValue = Math.round(newValue / 1000) * 1000;
      
      if (type === "min" && newValue < maxPrice - 1000) {
        setMinPrice(newValue);
      } else if (type === "max" && newValue > minPrice + 1000) {
        setMaxPrice(newValue);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col space-y-2 w-[263px] relative">
      {/* PRICE 타이틀 */}
      <div className="w-[252px] h-[32px] text-[20px] font-bold text-[#2D3034] leading-[32px]" style={{ fontFamily: "Pretendard" }}>
        PRICE
      </div>

      {/* 최소/최대 가격 표시 */}
      <div className="flex justify-between w-[252px] text-[16px] font-medium text-[#6A42DB] leading-[26px]" style={{ fontFamily: "Pretendard" }}>
        <span>₩ {minPrice?.toLocaleString() || "0"}</span>
        <span>₩ {maxPrice?.toLocaleString() || "100,000"}</span>
      </div>

      {/* 슬라이더 바 */}
      <div ref={sliderRef} className="relative w-[263px] h-[6px] bg-gray-300 rounded-full">
        {/* 선택된 범위 바 */}
        <div
          className="absolute h-full bg-[#6A42DB] rounded-full"
          style={{ left: `${(minPrice / 100000) * 100}%`, right: `${100 - (maxPrice / 100000) * 100}%` }}
        ></div>

        {/* 최소값 조절 버튼 */}
        <div
          role="button"
          tabIndex={0}
          onMouseDown={handleMouseDown("min")}
          className="absolute w-[20px] h-[20px] bg-[#FFFFFF] rounded-full border border-[#6A42DB] cursor-pointer"
          style={{ left: `calc(${(minPrice / 100000) * 100}% - 10px)`, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        ></div>

        {/* 최대값 조절 버튼 */}
        <div
          role="button"
          tabIndex={0}
          onMouseDown={handleMouseDown("max")}
          className="absolute w-[20px] h-[20px] bg-[#FFFFFF] rounded-full border border-[#6A42DB] cursor-pointer"
          style={{ left: `calc(${(maxPrice / 100000) * 100}% - 10px)`, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        ></div>
      </div>
    </div>
  );
};

export default PriceSlider;
