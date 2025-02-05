"use client";
import Icon from "@/components/Icon/Icon";

type ModalReviewAddProps = {
  onClose: () => void;
};

export default function ModalReviewHeader({ onClose }: ModalReviewAddProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <h1 className="text-2xl-24px-bold">리뷰 등록</h1>
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
