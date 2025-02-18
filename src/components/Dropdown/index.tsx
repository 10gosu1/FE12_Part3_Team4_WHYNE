"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import DropdownWithLinks from "./DropdownWithLinks";
import DropdownWithSelect from "./DropdownWithSelect";

/**
 * ✅ 공통 드롭다운 컴포넌트 (Dropdown)
 *
 * @param {string} [className] - 추가적인 Tailwind CSS 클래스를 적용할 수 있음
 * @param {Array} items - 드롭다운 내부에 들어갈 항목 목록
 *  - `href` 속성이 있는 경우: 링크형 드롭다운 (`isLinkDropdown: true`일 때 사용)
 *  - `value` 속성이 있는 경우: 선택형 드롭다운 (`isLinkDropdown: false`일 때 사용)
 * @param {React.ReactNode} trigger - 드롭다운을 여는 트리거 버튼 (예: 아이콘, 버튼 등)
 * @param {boolean} isOpen - 드롭다운이 열려 있는지 여부
 * @param {() => void} onToggle - 트리거 버튼 클릭 시 드롭다운을 열거나 닫는 함수
 * @param {() => void} onClose - 드롭다운 외부 클릭 시 닫히는 함수
 * @param {boolean} [isLinkDropdown=false] - true면 링크형 드롭다운, false면 선택형 드롭다운
 * @param {string} [dropdownPosition="left-0"] - 드롭다운 위치 (Tailwind CSS 기준)
 * @param {(value: string) => void} [onSelect] - 선택형 드롭다운에서 항목 클릭 시 호출되는 함수
 * @param {string} [width="w-full"] - 드롭다운의 너비 지정 가능 (예: `w-48`)
 * @param {string} [dropdownStyle] - 추가적인 드롭다운 스타일 적용 가능
 */

interface DropdownProps {
  className?: string;
  items: {
    label: string;
    href?: string;
    value?: string;
    onClick?: () => void;
  }[];
  trigger: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isLinkDropdown?: boolean;
  dropdownPosition?: string;
  onSelect?: (value: string) => void;
  width?: string;
  dropdownStyle?: string;
}

export default function Dropdown({
  className,
  items,
  trigger,
  isOpen,
  onToggle,
  onClose,
  isLinkDropdown = false,
  dropdownPosition = "left-0",
  onSelect,
  width = "w-full",
  dropdownStyle,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // ✅ 드롭다운 메뉴 기본 스타일
  const dropdownMenuStyles =
    "absolute p-[6px] mt-[6px] border border-[#CFDBEA] rounded-[16px] bg-white z-50 flex flex-col items-center text-md-14px-medium md:text-lg-16px-medium";

  const dropdownWidth = width ? width : "w-full";
  const dropdownPositionClass = dropdownPosition || "right-0 top-full";

  // ✅ 항목 필터링: 링크형은 href가 있는 항목, 선택형은 value가 있는 항목
  const linkItems = items.filter((item) => item.href);
  const selectItems = items.filter((item) => item.value);

  return (
    <div className={clsx("relative inline-block", className)} ref={dropdownRef}>
      {/* ✅ 부모에서 전달받은 trigger 사용 */}
      <div onClick={onToggle} className="flex">
        {trigger}
      </div>

      {/* ✅ 드롭다운 렌더링 */}
      {isOpen && (
        <div
          className={clsx(
            dropdownMenuStyles,
            dropdownPositionClass,
            dropdownWidth,
            dropdownStyle
          )}
        >
          {isLinkDropdown ? (
            <DropdownWithLinks
              items={linkItems as { label: string; href: string }[]}
            />
          ) : (
            <DropdownWithSelect
              items={selectItems as { label: string; value: string }[]}
              onSelect={onSelect}
              onClose={onClose}
            />
          )}
        </div>
      )}
    </div>
  );
}
