"use client";
import { useEffect } from "react";
import ModalReviewHeader from "./components/ModalReviewHeader";
import ModalReviewForm from "./components/ModalReviewForm";

// import ModalReviewForm from "./components/ModalReviewForm";
// import ModalReviewHeader from "./components/ModalReviewHeader";

type ModalReviewAddProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalReviewAdd({
  isOpen,
  onClose,
}: ModalReviewAddProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 키보드 esc눌러서 모달창 닫을 수 있음.
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ">
      <div className="flex flex-col gap-10 w-full max-w-[528px]  p-6 rounded-lg bg-white shadow-lg ">
        <ModalReviewHeader onClose={onClose} />
        <ModalReviewForm onClose={onClose} />
      </div>
    </div>
  );
}
