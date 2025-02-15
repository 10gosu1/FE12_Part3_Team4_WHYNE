"use client";

import { useRef } from "react";

const PriceSlider = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleStart =
    (type: string) => (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      const slider = sliderRef.current;
      if (!slider) return;

      const isTouch = event.type === "touchstart";

      const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
        const movePoint = isTouch
          ? (moveEvent as TouchEvent).touches[0]
          : (moveEvent as MouseEvent);
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

      document.addEventListener(
        isTouch ? "touchmove" : "mousemove",
        handleMove
      );
      document.addEventListener(isTouch ? "touchend" : "mouseup", handleEnd);
    };

  return (
    <div className="flex flex-col space-y-2 w-[263px] relative">
      {/* PRICE 타이틀 */}
      <div className="w-[252px] h-[32px] text-[20px] font-bold text-[#2D3034] leading-[32px]">
        PRICE
      </div>

      {/* 최소/최대 가격 표시 */}
      <div className="flex justify-between w-[252px] text-[16px] font-medium text-[#6A42DB] leading-[26px]">
        <span>₩ {minPrice?.toLocaleString() ?? "0"}</span>
        <span>₩ {maxPrice?.toLocaleString() ?? "100,000"}</span>
      </div>

      {/* 슬라이더 바 */}
      <div
        ref={sliderRef}
        className="relative w-[263px] h-[6px] bg-gray-300 rounded-full"
      >
        {/* 선택된 범위 바 */}
        <div
          className="absolute h-full bg-[#6A42DB] rounded-full"
          style={{
            left: `${(minPrice / 100000) * 100}%`,
            right: `${100 - (maxPrice / 100000) * 100}%`,
          }}
        ></div>

        {/* 최소값 조절 버튼 */}
        <div
          role="button"
          tabIndex={0}
          onMouseDown={handleStart("min")}
          onTouchStart={handleStart("min")}
          className="absolute w-[20px] h-[20px] bg-[#FFFFFF] rounded-full border border-[#6A42DB] cursor-pointer"
          style={{
            left: `calc(${(minPrice / 100000) * 100}% - 10px)`,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        ></div>

        {/* 최대값 조절 버튼 */}
        <div
          role="button"
          tabIndex={0}
          onMouseDown={handleStart("max")}
          onTouchStart={handleStart("max")}
          className="absolute w-[20px] h-[20px] bg-[#FFFFFF] rounded-full border border-[#6A42DB] cursor-pointer"
          style={{
            left: `calc(${(maxPrice / 100000) * 100}% - 10px)`,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        ></div>
      </div>
    </div>
  );
};

export default PriceSlider;
