"use client";

import { useState } from "react";
import { X } from "lucide-react";
import WineTypeSelector from "@/components/filter/WineTypeSelector";
import PriceSlider from "@/components/filter/PriceSlider";
import RatingFilter from "@/components/filter/RatingFilter";

interface ModalFilterProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFilter: React.FC<ModalFilterProps> = ({ isOpen, setIsOpen }) => {
  // 필터 상태 관리
  // ✅ selectedType의 초기값을 "WHITE"로 변경
  const [selectedType, setSelectedType] = useState<
    "RED" | "WHITE" | "SPARKLING"
  >("WHITE");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedRating, setSelectedRating] = useState("all");

  // 초기화 버튼 클릭 시 기본값으로 리셋
  const handleReset = () => {
    setSelectedType("WHITE");
    setMinPrice(0);
    setMaxPrice(100000);
    setSelectedRating("all");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:hidden">
      <div className="bg-white w-[90%] max-w-[375px] p-6 rounded-lg shadow-lg">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">필터</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* 필터 옵션 */}
        <WineTypeSelector
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <hr className="my-4 border-gray-200" />
        <PriceSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <hr className="my-4 border-gray-200" />
        <RatingFilter
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />

        {/* 버튼 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="w-1/4 py-3 bg-[#F2F4F8] text-[#6A42DB] rounded-lg mr-2"
          >
            초기화
          </button>
          <button className="w-3/4 py-3 bg-[#6A42DB] text-white rounded-lg">
            필터 적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
