"use client";

import React, { useState } from "react";
import Dropdown from "@/components/Dropdown";

export default function TestPage() {
  // ✅ 첫 번째 드롭다운 상태
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);

  // ✅ 두 번째 드롭다운 상태
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  // ✅ 드롭다운 항목
  const linkItems = [
    { label: "Google", href: "https://www.google.com" },
    { label: "Facebook", href: "https://www.facebook.com" },
  ];

  const selectItems = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <h1 className="text-2xl font-bold">드롭다운 테스트</h1>
      <div className="flex flex-col gap-[30px] w-full m-3">
        {/* ✅ 첫 번째 링크형 드롭다운 */}
        <Dropdown
          items={linkItems}
          trigger={
            <button className="p-2 border rounded ">링크 드롭다운</button>
          }
          isOpen={isDropdownOpen1}
          onToggle={() => setIsDropdownOpen1(!isDropdownOpen1)}
          onClose={() => setIsDropdownOpen1(false)}
          isLinkDropdown={true}
          width="w-[100px] md:w-[126px]"
        />

        {/* ✅ 두 번째 선택형 드롭다운 */}
        <Dropdown
          items={selectItems}
          trigger={
            <button className="p-2 border rounded">선택 드롭다운</button>
          }
          isOpen={isDropdownOpen2}
          onToggle={() => setIsDropdownOpen2(!isDropdownOpen2)}
          onClose={() => setIsDropdownOpen2(false)}
          isLinkDropdown={false}
          onSelect={(value) => alert(`선택된 값: ${value}`)}
          width="w-full"
        />
      </div>
    </div>
  );
}
