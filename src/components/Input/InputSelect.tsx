"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
// import Dropdown from "@/components/Dropdown";

interface InputSelectProps {
  options: ("RED" | "WHITE" | "SPARKLING")[]; // options 값이 제한된 타입만 받도록 수정
  selectedValue?: "RED" | "WHITE" | "SPARKLING"; // selectedValue 값이 제한된 타입만 받도록 수정
  onChange?: (value: "RED" | "WHITE" | "SPARKLING") => void; // onChange 매개변수 타입을 제한된 값으로 수정
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export default function InputSelect({
  options,
  selectedValue,
  onChange,
  className = "",
}: InputSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<
    "RED" | "WHITE" | "SPARKLING" | string
  >(selectedValue || "타입을 선택해주세요");

  const handleSelect = (value: "RED" | "WHITE" | "SPARKLING") => {
    setCurrentValue(value);
    if (onChange) onChange(value);
  };

  // Dropdown 테스트
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  interface DropdownProps {
    options: ("RED" | "WHITE" | "SPARKLING")[];
    onSelect: (value: "RED" | "WHITE" | "SPARKLING") => void;
    closeDropdown: () => void;
  }

  const Dropdown = ({ options, onSelect, closeDropdown }: DropdownProps) => {
    return (
      <div
        ref={dropdownRef}
        className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-2xl shadow-lg z-10 overflow-hidden"
      >
        <ul>
          {options.map((option) => (
            <li
              key={option}
              className="flex items-center h-[52px] p-[6px] cursor-pointer"
              onClick={() => {
                onSelect(option);
                closeDropdown();
              }}
            >
              <div className="w-full px-[16px] py-[10px] text-gray-800 hover:bg-purple-10 hover:text-purple-100 rounded-[10px] text-md-14px-medium md:text-lg-16px-medium">
                {option}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`flex items-center w-full h-[42px] md:h-[48px] py-[14px] px-[20px] rounded-2xl border border-gray-300 focus:border-purple-100 focus:outline-none text-md-14px-regular md:text-lg-16px-regular text-left ${
          isOpen ? "text-gray-500" : "text-gray-800"
        }`}
        onClick={toggleDropdown}
      >
        {currentValue}
        <Icon
          name="dropdown"
          size={24}
          viewBox="0 0 24 24"
          className="absolute right-[20px] text-gray-300"
        />
      </button>

      {isOpen && (
        <Dropdown
          options={options}
          onSelect={handleSelect}
          closeDropdown={closeDropdown}
        />
      )}
    </div>
  );
}
