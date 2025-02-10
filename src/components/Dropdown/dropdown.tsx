"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

/**
 * ✅ 공통 드롭다운 컴포넌트
 * - `size`: 드롭다운 서브메뉴 크기 지정 ("md" 또는 "sm")
 * - `items`: 드롭다운 내부에 들어갈 메뉴 목록 (배열)
 * - `className`: 추가적인 Tailwind 스타일 적용 가능
 * - `isWineDropdown`: 텍스트 드롭다운이 아닌 와인 선택 드롭다운으로 전환
 */

interface DropdownProps {
  size?: "md" | "sm";
  className?: string;
  items: { label: string; href?: string }[]; // 버튼 메뉴(텍스트) 동적 관리
  isWineDropdown?: boolean;
}

export default function Dropdown({
   size = "md", 
   className, 
   items, 
   isWineDropdown = false, 
}: DropdownProps) {

  // 드롭다운 메뉴의 열림 상태를 관리하는 상태 변수
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 컴포넌트의 DOM 참조 (외부 클릭 감지에 사용)
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 열기/닫기 토글 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 드롭다운 외부 클릭 시 메뉴를 닫기 위한 효과
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 드롭다운 메뉴 크기
  const dropdownSizeStyles = {
    md: isWineDropdown ? "w-[412px] h-auto" : "w-[126px] h-auto px-[1px] py-[3px]",
    sm: isWineDropdown ? "w-[303px] h-auto" : "w-[101px] h-auto px-[1px]",
  };

  // 텍스트 스타일
  // md: lg-16px-Medium
  // sm: md-14px-Medium
  // md-Winedropdown: lg-16px-medium
  const textSizeStyles = {
    md: isWineDropdown ? "text-[18px] font-medium" : "text-[16px] font-medium",
    sm: isWineDropdown ? "text-[16px] font-medium" : "text-[14px] font-medium",
  };

  // 공통 버튼 스타일 (임의 설정)
  const baseButtonStyles =
    "flex items-center border border-[#CFDBEA] rounded-[16px] focus:outline-none transition-colors duration-200 px-4 py-2";

  // 드롭다운 메뉴 스타일 (절대 위치로 오버레이되며, z-index로 기존 요소 위에 표시)
  const dropdownMenuStyles =
    "absolute mt-2 border border-[#CFDBEA] rounded-[16px] bg-white z-50 flex flex-col gap-0";

  const dropdownItemStyles = clsx(
    "flex justify-center items-center px-1 py-1 transition duration-200",
    isWineDropdown ? "justify-start w-full" : "justify-center"
  );

  const dropdownHoverStyles = clsx(
    "flex w-full py-[8px] hover:bg-purple-10 hover:text-purple-100 rounded-[8px]",
    isWineDropdown ? "flex justify-center text-left px-6" : "flex justify-center text-center"
  );

  return (
    <div className={clsx("relative inline-block", className)} ref={dropdownRef}>
      {/* 드롭다운 트리거 버튼 */}
      <button
        onClick={toggleDropdown}
        className={clsx(baseButtonStyles)}
      >
        {isWineDropdown ? "와인 선택" : "기본"}
      </button>

      {/* 드롭다운 메뉴 (isOpen이 true일 때 렌더링) */}
      {isOpen && (
        <div className={clsx(dropdownMenuStyles, dropdownSizeStyles[size])}>
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              className={clsx(
                dropdownItemStyles,
                textSizeStyles[size],
                index === 0 ? "rounded-t-[16px]" : "",
                index === items.length - 1 ? "rounded-b-[16px]" : ""
              )}
            >
              <div className={clsx(dropdownHoverStyles)}>{item.label}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
