"use client";

import React from "react";

const WineTypeSelector = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: "RED" | "WHITE" | "SPARKLING" | "ALL";
  setSelectedType: (type: "RED" | "WHITE" | "SPARKLING" | "ALL") => void;
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

  const handleTypeSelect = (type: "RED" | "WHITE" | "SPARKLING" | "ALL") => {
    setSelectedType(selectedType === type ? "ALL" : type); // ✅ 같은 버튼 클릭 시 "ALL"로 변경
  };

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
            onClick={() => handleTypeSelect(btn.value)}
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
