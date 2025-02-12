import React, { useState } from "react";
import Icon from "@/components/Icon/Icon";
import Dropdown from "@/components/Dropdown";
import ModalTwoButton from "@/components/Modal/ModalTwoButton/ModalTwoButton";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";

const MoreMenu = ({ reviewId }: { reviewId: number }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="relative">
      {/*  햄버거 메뉴 버튼 */}
      <Dropdown
        trigger={
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Icon name="dotSmall" size={24} className="text-gray-500" />
          </button>
        }
        isOpen={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        onClose={() => setIsDropdownOpen(false)}
        isLinkDropdown={false} //  선택형 드롭다운 유지
        width="w-[126px]"
        items={[
          { label: "수정하기", value: "edit" },
          { label: "삭제하기", value: "delete" },
        ]}
        onSelect={(value) => {
          //  onSelect로 모달 열기
          if (value === "edit") {
            console.log("수정하기 버튼 클릭됨");
            setIsEditModalOpen(true);
          }
          if (value === "delete") {
            console.log("삭제하기 버튼 클릭됨");
            setIsDeleteModalOpen(true);
          }
          setIsDropdownOpen(false); // 드롭다운 닫기
        }}
      />

      {/*  리뷰 수정 모달 (UI 확인용) */}
      {isEditModalOpen && (
        <ModalReviewAdd
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/*  리뷰 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <ModalTwoButton
          size="md"
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          reviewId={reviewId} //  삭제할 리뷰 ID 전달
        />
      )}
    </div>
  );
};

export default MoreMenu;
