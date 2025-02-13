import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon/Icon";
import Dropdown from "@/components/Dropdown";
import ModalTwoButton from "@/components/Modal/ModalTwoButton/ModalTwoButton";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";
import { deleteReview } from "@/lib/api/review";

interface MoreMenuProps {
  reviewId: number; // 리뷰 ID
  userId: number; // 리뷰 작성자 ID
  onDeleteSuccess?: () => void; // 삭제 성공 후 UI 업데이트 함수
}

const MoreMenu: React.FC<MoreMenuProps> = ({
  reviewId,
  userId,
  onDeleteSuccess,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setLoggedInUserId(Number(storedUserId));
    }
  }, []);

  const isOwner = loggedInUserId === userId; // 본인 리뷰인지 확인

  const handleDeleteReview = async () => {
    try {
      await deleteReview(reviewId);
      setIsDeleteModalOpen(false);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
    }
  };

  return (
    <div className="relative">
      {/* ✅ 본인 리뷰일 때만 햄버거 메뉴 표시 */}
      {isOwner && (
        <Dropdown
          trigger={
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Icon name="dotSmall" size={38} className="text-gray-500" />
            </button>
          }
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          onClose={() => setIsDropdownOpen(false)}
          isLinkDropdown={false}
          width="w-[126px]"
          items={[
            { label: "수정하기", value: "edit" },
            { label: "삭제하기", value: "delete" },
          ]}
          onSelect={(value) => {
            if (value === "edit") {
              setIsEditModalOpen(true);
            }
            if (value === "delete") {
              setIsDeleteModalOpen(true);
            }
            setIsDropdownOpen(false);
          }}
        />
      )}

      {/* ✅ 리뷰 수정 모달 */}
      {isEditModalOpen && (
        <ModalReviewAdd
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* ✅ 리뷰 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <ModalTwoButton
          size="md"
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onConfirm={handleDeleteReview} // 삭제 실행
        />
      )}
    </div>
  );
};

export default MoreMenu;
