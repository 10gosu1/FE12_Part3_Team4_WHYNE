"use client";
import Icon from "@/components/Icon/Icon";

type ModalReviewAddProps = {
  onClose: () => void;
  isEditMode: boolean;
};

export default function ModalReviewHeader({
  onClose,
  isEditMode,
}: ModalReviewAddProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <h1 className="text-2xl-24px-bold">
        {isEditMode ? "리뷰 수정" : "리뷰 등록"}
      </h1>
      <button type="button">
        <Icon
          className="text-gray-500 cursor-pointer "
          name="close"
          size={34}
          viewBox="0 0 24 24"
          onClick={onClose}
        />
      </button>
    </div>
  );
}
