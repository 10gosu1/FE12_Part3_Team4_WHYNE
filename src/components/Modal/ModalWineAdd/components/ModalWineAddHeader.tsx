"use client";

import Icon from "@/components/Icon/Icon";

type ModalWineAddProps = {
  onClose: () => void;
  isEditMode: boolean;
};

export default function ModalWineAddHeader({
  onClose,
  isEditMode,
}: ModalWineAddProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-xl-20px-bold md:text-2xl-24px-bold">
        {isEditMode ? "내가 등록한 와인" : "와인 등록"}
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
