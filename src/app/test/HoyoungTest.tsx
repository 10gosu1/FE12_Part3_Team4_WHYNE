"use client";

import Dropdown from "@/components/Dropdown/dropdown";

export default function HoyeongTest() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ✅ md 사이즈 기본 드롭다운 */}
      <div className="flex flex-col gap-2">
        <Dropdown 
          size="md" 
          items={[
            { label: "마이페이지", href: "/mypage"},
            { label: "로그아웃", href: "/"},
          ]}
        />
      </div>

      {/* ✅ sm 사이즈 기본 드롭다운 */}
      <div className="flex flex-col gap-2">
        <Dropdown 
          size="sm" 
          items={[
            { label: "마이페이지", href: "/mypage"},
            { label: "로그아웃", href: "/"},
          ]}
        />
      </div>

      {/* ✅ md 사이즈 와인 선택 드롭다운 */}
      <div className="flex flex-col gap-2">
        <Dropdown
          size="md"
          items={[
            { label: "Red" },
            { label: "White" },
            { label: "Sparkling" },
          ]}
          isWineDropdown={true}
        />
      </div>

      {/* ✅ sm 사이즈 와인 선택 드롭다운 */}
      <div className="flex flex-col gap-2">
      <Dropdown
          size="sm"
          items={[
            { label: "Red" },
            { label: "White" },
            { label: "Sparkling" },
          ]}
          isWineDropdown={true}
        />
      </div>
    </div>
  );
}
