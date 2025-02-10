"use client";

import { useRef, useState } from "react";

const PriceSlider = ({ minPrice: externalMinPrice, maxPrice: externalMaxPrice, setMinPrice: externalSetMinPrice, setMaxPrice: externalSetMaxPrice }: 
  { minPrice?: number; maxPrice?: number; setMinPrice?: (value: number) => void; setMaxPrice?: (value: number) => void }) => {
  const sliderRef = useRef(null);

  // ✅ 내부 상태 추가 (부모에서 props를 안 넘겨주면 이걸 사용)
  const [localMinPrice, setLocalMinPrice] = useState(0);
  const [localMaxPrice, setLocalMaxPrice] = useState(100000);

  // ✅ 부모에서 값을 넘겨주면 사용하고, 없으면 내부 상태 사용
  const minPrice = externalMinPrice ?? localMinPrice;
  const maxPrice = externalMaxPrice ?? localMaxPrice;
  const setMinPrice = externalSetMinPrice ?? setLocalMinPrice;
  const setMaxPrice = externalSetMaxPrice ?? setLocalMaxPrice;

  const handleStart = (type) => (event) => {
    event.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;

    const isTouch = event.type === "touchstart";
    const startEvent = isTouch ? event.touches[0] : event;
    
    const handleMove = (moveEvent) => {
      const movePoint = isTouch ? moveEvent.touches[0] : moveEvent;
      const rect = slider.getBoundingClientRect();
      const offsetX = movePoint.clientX - rect.left;
      const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
      let newValue = Math.round(percentage * 100000);
      
      newValue = Math.round(newValue / 1000) * 1000;
      
      if (type === "min" && newValue < maxPrice - 1000) {
        setMinPrice(newValue);
      } else if (type === "max" && newValue > minPrice + 1000) {
        setMaxPrice(newValue);
      }
    };

    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };

    document.addEventListener(isTouch ? "touchmove" : "mousemove", handleMove);
    document.addEventListener(isTouch ? "touchend" : "mouseup", handleEnd);
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
          onMouseDown={handleStart("min")}
          onTouchStart={handleStart("min")}
          className="absolute w-[20px] h-[20px] bg-[#FFFFFF] rounded-full border border-[#6A42DB] cursor-pointer"
          style={{ left: `calc(${(minPrice / 100000) * 100}% - 10px)`, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        ></div>

        {/* 최대값 조절 버튼 */}
        <div
          role="button"
          tabIndex={0}
          onMouseDown={handleStart("max")}
          onTouchStart={handleStart("max")}
          className="absolute w-[20px] h-[20px] bg-[#FFFFFF] rounded-full border border-[#6A42DB] cursor-pointer"
          style={{ left: `calc(${(maxPrice / 100000) * 100}% - 10px)`, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        ></div>
      </div>
    </div>
  );
};

export default PriceSlider;
