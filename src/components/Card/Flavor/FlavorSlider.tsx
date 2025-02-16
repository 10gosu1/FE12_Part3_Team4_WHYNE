"use client";

import { useState } from "react";

export default function FlavorSlider({
  lightBold: externalLightBold,
  setLightBold: externalSetLightBold,
  smoothTannic: externalSmoothTannic,
  setSmoothTannic: externalSetSmoothTannic,
  drySweet: externalDrySweet,
  setDrySweet: externalSetDrySweet,
  softAcidic: externalSoftAcidic,
  setSoftAcidic: externalSetSoftAcidic,
  isReadOnly = false, // 읽기 전용 모드 추가 (기본값: false)
  className = "",
}: {
  lightBold?: number;
  setLightBold?: (value: number) => void;
  smoothTannic?: number;
  setSmoothTannic?: (value: number) => void;
  drySweet?: number;
  setDrySweet?: (value: number) => void;
  softAcidic?: number;
  setSoftAcidic?: (value: number) => void;
  isReadOnly?: boolean;
  className?: string;
}) {
  // ✅ 내부 상태 추가 (부모가 값을 안 넘기면 이걸 사용)
  const [localLightBold, setLocalLightBold] = useState(50);
  const [localSmoothTannic, setLocalSmoothTannic] = useState(50);
  const [localDrySweet, setLocalDrySweet] = useState(50);
  const [localSoftAcidic, setLocalSoftAcidic] = useState(50);

  // ✅ 부모가 넘긴 값이 있으면 사용, 없으면 내부 상태 사용
  const lightBold = externalLightBold ?? localLightBold;
  const setLightBold = externalSetLightBold ?? setLocalLightBold;

  const smoothTannic = externalSmoothTannic ?? localSmoothTannic;
  const setSmoothTannic = externalSetSmoothTannic ?? setLocalSmoothTannic;

  const drySweet = externalDrySweet ?? localDrySweet;
  const setDrySweet = externalSetDrySweet ?? setLocalDrySweet;

  const softAcidic = externalSoftAcidic ?? localSoftAcidic;
  const setSoftAcidic = externalSetSoftAcidic ?? setLocalSoftAcidic;

  const sliders = [
    {
      label: "바디감",
      leftLabel: "가벼워요",
      rightLabel: "진해요",
      value: lightBold,
      setter: setLightBold,
    },
    {
      label: "타닌",
      leftLabel: "부드러워요",
      rightLabel: "떫어요",
      value: smoothTannic,
      setter: setSmoothTannic,
    },
    {
      label: "당도",
      leftLabel: "드라이해요",
      rightLabel: "달아요",
      value: drySweet,
      setter: setDrySweet,
    },
    {
      label: "산미",
      leftLabel: "안셔요",
      rightLabel: "많이셔요",
      value: softAcidic,
      setter: setSoftAcidic,
    },
  ];

  const handleChange = (index: number, value: number) => {
    // ✅ setter가 존재하는지 확인하고 실행
    if (!isReadOnly && typeof sliders[index].setter === "function") {
      sliders[index].setter(value);
    }
  };

  return (
    <div className={`flex flex-col space-y-3 w-[480px] w-full ${className}`}>
      {sliders.map((slider, index) => (
        <div key={slider.label} className="flex items-center gap-2 w-full">
          {/* 왼쪽 버튼 */}
          <div className="w-[54px] h-[25px] bg-[#F2F4F8] text-[#9FACBD] text-[14px] font-semibold flex items-center justify-center rounded-md whitespace-nowrap">
            {slider.label}
          </div>

          {/* 슬라이더 영역 */}
          <div className="flex items-center justify-between w-[402px]">
            <span className="text-[16px] font-medium text-[#2D3034] whitespace-nowrap">
              {slider.leftLabel}
            </span>

            <input
              type="range"
              min="0"
              max="10"
              value={slider.value}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              className={`w-[260px] h-[6px] appearance-none bg-[#CFDBEA] rounded-full
                ${isReadOnly ? "pointer-events-none opacity-100" : "cursor-pointer"} 
                accent-[#6A42DB]`}
            />

            <span className="text-[16px] font-medium text-[#2D3034] whitespace-nowrap">
              {slider.rightLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
