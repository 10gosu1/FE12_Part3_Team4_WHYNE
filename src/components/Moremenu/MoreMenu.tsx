import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon/Icon";
import Dropdown from "@/components/Dropdown";
import ModalTwoButton from "@/components/Modal/ModalTwoButton/ModalTwoButton";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";
import ModalWineAdd from "@/components/Modal/ModalWineAdd/ModalWineAdd";
import { deleteReview } from "@/lib/api/review";
import { deleteWine, updateWine, WineData } from "@/lib/api/wine"; // ✅ WineData import

interface MoreMenuProps {
  reviewId?: number; // 리뷰 ID (리뷰 수정 전용)
  userId: number; // 작성자 ID
  wineId?: number;
  wineData?: WineData; // ✅ wineData에서 wineId 가져옴
  editType: "editReview" | "editWine"; // ✅ 수정 유형
  onDeleteSuccess?: () => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({
  reviewId,
  userId,
  wineData, // ✅ wineData에서 wineId 추출
  editType,
  onDeleteSuccess,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  // ✅ wineData에서 id 추출 (wineId 직접 받는 방식 제거)
  const wineId = wineData?.id;

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setLoggedInUserId(Number(storedUserId));
    }
  }, []);

  const isOwner = loggedInUserId === userId; // ✅ 본인 리뷰인지 확인

  const handleDelete = async () => {
    if (editType === "editWine" && !wineId) {
      console.error("❌ wineId가 없습니다. 삭제할 수 없습니다.");
      return;
    }

    try {
      if (editType === "editReview" && reviewId) {
        await deleteReview(reviewId);
      } else if (editType === "editWine" && wineId) {
        await deleteWine(wineId);
      }

      console.log("✅ 삭제 완료");
      setIsDeleteModalOpen(false);

      if (onDeleteSuccess) {
        console.log("✅ 삭제 후 리스트 갱신 실행");
        onDeleteSuccess();
      }
    } catch (error) {
      console.error("❌ 삭제 실패:", error);
    }
  };

  const handleWineUpdate = async (updatedWine: WineData) => {
    try {
      console.log("🚀 수정 요청 데이터(전송 전):", updatedWine);

      if (!updatedWine.id) {
        console.error("❌ 와인 ID가 없습니다. 업데이트를 진행할 수 없습니다.");
        return;
      }

      // API 요청 본문에서 `id` 필드 제거
      const { id, ...wineDataWithoutId } = updatedWine;

      await updateWine(id, wineDataWithoutId); // ✅ id는 URL에 포함하고, 본문에서는 제거
      alert("✅ 와인 정보가 수정되었습니다.");

      setIsEditModalOpen(false);
      if (onDeleteSuccess) {
        onDeleteSuccess(); // ✅ `fetchMyWines()` 실행
      }
    } catch (error) {
      console.error("❌ 와인 수정 실패:", error);
    }
  };

  return (
    <div className="relative">
      {/* 모든 리뷰에서 햄버거 메뉴(⋮) 보이게 수정 */}
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
          // 본인이 아니면 동작하지 않도록 설정
          if (!isOwner) {
            alert("본인만 수정/삭제할 수 있습니다.");
            return;
          }

          if (value === "edit") {
            setIsEditModalOpen(true);
          }
          if (value === "delete") {
            setIsDeleteModalOpen(true);
          }
          setIsDropdownOpen(false);
        }}
      />

      {/* 리뷰 수정 모달 */}
      {isEditModalOpen && editType === "editReview" && reviewId && (
        <ModalReviewAdd
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          wineId={wineId}
          initialReviewId={reviewId} // 기존 리뷰 ID 전달 → 수정 모드로 동작
        />
      )}

      {/* ✅ 와인 수정 모달 */}
      {isEditModalOpen && editType === "editWine" && wineData && (
        <ModalWineAdd
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          wineToEdit={wineData} // wineData 전달
          isEditMode={true}
          onSubmit={handleWineUpdate}
        />
      )}

      {/* 리뷰 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <ModalTwoButton
          size="md"
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default MoreMenu;
