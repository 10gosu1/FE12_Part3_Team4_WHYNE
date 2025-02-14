"use client";

interface TabButtonsProps {
  activeTab: number;
  handleTabClick: (tabIndex: number) => void;
  reviewCount: number;
  wineCount: number;
}

export default function TabButtons({
  activeTab,
  handleTabClick,
  reviewCount,
  wineCount,
}: TabButtonsProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[16px] md:gap-[32px] text-2lg-18px-bold md:text-xl-20px-bold">
        <button
          className={`${activeTab === 1 ? "text-gray-800" : "text-gray-500"} hover:text-purple-100 transition`}
          onClick={() => handleTabClick(1)}
        >
          내가 쓴 후기
        </button>
        <button
          className={`${activeTab === 2 ? "text-gray-800" : "text-gray-500"} hover:text-purple-100 transition`}
          onClick={() => handleTabClick(2)}
        >
          내가 등록한 와인
        </button>
      </div>
      <span className="text-xs-12px-regular md:text-md-14px-regular text-purple-100">
        총 {activeTab === 1 ? reviewCount : wineCount} 개
      </span>
    </div>
  );
}
