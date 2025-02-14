"use client";

import React from "react";

const WineTypeSelector = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: "RED" | "WHITE" | "SPARKLING";
  setSelectedType: (type: "RED" | "WHITE" | "SPARKLING") => void;
}) => {
  const buttons = [
    {
      label: "Red",
      value: "RED" as const,
      width: "w-[65px]",
      border: "rounded-tl-full",
    },
    { label: "White", value: "WHITE" as const, width: "w-[79px]", border: "" },
    {
      label: "Sparkling",
      value: "SPARKLING" as const,
      width: "w-[105px]",
      border: "rounded-tr-full",
    },
  ];

  return (
    <div className="flex flex-col items-start space-y-2">
      <div
        className="w-[120px] h-[32px] text-[20px] leading-[32px] font-bold text-gray-800"
        style={{ fontFamily: "Pretendard" }}
      >
        WINE TYPES
      </div>
      <div className="flex space-x-2">
        {buttons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setSelectedType(btn.value)} // ✅ 부모 컴포넌트에서 상태 변경
            className={`h-[42px] px-[18px] py-[10px] border border-[#CFDBEA] ${btn.width} ${btn.border} rounded-full 
              ${selectedType === btn.value ? "bg-[#6A42DB] text-white" : "bg-white text-black"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WineTypeSelector;
