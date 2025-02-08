"use client";

import { useState } from "react";
import Dropdown from "@/components/Dropdown/dropdown";
import ModalTwoButton from "@/components/Modal/ModalTwoButton/ModalTwoButton";
import Button from "@/components/Button/button";

export default function HoyeongTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"md" | "sm">("md");

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

      {/* ✅ Modal 테스트 섹션 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            {/* md 모달 열기 버튼 */}
              <Button
                onClick={() => {
                  setModalSize("md");
                  setIsModalOpen(true);
                }} 
              >
                Modal(md)
              </Button>
            {/* sm 모달 열기 버튼 */}
              <Button
                onClick={() => {
                  setModalSize("sm");
                  setIsModalOpen(true);
                }}
              >
                Modal(sm)
              </Button>
          </div>
        </div>

      {/* ModalTwoButton 컴포넌트 렌더링 */}
      <ModalTwoButton size={modalSize} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}
